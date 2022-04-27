(function(){return function(e,r,t){var a,i,n,p,o,m,u,s,g,l,d,h,c,v,N,b,C,S,f=Scanner.fromMessage(e);f.setLocale(r);var y=[],T=[];if(a=f.getSpan().innerCapture(t.name,1).trim(),N=f.getSpan().innerCapture(regExpFormatted(/\1\s+([A-Za-z0-9]*)/,t.reservationId),1),d=f.getSpan().innerCapture(regExpFormatted(/\1\s+(.*)/,t.ticketNumber),1),not(a))return CONTINUE;T[a.toString()]={name:a,seats:{},seatingType:{},ticketNumber:d,totalPrice:h,priceCurrency:c},b=f.getSpan().allInnerCapture(t.flightInfo);for(var A=0;A<b.length;A++)C=b[A],1===b.length&&(u=(S=/(\w{3})\s(\w{3})$/.exec(e.subject))[1],l=S[2]),o=f.getDetachedSpan(C.$departureDate.toString()+" "+C.$departureHour.toString()+":"+C.$departureMinute.toString()).innerDate(),s=f.getDetachedSpan(C.$arrivalDate.toString()+" "+C.$arrivalHour.toString()+":"+C.$arrivalMinute.toString()).innerDate(),p=C.$airlineCode,i=C.$flightNumber,m=C.$departureAirport,g=C.$arrivalAirport,h=(n=f.getSpan().innerCapture(regExpFormatted(/\1\s+(.*)/,t.price),1)).innerCapture(/([\d,.]+)/,1),c=n.innerCapture(/([^\d,.]+)/,1).trim(),ASSERT(p,i,m,o,g,s)&&y.push({reservationId:N,airlineCode:p,flightNumber:i,departureAirport:m,departureCode:u,arrivalCode:l,departureTime:o,arrivalAirport:g,arrivalTime:s,passengers:T});var $=[];for(A=0;A<y.length;A++)for(var k=y[A],F=Object.keys(k.passengers),z=0;z<F.length;z++){var I=k.passengers[F[z]],D={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:k.airlineName,airlineCode:k.airlineCode,flightNumber:k.flightNumber,departureAirportFuzzy:k.departureAirport,departureAirportCode:k.departureCode,departureTime:k.departureTime,arrivalAirportFuzzy:k.arrivalAirport,arrivalAirportCode:k.arrivalCode,arrivalTime:k.arrivalTime},underName:{"@type":"http://schema.org/Person",name:I.name},checkinUrl:v,reservationId:k.reservationId,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:h,priceCurrency:c,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:I.ticketNumber,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:I.seats[k.flightNumber],seatingType:I.seatingType[k.flightNumber]}}};valid(I.membershipNumber,I.programName)&&(D.programMembershipUsed={"@type":"http://schema.org/ProgramMembership",membershipNumber:I.membershipNumber,programName:I.programName}),$.push(D)}return $.length?$:void 0}}).call();