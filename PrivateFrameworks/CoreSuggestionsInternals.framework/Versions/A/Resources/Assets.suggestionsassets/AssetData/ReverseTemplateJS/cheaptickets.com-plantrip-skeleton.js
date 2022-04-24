(function(){return function(e,t,r){var a=Scanner.fromMessage(e),i=a.getSpan();a.setLocale(t);var n,p,o,s=i.nextText(r.reservationIdPrefix).parentTag("td4").tagContents().innerCapture(regExpFormatted(/\1(.+)\n/,r.reservationIdPrefix),1).trim(),g=i.nextText(r.itineraryPrefix).nextTag("table5").allInnerTags("tr5");g.pop(),g.pop();for(var m,d=[],u=[],l=[],T=0,c={},h=0;h<g.length;h++)g[h]=g[h].allInnerTagsFiltered("td5"),!0===/Flight\s[0-9]\,/.test(g[h])&&(c.departureDate=g[h].toString().split(",")[1]+g[h].toString().split(",")[2],c.departureDate=getFuzzyDate(a.getDetachedSpan(c.departureDate.toString())),o=c.departureDate),!0===/Depart\,/.test(g[h])&&(m=g[h].toString().match(/(.+),(.+)\s([0-9]+)\n?/),c.airlineName=m[2],c.flightNumber=m[3]),!0===/(AM,)|(PM,)/.test(g[h])&&(m=m=g[h].toString().match(/^(.+?),(.+)\((.+)\)/),0===T?(c.departureTime=m[1],c.departureAirport=m[2],c.departureAirportCode=m[3],c.departureTime=getFuzzyDate(a.getDetachedSpan(c.departureTime.toString())),c.departureTime=combineDateAndTime(o,c.departureTime),T=1):(c.arrivalTime=m[1],c.arravalAirport=m[2],c.arrivalAirportCode=m[3],c.arrivalTime=getFuzzyDate(a.getDetachedSpan(c.arrivalTime.toString())),c.arrivalTime=combineDateAndTime(o,c.arrivalTime),T=0)),!0===/Seats:/.test(g[h])?(c.seats=g[h].toString().match(/Seats:\s(.+)\|\sSeats/)[1],d.push(c),c={}):!0===/Meal:/.test(g[h])&&d.push(c);for(var v=1,x=a.getSpan().nextText(r.passenger+" "+v);x.exists();){var S={};S.name=x.nextTag("td4").tagContents(),S.ticketNumber=x.nextText(r.ticket).nextTag("td4").tagContents().toString().match(/^([0-9]+)\s/)[1],S.seatingType=x.nextText(r.Seatpreference).nextTag("td4").tagContents().trim(),ASSERT(S.name)&&u.push(S),v++,x=a.getSpan().nextText(r.passenger+" "+v)}var C=n=i.nextText(r.pricePrefix).nextTag("td4").tagContents();for(n=C.innerCapture(/([\d,.-]+)/,1),p=C.innerCapture(/([^\d,.-]+)/,1).trim(),h=0;h<d.length;h++){var f=d[h],A=[];!0===/,/.test(f.seats)&&(A=f.seats.split(","));for(var y=0;y<u.length;y++){var D=u[y];l.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:f.airlineName,airlineCode:f.airlineCode,flightNumber:f.flightNumber,departureAirportFuzzy:f.departureAirport,departureAirportCode:f.departureAirportCode,departureTime:f.departureTime,arrivalAirportFuzzy:f.arrivalAirport,arrivalAirportCode:f.arrivalAirportCode,arrivalTime:f.arrivalTime},underName:{"@type":"http://schema.org/Person",name:D.name},reservationId:s,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:n,priceCurrency:p,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:D.ticketNumber,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:A[y]}}})}}return l}}).call();