new ReverseTemplateList([new ReverseTemplate("micro-united.com-change-webpage",function(e){return loadHelper("ShouldDownloadMessageWithClassifier.js")(e,"flight")},function(e){var t,i={};if(/Thank You for Choosing United Airlines/.test(e.subject))t="en_US",i.tripSummary=/Flight Details/,i.departing=/Depart:/;else if(/Nous vous remercions d'avoir choisi United Airlines/.test(e.subject))t="fr_FR",i.tripSummary=/D\xe9tails du vol/,i.departing=/D\xe9part\xa0:/;else if(/Zahlungsinformationen/.test(e.subject)||/de-DE.+?\/flight\/change/.test(e.url))t="de_DE",i.tripSummary=/Flugdetails/,i.departing=/Abflug:/;else{if(!/\u3092\u3054\u5229\u7528\u3044\u305f\u3060\u304d\u3001\u8aa0\u306b\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059\u3002/.test(e.subject))return CONTINUE;t="ja_JP",i.tripSummary=/\u30d5\u30e9\u30a4\u30c8\u306e\u8a73\u7d30/,i.departing=/\u51fa\u767a\uff1a/}return loadHelper("united.com-micro-skeleton-change.js")(e,t,i)},"SG920aa1af"),new ReverseTemplate("micro-united.com-confirmation-webpage",function(e){return loadHelper("ShouldDownloadMessageWithClassifier.js")(e,"flight")},function(e){var t,i={};if(i.depart=/Depart.+/,i.arrive=/Arrive.+/,/Ticket Purchase Confirmation/.test(e.subject))t="en_US",i.tripSummary=/Trip summary/,i.departing=/Departing/;else if(/Confirmation d&#8217;achat de billet/.test(e.subject))t="fr_FR",i.tripSummary=/R\xe9capitulatif du voyage/,i.departing=/D\xe9part/;else if(/Ticketkaufbest\xe4tigung/.test(e.subject)||/united\.com\/ual\/de\/de/.test(e.url))t="de_DE",i.tripSummary=/Reise-Zusammenfassung/,i.departing=/Abflug/;else if(/&#33322;&#31354;&#21048;&#12372;&#36092;&#20837;&#12398;&#30906;&#35469;/.test(e.subject))t="ja_JP",i.tripSummary=/\u65c5\u7a0b\u8868/,i.departing=/\u51fa\u767a\u6642\u9593/;else{if(!/Travel Itinerary sent from/.test(e.subject))return CONTINUE;t="en_US",i.tripSummary=/Flight Details/,i.departing=/Depart/}return loadHelper("united.com-micro-skeleton-confirmation.js")(e,t,i)},"SG467ecf10")]);