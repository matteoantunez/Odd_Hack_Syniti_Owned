// This should be considered -*-ObjC-*- code, but it's to be run through Ragel first.  To
// generate a .m file, the proper incantations are
//   $ ragel -G2 -L -C SGSuggestionsRagel.rl -o SGSuggestionsRagel.m
// Right now we need to re-run this after any change (blech!) and check in the generated
// .m file (double blech!) This isn't as horrible as it sounds, but even so, if there's a
// way to make the build system support this, I'd be happy.

#import "SGSuggestionsRagel.h"

#ifndef __clang_analyzer__
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wunused-variable"
%% machine namedEmailAddress;
%% alphtype char;
%% write data;
#pragma clang diagnostic pop

#define NAMESTR [[NSString alloc] initWithBytes:ns length:ne-ns encoding:NSUTF8StringEncoding]
#define MAILSTR [[NSString alloc] initWithBytes:es length:ee-es encoding:NSUTF8StringEncoding]

// Take strings like "Joe <joe@joe.com>" and call block with "Joe" and "joe@joe.com". Takes UTF-8.
void SGParseNamedEmailAddress(const char *utf8, void (^block)(NSString *name, NSString *email)) {
    size_t len = strlen(utf8);
    char *p = (char*)utf8, *pe = p + len, *eof = pe, *ts, *te; int cs, act;

    // Start and end of email and name.
    char *es = NULL, *ee = NULL, *ns = NULL, *ne = NULL;

    %%{
        email = ((any - ('<' | '>' | ' '))+ . '@' /[a-zA-Z0-9.\-_]/+) >{ es = p; } ${ ee = p+1; };
        bracketedEmail = '<' . ' '* . email . ' '* . '>';
        unquotedName = ((any - ('"' | '<' | '>'))+ . (" <http" . (any - '>')+ . '>')?) >{ ns = p; } ${ ne = p+1; };
        nameInQuotes = (any - '"')+ >{ ns = p; } ${ ne = p+1; };
        quotedName = '"' . nameInQuotes . '"';
        name = quotedName | unquotedName;
    main := |*
        name . ' '+ . bracketedEmail => {
            // If we picked up part of a prefix of "<http" by mistake, trim it off. (This is a byproduct of the NFA search mechanism we use.)
            if (ne > es) ne = es;
            // Trim any trailing /[ <]*/.
            while (ne > ns && (*(ne-1) == ' ' || *(ne-1) == '<')) ne--;
            block(NAMESTR, MAILSTR);
        };
        bracketedEmail => {
            block(nil, MAILSTR);
        };
        email => {
            block(nil, MAILSTR);
        };
        any;
        *|;
        write init; write exec;
    }%%
}

#endif
