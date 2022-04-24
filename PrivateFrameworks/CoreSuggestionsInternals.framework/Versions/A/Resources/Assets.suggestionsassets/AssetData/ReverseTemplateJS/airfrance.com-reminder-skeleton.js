(function(){return function(e,r,t){var a=Scanner.fromMessage(e);a.setLocale(r);var n,i,o,p,u,g,d,l,s,m,h,c,v,z,y=[],C=[];u=a.getSpan().innerCapture(regExpFormatted(/\1 (.*?)\,/,t.name),1),l=a.getSpan().next(t.reservationId).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1\s*:\s*(.*)/,t.reservationId),1),n=a.getSpan().next(t.flightInfo).nextTag("table4").allInnerTags("tr4");for(var A=1;A<n.length;A++)i={},o=n[A].nextTag("td5").tagContents().innerCapture(/($<code>\D+)($<number>\d+)/),i.airlineCode=o.$code,i.flightNumber=o.$number,g=i.airlineCode.nextAnyTag("td").tagContents(),i.departureAirportFuzzy=g.nextAnyTag("td").tagContents().innerCapture(/,\s*(.*)/,1),i.departureTime=a.getDetachedSpan(g.toString()+" "+i.departureAirportFuzzy.previousDate().toString()).innerDate(),d=i.departureAirportFuzzy.nextTag("td5").tagContents(),i.arrivalAirportFuzzy=d.nextAnyTag("td").tagContents().innerCapture(/,\s*(.*)/,1),i.arrivalTime=a.getDetachedSpan(d.toString()+" "+i.arrivalAirportFuzzy.previousDate().toString()).innerDate(),ASSERT(i.airlineCode,i.flightNumber,i.departureTime,i.departureAirportFuzzy,i.arrivalTime,i.arrivalAirportFuzzy)&&C.push(i);for(var T=0;T<C.length;T++){y.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:z,airlineCode:(p=C[T]).airlineCode,flightNumber:p.flightNumber,departureAirportFuzzy:p.departureAirportFuzzy,departureAirportCode:p.departureAirportCode,departureTime:p.departureTime,arrivalAirportFuzzy:p.arrivalAirportFuzzy,arrivalAirportCode:p.arrivalAirportCode,arrivalTime:p.arrivalTime},underName:{"@type":"http://schema.org/Person",name:u},checkinUrl:"",reservationId:l,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:s,priceCurrency:m,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:h,ticketedSeat:{"@type":"http://schema.org/Seat",seatingType:c,seatNumber:v}}})}if(y.length)return y}}).call();