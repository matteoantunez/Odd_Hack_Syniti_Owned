(function(){return function(e,r,t,a){r=a.locale;var n=loadHelper("templateless-preprocessing.js")(a,e,t,"flight");if(null===n||n instanceof Array&&!n.length)return n;e=n;var l=Scanner.fromMessage(e);l.setLocale(r);var p=loadHelper("vocab.js")(r);if(!(e&&a&&a.locale&&p))return CONTINUE;if(loadHelper("bail.js")(p,l))return STOP;var s=loadHelper("flight_references.js")(p,l,e);if(!s||0===s.length||s.length>=20)return CONTINUE;var i,u,o=[],g=l.getSpan().getStart();return s.forEach(function(e){i=e.span.getEnd();var r=l.getSpan().withInterval(g,i),a=unSpanDate_(r.inner(t.departing).nextAbsoluteDate());a||(a=u),e.departureDate=a,e.departureDate&&(e.departureDate=e.departureDate.split("T")[0],o.push(e),g=e.span.getStart()),u=e.departureDate}),o&&0!==o.length?loadHelper("flight_generic.js")(e,a,o,l,p):CONTINUE}}).call();