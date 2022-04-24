(function(){return function(e,r,t){var a,i,n,p,m,o,s,u,g,l,d,h,c,v,C,b,N=Scanner.fromMessage(e);N.setLocale(r);var T=[],f=[];if(a=N.getSpan().innerCapture(t.name,1).trim(),c=N.getSpan().innerCapture(regExpFormatted(/\1\s+(.*)/,t.reservationId),1),not(a))return CONTINUE;f[a.toString()]={name:a,seats:{},seatingType:{},ticketNumber:g,totalPrice:l,priceCurrency:d};for(var y=N.getSpan().allInnerCapture(/CATHAY PACIFIC - (\w{2}\s+(\d{2,4}))/,1),A=0;A<y.length;A++)b=(C=y[A]).nextDate(),p=(v=C.innerCapture(/($<airlineCode>\w*)\s+($<flightNumber>\d*)/)).$airlineCode,i=v.$flightNumber,o=(v=N.getSpan().innerCapture(regExpFormatted(/\1\s*\n.*?(?:\2)?\s{2,}($<departure>.+?)\s{2,}($<arrival>.+?)\s{2,}($<departureTime>.+?)\s{2,}($<arrivalTime>.*)/,C.toString(),b.toString()))).$departure,u=v.$arrival,m=combineDateAndTime(b,v.$departureTime),s=combineDateAndTime(b,v.$arrivalTime),l=(n=N.getSpan().innerCapture(regExpFormatted(/\1\s+(.*)/,t.price),1)).innerCapture(/([\d,.]+)/,1),d=n.innerCapture(/([^\d,.]+)/,1).trim(),ASSERT(p,i,o,m,u,s)&&T.push({reservationId:c,airlineCode:p,flightNumber:i,departureAirport:o,departureTime:m,arrivalAirport:u,arrivalTime:s,passengers:f});var S=[];for(A=0;A<T.length;A++)for(var $=T[A],F=Object.keys($.passengers),I=0;I<F.length;I++){var k=$.passengers[F[I]],z={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:$.airlineName,airlineCode:$.airlineCode,flightNumber:$.flightNumber,departureAirportFuzzy:$.departureAirport,departureAirportCode:$.departureCode,departureTime:$.departureTime,arrivalAirportFuzzy:$.arrivalAirport,arrivalAirportCode:$.arrivalCode,arrivalTime:$.arrivalTime},underName:{"@type":"http://schema.org/Person",name:k.name},checkinUrl:h,reservationId:$.reservationId,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:l,priceCurrency:d,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:g,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:k.seats[$.flightNumber],seatingType:k.seatingType[$.flightNumber]}}};valid(k.membershipNumber,k.programName)&&(z.programMembershipUsed={"@type":"http://schema.org/ProgramMembership",membershipNumber:k.membershipNumber,programName:k.programName}),S.push(z)}return S.length?S:void 0}}).call();