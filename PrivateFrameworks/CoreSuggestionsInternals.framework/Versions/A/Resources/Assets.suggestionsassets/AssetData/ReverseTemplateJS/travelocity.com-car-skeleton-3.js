(function(){return function(e,t,n){var a,r,o,p,i,g,c,s,l,d,m,h=Scanner.fromMessage(e);h.setLocale(t),m=n.cancelled.test(e.subject)||n.cancelled.test(e.plain)?"Cancelled":"Confirmed",i=h.getSpan().next(n.pickUp).parentTag("table4").nextTag("td5").tagContents();var T=h.getSpan().next(n.pickUp).parentAnyTag("table").allInnerTagsFiltered("td7"),f=h.getSpan().next(n.dropOff).parentAnyTag("table").allInnerTagsFiltered("td7"),b=h.getSpan().next(n.dropOff).nextTag("table6").allInnerTagsFiltered("td6");if(0!==b.length&&(g=b[1]),c=combineDateAndTime(T[2],T[1]),s=combineDateAndTime(f[2],f[1]),l=T[3],d=f[3],a=h.getSpan().next(n.booking).parentAnyTag("table").tagContents().innerCapture(regExpFormatted(/.*\1\s*#\s*([\w\d]+)/,n.booking),1),p=h.getSpan().next(n.booking).next(n.reserved).nextAnyTag("td").tagContents(),ASSERT(p,c))return[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",reservationId:a,reservationStatus:"http://schema.org/Reservation"+m,modifyReservationUrl:r,cancelReservationUrl:o,underName:{"@type":"http://schema.org/Person",name:p},provider:{"@type":"http://schema.org/Organization",name:i},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:g}},pickupTime:c,pickupLocation:{"@type":"http://schema.org/Place",name:l},dropoffTime:s,dropoffLocation:{"@type":"http://schema.org/Place",name:d}}]}}).call();