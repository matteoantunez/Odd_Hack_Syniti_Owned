(function(){return function(e,r,t){var a,i,n,p=Scanner.fromMessage(e);p.setLocale(r);var o,g,s,l,m,u,d,c,h,v,S,C,N,$,b,T,f,y,E,A=[],x={},I=/BOOKING REF : .*?: \w{6}, AIRLINE: ($<airline>\w{2})\/($<reservationId>\w{6})/,F={};for(l=p.getSpan();l.nextRegExp(I).exists();)F[(E=l.innerCapture(I)).$airline.toString()]=E.$reservationId,l=l.withStart(E[0].getEnd());a=p.getSpan().innerCapture(/TICKET NUMBER\s+: ETKT ([\d ]+)/,1);var D=(s=p.getSpan().innerCapture(/TOTAL\s+: ($<priceCurrency>[A-Z]{3})\s+($<totalPrice>[\d,.]+)/))?s.$priceCurrency:null,w=s?s.$totalPrice:null;if(o=p.getSpan().innerCapture(t.name,1),not(o))return CONTINUE;for(x[o.toString()]={name:o,seats:{},seatingType:{},ticketNumber:a,totalPrice:w,priceCurrency:D},f=p.getSpan().allInnerCapture(t.arrival,1),b=0;b<f.length;b++)1===f.length&&(c=(T=/(\w{3})\s(\w{3})\s+-/.exec(e.subject))[1],S=T[2]),y=f[b].withStart(f[b].previous(t.contentRegex).getEnd()).withEnd(f[b].previous(/.*/).next(t.flightSectionEnd).getEnd()).innerCapture(t.flightInfo),u=p.getDetachedSpan(y.$departureDate.toString()+" "+y.$departureHour.toString()+":"+y.$departureMinute.toString()).innerDate(),y.$arrivalDate.exists()||(y.$arrivalDate=y.$departureDate),h=p.getDetachedSpan(y.$arrivalDate.toString()+" "+y.$arrivalHour.toString()+":"+y.$arrivalMinute.toString()).innerDate(),m=y.$airlineCode,g=y.$flightNumber,N=(d=y.$departureAirport).next(/.*\n(.*)/,1).toString().replace(regExpFormatted(/\1.*/,t.terminal),"").trim(),d=(d.toString()+" "+N).trim(),$=(v=y.$arrivalAirport).next(/.*\n(.*)/,1).toString().replace(regExpFormatted(/\1.*/,t.terminal),"").trim(),v=(v.toString()+" "+$.toString()).trim(),w=(C=p.getSpan().innerCapture(regExpFormatted(/\1\s+(.*)/,t.price),1)).innerCapture(/([\d,.]+)/,1),D=C.innerCapture(/([^\d,.]+)/,1).trim(),i=F[m.toString()],valid(y.$seat)&&(x[o.toString()].seats[g.toString()]=y.$seat),ASSERT(m,g,d,u,v,h)&&A.push({reservationId:i,airlineCode:m,flightNumber:g,departureAirport:d,departureCode:c,departureTime:u,arrivalAirport:v,arrivalCode:S,arrivalTime:h,passengers:x});var R=[];for(b=0;b<A.length;b++)for(var k=A[b],P=Object.keys(k.passengers),z=0;z<P.length;z++){var M=k.passengers[P[z]],O={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:k.airlineName,airlineCode:k.airlineCode,flightNumber:k.flightNumber,departureAirportFuzzy:k.departureAirport,departureAirportCode:k.departureCode,departureTime:k.departureTime,arrivalAirportFuzzy:k.arrivalAirport,arrivalAirportCode:k.arrivalCode,arrivalTime:k.arrivalTime},underName:{"@type":"http://schema.org/Person",name:M.name},checkinUrl:n,reservationId:k.reservationId,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:M.totalPrice,priceCurrency:M.priceCurrency,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:a,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:M.seats[k.flightNumber],seatingType:M.seatingType[k.flightNumber]}}};valid(M.membershipNumber,M.programName)&&(O.programMembershipUsed={"@type":"http://schema.org/ProgramMembership",membershipNumber:M.membershipNumber,programName:M.programName}),R.push(O)}return R.length?R:void 0}}).call();