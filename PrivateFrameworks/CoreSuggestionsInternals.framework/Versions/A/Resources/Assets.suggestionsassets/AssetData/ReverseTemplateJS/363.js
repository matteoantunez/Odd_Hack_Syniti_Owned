new ReverseTemplateList([new ReverseTemplate("micro-british-airways-webpage",function(e){return loadHelper("ShouldDownloadMessageWithClassifier.js")(e,"flight")},function(e){var a=loadHelper("cachedClassifier.js")(e);e.plain.match(/\u4e88\u7d04\u756a\u53f7/)?a.locale="ja_JP":e.plain.match(/\u8ba2\u7968\u8bb0\u5f55\u7f16\u53f7/)?a.locale="zh_Hans_CN":e.plain.match(/\uc608\uc57d \ubc88\ud638/)&&(a.locale="ko_KR"),"zh_Hans_CN"!==a.locale&&"ja_JP"!==a.locale&&"ko_KR"!==a.locale||(e.plain=e.plain.replace(/(\d{4})\s?[\u5e74\ub144]\s?(\d{1,2})\s?[\u6708\uc6d4]\s?(\d{1,2})\s?[\u65e5\uc77c]/g,"$1/$2/$3"));var l=Scanner.fromMessage(e);l.setLocale(a.locale);var r=loadHelper("vocab.js")(a.locale);if(!(e&&a&&a.locale&&r))return CONTINUE;var n=[],o=loadHelper("airline.js"),t=loadHelper("flight_reference.js"),i=new RegExp(/(flight|\*|flug|vuelo|volo|vol|\u7684\u822a\u73ed|\u30d5\u30e9\u30a4\u30c8)\s?/.source+/[A-Z]{2}[0-9]{1,4}/.source+/\s?(nach|per.{0,20}il|a(?:.{0,20}el)?|to(?:.{0,20}on)?|\xe0|.{0,20}\u884c\u304d|\u81f3|\u76ee\u7684\u5730)/.source,"ig");"zh_Hans_CN"===a.locale&&(i=new RegExp("(?:"+i.source+")|(?:\u98de\u5f80.{0,20}\u7684\u822a\u73ed [A-Z]{1,2}[0-9]{0,4})","ig"));var s=l.content_.match(i);if(s&&s.length>=1&&s.forEach(function(e){var a=l.getSpan().next(e).innerCapture(/($<iata>[A-Z\d]{2})($<number>\d{2,4})/),r=o.airlineFromReference(a.$iata.toString().toLowerCase()),i=new t(r,a.$number.toString(),a[0],a[0].toString());!1===n.some(function(e){if(i.equals(e))return!0})&&n.push(i)}),!n||0===n.length||n.length>=20)return CONTINUE;var c=loadHelper("flight_dates.js")(n);return c&&0!==c.length?loadHelper("flight_generic.js")(e,a,c,l,r):CONTINUE},"SGfe6794df")]);