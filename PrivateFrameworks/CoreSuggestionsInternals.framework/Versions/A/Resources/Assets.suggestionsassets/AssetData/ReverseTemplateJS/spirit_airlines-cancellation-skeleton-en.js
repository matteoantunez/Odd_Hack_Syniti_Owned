(function(){return function(t,e,n){var a=Scanner.fromMessage(t);a.setLocale(e);var r,o=a.getSpan(),s="Cancelled",p=[],g=a.getSpan().next(n.pass).next(/NAME/).parentAnyTag("td").getTagNumber();a.getSpan().next(n.pass).nextTag("table5").allInnerTags("td"+g).forEach(function(t,e){e>2&&e%3==0&&p.push(t.tagContents())}),r=o.next(n.reservationId_prefix).nextAnyTag("td").tagContents();var c=[];return p.forEach(function(t){ASSERT(r,t)&&c.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight"},underName:{"@type":"http://schema.org/Person",name:t},reservationId:r,reservationStatus:"http://schema.org/Reservation"+s})}),c}}).call();