(function(){return function(e,r,t){var a,i,n,p,o,m,s,u,g,d,l,h,c,v,C,S,N,b,f=Scanner.fromMessage(e);f.setLocale(r);var y=[],$=[];if(a=f.getSpan().innerCapture(t.name,1).trim(),l=f.getSpan().innerCapture(regExpFormatted(/\1\s+(.*)/,t.ticketNumber),1),C=f.getSpan().innerCapture(regExpFormatted(/\1\s+([A-Z\d]{4,})/,t.reservationId),1),not(a))return CONTINUE;$[a.toString()]={name:a,seats:{},seatingType:{},ticketNumber:l,totalPrice:h,priceCurrency:c},S=f.getSpan().allInnerCapture(t.arrival,1);for(var T=0;T<S.length;T++)1===S.length&&(s=(b=/(\w{3})\s(\w{3})$/.exec(e.subject))[1],d=b[2]),N=S[T].withStart(S[T].previous(t.contentRegex).getEnd()).withEnd(S[T].previous(/.*/).next(t.flightSectionEnd).getEnd()).innerCapture(t.flightInfo),o=f.getDetachedSpan(N.$departureDate.toString()+" "+N.$departureHour.toString()+":"+N.$departureMinute.toString()).innerDate(),N.$arrivalDate.exists()||(N.$arrivalDate=N.$departureDate),u=f.getDetachedSpan(N.$arrivalDate.toString()+" "+N.$arrivalHour.toString()+":"+N.$arrivalMinute.toString()).innerDate(),p=N.$airlineCode,i=N.$flightNumber,m=N.$departureAirport,g=N.$arrivalAirport,h=(n=f.getSpan().innerCapture(regExpFormatted(/\1\s+(.*)/,t.price),1)).innerCapture(/([\d,.]+)/,1),c=n.innerCapture(/([^\d,.]+)/,1).trim(),ASSERT(p,i,m,o,g,u)&&y.push({reservationId:C,airlineCode:p,flightNumber:i,departureAirport:m,departureCode:s,departureTime:o,arrivalAirport:g,arrivalCode:d,arrivalTime:u,passengers:$});var A=[];for(T=0;T<y.length;T++)for(var D=y[T],E=Object.keys(D.passengers),F=0;F<E.length;F++){var k=D.passengers[E[F]],x={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:D.airlineName,airlineCode:D.airlineCode,flightNumber:D.flightNumber,departureAirportFuzzy:D.departureAirport,departureAirportCode:D.departureCode,departureTime:D.departureTime,arrivalAirportFuzzy:D.arrivalAirport,arrivalAirportCode:D.arrivalCode,arrivalTime:D.arrivalTime},underName:{"@type":"http://schema.org/Person",name:k.name},checkinUrl:v,reservationId:D.reservationId,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:h,priceCurrency:c,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:l,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:k.seats[D.flightNumber],seatingType:k.seatingType[D.flightNumber]}}};valid(k.membershipNumber,k.programName)&&(x.programMembershipUsed={"@type":"http://schema.org/ProgramMembership",membershipNumber:k.membershipNumber,programName:k.programName}),A.push(x)}return A.length?A:void 0}}).call();