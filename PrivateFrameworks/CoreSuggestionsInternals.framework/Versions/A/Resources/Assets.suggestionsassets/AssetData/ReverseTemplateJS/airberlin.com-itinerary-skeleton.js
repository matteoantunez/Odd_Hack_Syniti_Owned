(function(){return function(e,r,t){var a,i,n,o,p,m,s,u,l,d,g,v=Scanner.fromMessage(e);v.setLocale(r);var h=[],c=[];a=v.getSpan().innerCapture(t.name,1).trim(),u=v.getSpan().innerCapture(regExpFormatted(/\1\s+(.*)/,t.reservationId),1);var C=v.getSpan().innerCapture(t.name,2).trim();if(not(a))return CONTINUE;c[a.toString()]={name:a,ticketNumber:C};for(var T=v.getSpan().allInnerCapture(/AIR BERLIN - (\w{2}\s+(\d{2,4}))/,1),N=0;N<T.length;N++)g=(d=T[N]).nextDate(),n=(l=d.innerCapture(/($<airlineCode>\w*)\s+($<flightNumber>\d*)/)).$airlineCode,i=l.$flightNumber,p=(l=v.getSpan().innerCapture(regExpFormatted(/\1\s*\n.*?(?:\2)?\s{2,}($<departure>.+?)\s{2,}($<arrival>.+?)\s{2,}($<departureTime>.+?)\s{2,}($<arrivalTime>.*)/,d.toString(),g.toString()))).$departure,s=l.$arrival,o=combineDateAndTime(g,l.$departureTime),m=combineDateAndTime(g,l.$arrivalTime),ASSERT(n,i,p,o,s,m)&&h.push({reservationId:u,airlineCode:n,flightNumber:i,departureAirport:p,departureTime:o,arrivalAirport:s,arrivalTime:m,passengers:c});var f=[];for(N=0;N<h.length;N++)for(var A=h[N],S=Object.keys(A.passengers),$=0;$<S.length;$++){var b=A.passengers[S[$]];f.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:A.airlineName,airlineCode:A.airlineCode,flightNumber:A.flightNumber,departureAirportFuzzy:A.departureAirport,departureAirportCode:A.departureCode,departureTime:A.departureTime,arrivalAirportFuzzy:A.arrivalAirport,arrivalAirportCode:A.arrivalCode,arrivalTime:A.arrivalTime},underName:{"@type":"http://schema.org/Person",name:b.name},reservationId:A.reservationId,reservationStatus:"http://schema.org/ReservationConfirmed",reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:b.ticketNumber}})}return f.length?f:void 0}}).call();