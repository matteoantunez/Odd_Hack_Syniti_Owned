new ReverseTemplateList([new ReverseTemplate("emirates.com-flight-2016-cancel-en",function(e){return/Emirates Refund/.test(e.subject)},function(e){var r={reservationId:/Refund Request No : (\d+)/,nameCapture:/Dear ([\w ]+)/},t="en_US";return loadHelper("emirates.com-cancellation.js")(e,t,r)},"SG12ffb5bd"),new ReverseTemplate("micro-emirates-confirmation",function(e){return loadHelper("ShouldDownloadMessageWithClassifier.js")(e,"flight")},function(e){var r={},t=loadHelper("cachedClassifier.js")(e),a=t.locale;if("webpage"===e.documentType&&!/UpgradeConfirmation/.test(e.url))return CONTINUE;if("en_US"===a)r.departing=/Depart/;else if("nl_NL"===a)r.departing=/Vertrek/;else if("zh_Hans_CN"===a)r.departing=/\u51fa\u53d1|\u8d77\u98db|\u51fa\u767c/;else if("es_ES"===a)r.departing=/Salida/;else if("de_DE"===a)r.departing=/Start/;else if("it_IT"===a)r.departing=/Partenza/;else if("fr_FR"===a)r.departing=/D\xe9part/;else if("ko_KR"===a)r.departing=/\ucd9c\ubc1c/;else{if("ja_JP"!==a)return CONTINUE;r.departing=/\u51fa\u767a/}return loadHelper("emirates-micro-skeleton-confirmation.js")(e,a,r,t)},"SGf7c2cda5")]);