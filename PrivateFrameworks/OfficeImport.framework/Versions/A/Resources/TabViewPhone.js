Element.prototype.addClassName = function addClassName(className){
	if(!this.hasClassName(className))
		this.className += ' '+ className;
};

Element.prototype.removeClassName = function removeClassName(className){
	// Test for the simple case before using a RegExp.
    if (this.className === className)
        this.className = "";
	else
    	this.removeMatchingClassNames(className.escapeForRegExp());
};
Element.prototype.removeMatchingClassNames = function removeMatchingClassNames(classNameRegex){
    var regex = new RegExp("(^|\\s+)" + classNameRegex + "($|\\s+)");
    if (regex.test(this.className))
        this.className = this.className.replace(regex, " ");
};

Element.prototype.hasClassName = function hasClassName(className){
    if (!className)
        return false;
    // Test for the simple case before using a RegExp.
    if (this.className === className)
        return true;
    var regex = new RegExp("(^|\\s)" + className.escapeForRegExp() + "($|\\s)");
    return regex.test(this.className);
};


String.prototype.escapeForRegExp = function escapeForRegExp(){
    return this.escapeCharacters("^[]{}()\\.$*+?|");
};

String.prototype.escapeCharacters = function escapeCharacters(chars){
    var foundChar = false;
    for (var i = 0; i < chars.length; ++i) {
        if (this.indexOf(chars.charAt(i)) !== -1) {
            foundChar = true;
            break;
        }
    }

    if (!foundChar)
        return this;

    var result = "";
    for (var j = 0; j < this.length; ++j) {
        if (chars.indexOf(this.charAt(j)) !== -1)
            result += "\\";
        result += this.charAt(j);
    }

    return result;
};

var _tabChanged = false;
function SelectSheet(sheetNumber, sheetURL)
{
    _tabChanged = true;
    var children = document.body.children;
    for (var i=0; i < children.length; i++) {
        var child = children[i];
        var elementName = child.id;
        if (elementName == ("Tab"+sheetNumber)) {
            child.addClassName("selected");
            document.getElementById('SheetFrame').src = sheetURL;
        } else if (elementName !== "Wrapper") {
            child.removeClassName("selected");
        } 
    }

}

function ReloadFirstSheetIfNeeded(sheetURL)
{
    if (_tabChanged == false) {
        SelectSheet(0, sheetURL);
    }
}


