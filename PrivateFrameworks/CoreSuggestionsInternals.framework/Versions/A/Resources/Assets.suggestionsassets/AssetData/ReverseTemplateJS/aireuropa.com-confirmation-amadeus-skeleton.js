(function(){return function(e,r,t){var a,i,n,m=Scanner.fromMessage(e);m.setLocale(r);var p,l,o,s,u,g,h,d,c,v,N,y,C=[],b={};i=(s=m.getSpan()).next(t.reservationId).innerCapture(t.reservationId,1);do{if(N?N=N.next(t.name):0===(N=s.next(t.name)).toString().length&&(N=s.next(t.name_alt)),0===(p=N.innerCapture(t.name,1)).toString().length&&(p=N.innerCapture(t.name_alt,1).trim()),a=N.innerCapture(t.ticket,1).trim(),not(p))return CONTINUE;b[p.toString()]={name:p,seats:{},seatingType:{},ticketNumber:a,totalPrice:null,priceCurrency:null}}while(0!==N.next(t.name).toString().length);do{l=(y=y?y.next(t.flightSummary):s.next(t.flightSummary)).innerCapture(t.flightSummary),h=(d=y.next(t.departure).innerCapture(t.departure).$airportAddress).nextRegExp(/.+/).replace(/\-/,"").innerDate(),c=(v=y.next(t.arrival).innerCapture(t.arrival).$airportAddress).nextRegExp(/.+/).replace(/\-/,"").innerDate(),g=l.$airlineCode,u=l.$airlineName,o=l.$flightNumber,ASSERT(g,o,d,h,v,c)&&C.push({reservationId:i,airlineName:u,airlineCode:g,flightNumber:o,departureAirport:d.replace(/\-/,"").trim(),departureTime:h,arrivalAirport:v.replace(/\-/,"").trim(),arrivalTime:c,passengers:b})}while(0!==y.next(t.flightSummary).toString().length);for(var f=[],S=0;S<C.length;S++)for(var x=C[S],T=Object.keys(x.passengers),A=0;A<T.length;A++){var k=x.passengers[T[A]],z={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:x.airlineName,airlineCode:x.airlineCode,flightNumber:x.flightNumber,departureAirportFuzzy:x.departureAirport,departureAirportCode:x.departureCode,departureTime:x.departureTime,arrivalAirportFuzzy:x.arrivalAirport,arrivalAirportCode:x.arrivalCode,arrivalTime:x.arrivalTime},underName:{"@type":"http://schema.org/Person",name:k.name},checkinUrl:n,reservationId:x.reservationId,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:null,priceCurrency:null,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:a,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:k.seats[x.flightNumber],seatingType:k.seatingType[x.flightNumber]}}};valid(k.membershipNumber,k.programName)&&(z.programMembershipUsed={"@type":"http://schema.org/ProgramMembership",membershipNumber:k.membershipNumber,programName:k.programName}),f.push(z)}if(f.length)return f}}).call();