new ReverseTemplateList([new ReverseTemplate("flight-generic",function(e){return loadHelper("ShouldDownloadMessageWithClassifier.js")(e,"flight")},function(e){if("sms"===e.documentType)return loadHelper("flight_generic_sms.js")(e);var r=loadHelper("override_to_category.js")(e);return r&&"function"==typeof r?r(e):loadHelper("flight_generic.js")(e)},"SG1f8c1c9b")]);