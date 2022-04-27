(function(){return function(e,r,t){var a=Scanner.fromMessage(e);a.setLocale(r);var n,i=a.getSpan(),o=t.isCancellation?"Cancelled":"Confirmed",l=[],p=[],s=[];n=i.next(t.reservationIdPrefix).parentAnyTag("td").tagContents().innerCapture(/\s([A-Z0-9]{6})\s/,1),i.next(t.passengerBlockPrefix).nextTag("table3").allInnerTags("table4").filter(function(e,r){return r%2==0}).forEach(function(e){l.push({name:e.allInnerTags("td4")[0].tagContents()})}),0===l.length&&l.push({});for(var u=i.next(t.flightsBlockPrefix).nextTag("table2").allInnerTags("table4"),d=function(e){return e.tagContents()},m=0;m<u.length;m+=3){var c,g,h,f,v,T,C,A,b,S=u[m].allInnerTags("td4").map(d).map(function(e){return e.toString()}).join(" "),x=u[m+1].allInnerTags("td4").map(d);u[m+2].allInnerTags("td4").map(d);f=S.replace(t.dateTimeRegExp,t.dateTimeReplacer);var y=x[1].innerCapture(/([A-Z0-9]{2})(\d{1,4})/);c=y[1],g=y[2];var N=(x=x[5].toString().split(/\n/)).shift().match(/\s+(\d{1,2}:\d{2})\s+(.+)/);v=N[1],h=N[2];var I=x.join(" ").match(/\s+(\d{1,2}:\d{2})\s+(.+)/);A=I[1],C=I[2],T=a.getDetachedSpan(f+" "+v),b=a.getDetachedSpan(f+" "+A),s.push({airlineCode:c,flightNumber:g,departureAirport:h.trim(),departureDateTime:T,arrivalAirport:C.trim(),arrivalDateTime:b})}return s.forEach(function(e){l.forEach(function(r){ASSERT(e.airlineCode,e.flightNumber,e.departureAirport,e.departureDateTime),p.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineCode:e.airlineCode,airlineName:e.airlineName,flightNumber:e.flightNumber,departureAirportFuzzy:e.departureAirport,departureAirportCode:e.departureAirportCode,departureTime:e.departureDateTime,arrivalAirportFuzzy:e.arrivalAirport,arrivalAirportCode:e.arrivalAirportCode,arrivalTime:e.arrivalDateTime},underName:{"@type":"http://schema.org/Person",name:r.name},reservationId:n,reservationStatus:"http://schema.org/Reservation"+o,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:r.ticketNumber,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:r.seat,seatingType:null}}})})}),p}}).call();