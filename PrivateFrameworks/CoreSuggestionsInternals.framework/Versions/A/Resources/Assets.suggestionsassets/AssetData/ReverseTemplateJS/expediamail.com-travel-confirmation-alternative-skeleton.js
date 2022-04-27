(function(){return function(e,r,t){var a,n,i,o,p,s,g,d,l,m,c,h,u,v,T,C,f,y,A=Scanner.fromMessage(e);A.setLocale(r);var S=[],x=[],N=[],b=[];for(y=A.getSpan().next(t.contactPerson).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1\s+(.*)/,t.contactPerson),1),T=A.getSpan().next(t.passengers).parentAnyTag("table"),f=/table(\d)/.exec(T.toString())[1],l=A.getSpan().next(t.passengers).parentAnyTag("table").allInnerTags("tr"+f),a=1;a<l.length;a++)l[a].allInnerTags("td"+f).length>2&&((m={}).name=l[a].nextAnyTag("td").tagContents(),N.push(m));for(0===N.length&&(C=A.getSpan().next(t.traveller).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1\s+(.*)/,t.traveller),1),N.push({name:C})),i=A.getSpan().next(t.flightSummary).nextAnyTag("table").allInnerCapture(t.departure,0),a=0;a<i.length;a++)v={},p=(o=i[a]).previousAnyTag("td").previousAnyTag("td").tagContents().toString().replace(/-/g," ")||p,s=o.parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/($<departureAirport>.*)\s+\(($<departureCode>.*)\)\s+\1\s+($<departureTime>.*)/,t.departure)),v.departureAirport=s.$departureAirport,v.departureCode=s.$departureCode,v.departureTime=A.getDetachedSpan(p.toString()+" "+s.$departureTime.toString()).innerDate(),g=o.next(t.arrival).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/($<arrivalAirport>.*)\s+\(($<arrivalCode>.*)\)\s+\1\s+($<arrivalTime>.*)/,t.arrival)),v.arrivalAirport=g.$arrivalAirport,v.arrivalCode=g.$arrivalCode,v.arrivalTime=A.getDetachedSpan(p.toString()+" "+g.$arrivalTime.toString()).innerDate(),d=o.next(t.flight).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/($<airlineCode>\w{2})?\s?($<airline>.*)\s+\1\s+($<flightNr>\d+)/,t.flight)),v.airlineName=d.$airline,v.airlineCode=d.$airlineCode,v.flightNumber=d.$flightNr,v.seatingType=d.$flightNr.nextAnyTag("td").nextAnyTag("td").tagContents(),v.reservationId=A.getSpan().next(t.flightReservationId).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1\s+(.*)/,t.flightReservationId),1),ASSERT(v.airlineName,v.flightNumber,v.arrivalTime,v.departureTime,v.arrivalAirport,v.departureAirport)&&x.push(v);for(c=A.getSpan().next(t.carSummary).parentTag("table3").allInnerCapture(t.carPickup,0),a=0;a<c.length;a++)(h={}).pickupTime=(u=c[a]).parentAnyTag("td").tagContents().innerDate(),h.dropoffTime=u.next(t.carDropoff).parentAnyTag("td").tagContents().innerDate(),h.pickupAddress=h.dropoffAddress=u.next(t.carLocation).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1\s+(.*)/,t.carLocation),1),h.reservationId=u.next(t.carReservationId).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1\s+(.*)/,t.carReservationId),1),h.provider=u.parentTag("td4").tagContents().innerCapture(/(.*)\:/,1),h.name=y,ASSERT(h.name,h.provider,h.dropoffTime,h.pickupTime)&&b.push(h);for(a=0;a<x.length;a++){v=x[a];for(var k=0;k<N.length;k++){var $=N[k];n={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:v.airlineName,airlineCode:v.airlineCode,flightNumber:v.flightNumber,departureAirportFuzzy:v.departureAirport,departureAirportCode:v.departureCode,departureTime:v.departureTime,arrivalAirportFuzzy:v.arrivalAirport,arrivalAirportCode:v.arrivalCode,arrivalTime:v.arrivalTime},underName:{"@type":"http://schema.org/Person",name:$.name},checkinUrl:v.checkinUrl,reservationId:v.reservationId,reservationStatus:"http://schema.org/Reservation"+(v.reservationStatus||"Confirmed"),totalPrice:$.totalPrice,priceCurrency:$.priceCurrency,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:$.ticketNumber,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:v.seats,seatingType:v.seatingType}}},valid($.membershipNumber,$.programName)&&(n.programMembershipUsed={"@type":"http://schema.org/ProgramMembership",membershipNumber:$.membershipNumber,programName:$.programName}),S.push(n)}}for(a=0;a<b.length;a++)n={"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:(h=b[a]).totalPrice,priceCurrency:h.priceCurrency,reservationId:h.reservationId,reservationStatus:"http://schema.org/Reservation"+(h.reservationStatus||"Confirmed"),checkinUrl:h.checkinUrl,modifyReservationUrl:h.modifyReservationUrl,cancelReservationUrl:h.cancelReservationUrl,underName:{"@type":"http://schema.org/Person",name:h.name,email:h.email},provider:{"@type":"http://schema.org/Organization",name:h.provider},pickupTime:h.pickupTime,pickupLocation:{"@type":"http://schema.org/Place",name:h.pickupName,telephone:h.pickupTelephone,address:h.pickupAddress},dropoffTime:h.dropoffTime,dropoffLocation:{"@type":"http://schema.org/Place",name:h.dropoffName,telephone:h.dropoffTelephone,address:h.dropoffAddress}},h.brand&&(n.reservationFor={"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:h.brand},license:h.license,color:h.color}),S.push(n);if(S.length)return S}}).call();