(function(){return function(e,l){var a=loadHelper("cachedClassifier.js")(e),n=a.locale,r=a.use_case,s=loadHelper("vocab.js")(n),i=loadHelper("templateless-preprocessing.js")(a,e,s,l);if(null===i||i instanceof Array&&!i.length)return STOP;e=i;var o=Scanner.fromMessage(e,{locale:a.locale,stripLinks:!0});if(loadHelper("bail.js")(s,o,null,e.domain,l))return STOP;var c=loadHelper("isConfirmed.js")(s,o,e.subject),d=loadHelper("isCancelled.js")(s,o,e.subject);return[r=c&&a.isConfirmation()?"Confirmed":d&&a.isCancellation()?"Cancelled":c?"Confirmed":d?"Cancelled":a.use_case,s,o,n,c=c||"Confirmed"!==r?c:c=!0,d=d||"Cancelled"!==r?d:d=!0]}}).call();