(function(){return function(e,r,t){var a,i,n,p,o,u,l,d,g,h,m,s,c,v,f,C,S=Scanner.fromMessage(e);S.setLocale(r);var $=[],A=[],y=[a=S.getSpan().innerCapture(t.name,1)];for(s=S.getSpan().innerCapture(regExpFormatted(/\1\s+(\w+)/,t.reservationId),1),o=(C=S.getSpan().innerCapture(regExpFormatted(/\1\s*(.*)/,t.price),1)).innerCapture(/([\d,.]+)/,1),u=C.innerCapture(/([^\d,.]+)/,1).trim(),p=(p=S.getSpan().innerCapture(t.flightSection,1)).split(/\n/),c=0;c<p.length;c++)if((g=p[c]).getLength()>0&&/\w+/.test(g.toString())){var N=g.innerCapture(t.flightLegInfo);if(!N)continue;l=S.getDetachedSpan(N.$flightDate+" "+N.$departureHour+":"+N.$departureMinute).innerDate(),h=S.getDetachedSpan(N.$flightDate+" "+N.$arrivalHour+":"+N.$arrivalMinute).innerDate(),ASSERT(N.$airlineCode,N.$flightNumber,N.$departureAirport,l,N.$arrivalAirport,h)&&A.push({airlineCode:N.$airlineCode,flightNumber:N.$flightNumber,departureCode:d,departureAirport:N.$departureAirport,departureTime:l,arrivalCode:m,arrivalAirport:N.$arrivalAirport.trim(),arrivalTime:h,passengers:[a]})}for(c=0;c<A.length;c++){g=A[c];for(var T=0;T<y.length;T++){$.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:g.airlineName,airlineCode:g.airlineCode,flightNumber:g.flightNumber,departureAirportFuzzy:g.departureAirport,departureAirportCode:g.departureCode,departureTime:g.departureTime,arrivalAirportFuzzy:g.arrivalAirport,arrivalAirportCode:g.arrivalCode,arrivalTime:g.arrivalTime},underName:{"@type":"http://schema.org/Person",name:y[T]},checkinUrl:v,reservationId:s,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:o,priceCurrency:u,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:f,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:i,seatingType:n}}})}}if($.length)return $}}).call();