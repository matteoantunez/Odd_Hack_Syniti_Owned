#!/usr/bin/perl -w

# Process an OpenCL source file, strip the contents and produce a header file suitable to be #included into the code

use File::Basename;
use File::Spec::Functions;

my $version = "0.8";
my $progname = "CompileOpenCL";
my $time = localtime;

my $usage = "Usage: $progname [-o OUTPUT_FILE -m] OPENCL_FILE\nOptions:\n\t-o,--output OUTPUT_FILE\n\t\tFile to write, defaults to stdout\n\t-m,--multi\n\t\tEnable multi string output, suitable to be #included into a C string array declaration\n";

# Parse arguments
my $output;
my $input;
my $multi = 0; 
my $debug = 0;
my @searchPaths = ();
my %includedFiles = ();

while($arg = shift(@ARGV))
{
	if ($arg =~ "^-o" || $arg =~ "^--output")
	{
		$output = shift(@ARGV);
		if(!$output)
		{
			print "$usage\n";
			die "missing file arg for option $arg";
		}
	}
	elsif ($arg =~ "^-m" || $arg =~ "^--multi")
	{
		# Turn on multi-string output
		$multi = 1;
	}
	elsif ($arg =~ "^-d" || $arg =~ "^--debug")
	{
		# Turn on debugging info
		$debug = 1;
	}
	elsif ($arg =~ /^--(.*)/ || $arg =~ /^-(.*)/)
	{
		print "$usage\n";
		die "Unrecognized option '$1'";
	}
	else
	{
		# Last arg is input file
		$input = $arg;
		if(@ARGV)
		{
			print "$usage\n";
			die "Too many arguments";
		}
	}
}
if(!$input) 
{
	die "no input file";
}

if(!$debug)
{
	close STDERR;
}

# Add input file directory to list of search paths
push(@searchPaths, dirname($input));
$includedFiles{$input} = 1;

open(IN, "<", $input) or die "Can't open $input";

if($output)
{
	open(OUT, ">", $output) or die "Can't open $output";
	Process(IN, OUT);
	close(OUT);
}
else
{
	# output to stdout
	Process(IN, STDOUT);
}
close(IN); 

print STDERR "included files:\n";
foreach $key (keys %includedFiles)
{
	print STDERR "$key\n";
}
print STDERR "Done.\n";

sub Process
{
	my($in, $out) = @_;

	my $tmpFile = "$output.tmp"; # no write access to input dir
	print STDERR "Processing input...\n";
	open(TMP, "+>", $tmpFile) or die "Can't open temp buffer: $!";
	ProcessFile($in, TMP);
	seek(TMP, 0, 0) or die "Can't seek to start of buffer: $!";
	
	print STDERR "Formatting output...\n";
	PrintHeader($out);
	while($line = <TMP>)
	{
		# print comment lines unchanged
		if($line =~ /^\/\//)
		{
			print $out "$line";
		}
		else
		{
			#remove trailing whitespace
			$line =~ s/\s+$//;
			if ($line)
			{
				PrintOpenCL($out, $line);
			}
			else
			{
				# print empty line
				print $out "\n";
			}
		}
	}
	close TMP or warn "Can't close temp buffer: $!";
	unlink $tmpFile or warn "Can't delete temp file: $!";
}

sub ProcessFile
{	
	my($in, $out) = @_;

	while($line = <$in>)
	{
		# remove comments from code
		if ($line =~ /^(.*)\/\//) 
		{
			$line = $1;
		}
	
		# remove leading and trailing whitespace
		$line =~ s/^\s+//;
		$line =~ s/\s+$//;
				
		# process #include directives
		if ($line =~ /^#include\s+\"(.*)\"$/)
		{		   	
			IncludeFile($1, $out);
		}
		else
		{		
			# double quote quotes
			$line =~ s/\"/\\\"/g;
		
			if ($line)
			{
	   			print $out "$line\n"; 
			}
		}
	}
	print $out "\n";
}

sub IncludeFile
{
	my($filename) = $_[0];
	my($out) = $_[1];
	
	print STDERR "<$filename>\n";
			
	my($path) = ResolveIncludeFile($filename);
	
	if ($path)
	{
		if (!$includedFiles{$path})
		{
			$includedFiles{$path} = 1;
			
			print STDERR "Processing file $path...\n";
			
			open(my $file, "<", $path) or die "Can't open $path";
					
		   	print $out "\n//#include <$path>\n"; 

			ProcessFile($file, $out);
		
			close $file;
		}
	}
	else 
	{
		die "File not found: $filename";	
	}
}

sub ResolveIncludeFile
{
	my($filename) = $_[0];
	print STDERR "Including $filename\n";

	foreach $dir (@searchPaths)
	{
		print STDERR "Searching $dir for $filename\n";
		
		my($path) = catfile($dir, $filename);
		print STDERR "Checking path $path...\n";

		if (-e $path)
		{
			print STDERR "Found file $path\n"; 
			return $path;
		}
	
		print STDERR "Not found.\n";
	}	
}
 
sub PrintHeader
{
	my($out) = @_;
	
	if ($multi)
	{
		PrintHeaderMultiString($out);
	}
	else
	{
		PrintHeaderSingleString($out);
	}
}

sub PrintHeaderMultiString
{
	my($out) = @_;

	print $out "// -------------------------------------------------------------------\n";
	PrintCommonHeader($out);
	# Print variable declaration
	print $out "// Array of lines from the original shader source code\n";
	print $out "// Intended to be #included inside a string array declaration, such as:\n";
	print $out "// static const char * vertexShaderSource[] = { \n";
	print $out "// #include \"Example.vs.h\" \n";
	print $out "// };\n";
	print $out "// -------------------------------------------------------------------\n";
	print $out "\n";
}

sub PrintHeaderSingleString 
{
	my($out) = @_;

	print $out "// -------------------------------------------------------------------\n";
	PrintCommonHeader($out);
	# Print variable declaration
	print $out "// Concatenation of strings from the original shader source code\n";
	print $out "// Intended to be #included inside a string declaration, such as:\n";
	print $out "// static const char * vertexShaderSource = \"\" \n";
	print $out "// #include \"Example.vs.h\" \n";
	print $out "// \"\";\n";
	print $out "// -------------------------------------------------------------------\n";
	print $out "\n";
 }

sub PrintCommonHeader
{
	my($out) = @_;
	
	# Print file header
	print $out "// Autogenerated file, do not edit\n";
	print $out "// Generated by $progname v$version on $time\n";
	print $out "// Original file: $input\n";
	print $out "//\n";
}

sub PrintOpenCL
{
	my($out, $line) = @_;

	if ($multi)
	{
		print $out "\"$line\",\n";
	}
	else
	{
		print $out "\"$line\\n\"\n";
	}
}

