(function(){return function(e,r,t){var a=Scanner.fromMessage(e);a.setLocale(r);var n,i,o,p,g,d,s,u,l,m,C,y,T,v,h,A,c,f,x=[],$=[];for(n=a.getSpan().next(t.reservationId).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1\s+(.*)/,t.reservationId),1),i=a.getSpan().next(t.itinerary).parentTag("table4").allInnerCapture(regExpFormatted(/(\1)/,t.flight),1),y=a.getSpan().next(t.passengerInfo).parentAnyTag("table").allInnerTags("tr6"),o=0;o<y.length-1;o++){for((C={}).name=y[o].nextTag("td7").tagContents().innerCapture(/(.+)\n?/,1).trim(),C.seat={},C.seatingType={},c=y[o].allInnerCapture(/(\D{2,3}-\D{2,3})/,1),T=0;T<c.length;T++)v=c[T].previousAnyTag("td").tagContents().innerCapture(/(\d+)/,1),C.seat[v]=c[T].nextAnyTag("td").tagContents(),C.seatingType[v]=C.seat[v].nextAnyTag("td").tagContents();$.push(C)}for(u=(s=a.getSpan().next(t.price).nextAnyTag("td").tagContents().innerCapture(/($<currency>[^\d,.]+)($<price>[\d,.]+)/)).$price,l=s.$currency,o=0;o<i.length;o++){p={},g=i[o].previousAnyTag("td").tagContents().innerCapture(regExpFormatted(/($<departureAirport>.*)\(($<departureCode>.*)\)\s\1\s+($<arrivalAirport>.*)\(($<arrivalCode>.*)\)/,t.to)),p.departureAirportFuzzy=g.$departureAirport.trim(),p.departureAirportCode=g.$departureCode,p.arrivalAirportFuzzy=g.$arrivalAirport.trim(),p.arrivalAirportCode=g.$arrivalCode,h=i[o].previousAnyTag("td").firstDate(),A=a.getDateDD(i[o].previousAnyTag("td").lastInnerDate()),p.departureTime=combineDateAndTime(h,A.iso8601),p.arrivalTime=combineDateAndTime(h,A.endIso8601);var b=i[o].previousAnyTag("td").innerCapture(t.plusDay,1);b.exists()&&(p.arrivalTime=modifyDate(p.arrivalTime,b,0,0,0)),p.seatingType=i[o].nextAnyTag("td").tagContents().innerCapture(/\n(.*)/,1),d=i[o].parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1\s($<airlineCode>\D+)($<flightNumber>\d+)/,t.flight)),p.airlineCode=d.$airlineCode.trim(),p.flightNumber=d.$flightNumber,ASSERT(p.departureAirportCode,p.arrivalAirportCode,p.departureTime,p.arrivalTime,p.airlineCode,p.flightNumber)&&x.push(p)}m=a.getSpan().next(t.ticketNumber).nextAnyTag("td").tagContents();var z=[];for(f="Confirmed",a.getSpan().next(t.pending).exists()&&(f="Pending"),o=0;o<x.length;o++)for(p=x[o],T=0;T<$.length;T++){var F={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:p.airlineName,airlineCode:p.airlineCode,flightNumber:p.flightNumber,departureAirportFuzzy:p.departureAirportFuzzy,departureAirportCode:p.departureAirportCode,departureTime:p.departureTime,arrivalAirportFuzzy:p.arrivalAirportFuzzy,arrivalAirportCode:p.arrivalAirportCode,arrivalTime:p.arrivalTime},underName:{"@type":"http://schema.org/Person",name:(C=$[T]).name},reservationId:n,reservationStatus:"http://schema.org/Reservation"+f,totalPrice:u,priceCurrency:l,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:m,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:C.seat[p.flightNumber.toString()],seatingType:C.seatingType[p.flightNumber.toString()]}}};z.push(F)}if(z.length)return z}}).call();