(function(){return function(e,t,r){var a,n,i=Scanner.fromMessage(e);i.setLocale(t);var o,p,l,m,s,g,d,u,c,h,b,f,v,T,C,N=[],x={},$=loadHelper("united.com-common.js"),y=r.scheduleChangeNotification&&i.getSpan().innerRegExp(regExpFormatted(/\b\1/,r.scheduleChangeNotification)).exists();p=i.getSpan().nextText(r.travelerInformation).parentTag("table4").allInnerTags("table5");for(var S,F=0;S=p[F++];)3===(g=S.allInnerTagsFiltered("td5")).length&&(x[o=g[0].toString()]={name:o,seatMap:$.getSeatMap(g[2]),seats:{},seatingType:{}});n=i.getSpan().nextText(r.flightCheckInReminder).nextLink(),a=i.getSpan().nextText(r.confirmationNumber).parentTag("td4").innerCapture(regExpFormatted(/\1\s+(\w+)/,r.confirmationNumber),1),not(a)&&y&&(a=i.getSpan().innerCapture(regExpFormatted(/\1\s+(\w+)/,r.scheduleChangeNotification),1));var A=y?r.scheduleChange:r.confirmationNumber;if(C=/^($<code>[A-Z]+)($<flightNumber>\d+)$/,(m=i.getSpan().nextText(A).nextTag("table4").withEnd(i.getSpan().nextText(r.travelerInformation).parentTag("table4").getStart()).allInnerTagsFiltered("td4")).length){F=0;for(var k=m.length;F<k;F++)if(m[F].innerCapture(C)&&F+3<k){if(u=(d=m[F].innerCapture(C))?d.$code:null,s=d?d.$flightNumber:null,b=(c=m[F+1].innerCapture(/^($<time>\d{1,2}:\d{2} [a.pm]+)\s+($<date>.*)\s+.*\(($<code>[A-Z]{3}).*\)$/))?c.$code:null,h=c?combineDateAndTime(c.$date,c.$time):null,T=(f=m[F+2].innerCapture(/^($<time>\d{1,2}:\d{2} [a.pm]+)\s+($<date>.*)\s+.*\(($<code>[A-Z]{3}).*\)$/))?f.$code:null,v=f?combineDateAndTime(f.$date,f.$time):null,l=m[F+3].innerCapture(regExpFormatted(/\b\1\s+(.*)\s/,r.fareClass),1),p=Object.keys(x),valid(s))for(var E,I=0;I<p.length;I++)valid(l)&&(x[p[I]].seatingType[s]=l),valid(T,b)&&(E=b.toString()+" - "+T.toString(),x[p[I]].seats[s]=x[p[I]].seatMap[E]);ASSERT(u,s,b,h,T,v)&&N.push({airlineCode:u,flightNumber:s,departureCode:b,departureTime:h,arrivalCode:T,arrivalTime:v,passengers:x})}}var z,M=[];for(F=0;F<N.length;F++){var R=N[F],j=Object.keys(R.passengers);for(I=0;I<j.length;I++){var w=R.passengers[j[I]];z={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineCode:R.airlineCode,flightNumber:R.flightNumber,departureAirportFuzzy:R.departureAirport,departureAirportCode:R.departureCode,departureTime:R.departureTime,arrivalAirportFuzzy:R.arrivalAirport,arrivalAirportCode:R.arrivalCode,arrivalTime:R.arrivalTime},underName:{"@type":"http://schema.org/Person",name:w.name},checkinUrl:n,reservationId:a,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:w.ticketNumber,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:w.seats[R.flightNumber],seatingType:w.seatingType[R.flightNumber]}},totalPrice:w.price,priceCurrency:w.currency,reservationStatus:"http://schema.org/ReservationConfirmed"},valid(w.membershipNumber)&&(z.programMembershipUsed={"@type":"http://schema.org/ProgramMembership",membershipNumber:w.membershipNumber,programName:"Frequent Flyer"}),M.push(z)}}if(M.length)return M}}).call();