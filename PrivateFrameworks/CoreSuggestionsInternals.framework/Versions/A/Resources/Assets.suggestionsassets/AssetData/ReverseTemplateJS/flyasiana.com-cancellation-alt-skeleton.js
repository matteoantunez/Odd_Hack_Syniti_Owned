(function(){return function(e,r,t){var a=Scanner.fromMessage(e);a.setLocale(r);var n=a.getSpan(),i="Confirmed";/\ud56d\uacf5\uad8c \ud658\ubd88 \uc644\ub8cc/.test(e.subject)&&(i="Cancelled");for(var l=n.next(t.passPointer),o=[];!l.isNullSpan_;){var p=l.parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/(.+)\s?\1,?/,t.passPointer),1).trim();o.push(p),l=l.nextAnyTag("td").next(t.passPointer)}var u=n.next(t.cancel).next(t.cancel).parentAnyTag("table").allInnerTagsFiltered("td1"),s=[],m=n.next(t.reservation).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1\s:\s(\w+)/,t.reservation),1);0===u.length&&(u=n.next(t.cancelNext).parentAnyTag("table").allInnerTagsFiltered("td1"));for(var d=0;d<u.length;d+=6){var g=u[1+d].innerCapture(/($<name>.+)\(($<code>.+)\)\s*[\n]+($<time>.+)/),v=g?g.$name:null,c=g?g.$code:null,h=g?g.$time:null;h=getFuzzyDate(h);var $=(g=u[2+d].innerCapture(/($<name>.+)\(($<code>.+)\)\s*[\n]+($<time>.+)/))?g.$name:null,C=g?g.$code:null,A=g?g.$time:null;A=getFuzzyDate(A);var T=u[3+d].innerCapture(/($<name>.+)\/\s*[\n]+($<num>.+)/),y=T?T.$name:null,F=T?T.$num:null;ASSERT(h,v,$,C)&&s.push({airlineName:y,flightNumber:F,departureAirport:v,departureTime:h,arrivalAirport:$,arrivalTime:A,arrivalCode:C,departureCode:c})}var f=[];for(d=0;d<s.length;d++)for(var x=0;x<o.length;x++){var z=s[d];f.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:z.airlineName,flightNumber:z.flightNumber,departureAirportFuzzy:z.departureAirport,departureAirportCode:z.departureCode,departureTime:z.departureTime,arrivalAirportFuzzy:z.arrivalAirport,arrivalAirportCode:z.arrivalCode,arrivalTime:z.arrivalTime},underName:{"@type":"http://schema.org/Person",name:o[x]},reservationId:m,reservationStatus:"http://schema.org/Reservation"+i})}return f}}).call();