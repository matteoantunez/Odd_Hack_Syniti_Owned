(function(){return function(e,r,t){var a,n,i,p,o,l,s,m,g,u,d=Scanner.fromMessage(e);d.setLocale(r);var h=[],c=[],v=[],C="easyjet",T=t.cancelled.test(e.plain)?"Cancelled":"Confirmed";for(s=regExpFormatted(/\1\s*(.*)/,t.reservationId).exec(e.subject)[1],i=d.getSpan().allInnerCapture(t.itinerary,1),g=0;g<i.length;g++){var A={},f=new RegExp("(?:Da)?($<departure>[\\w\\s\xe1]+)\\s(?:\\(.*\\)\\s)?\\1\\s($<arrival>[^\\(]+?)(?:"+t.flexible+"|$|\\()"),b=i[g].nextTag("td5").tagContents().innerCapture(regExpFormatted(f,t.to));A.departureAirport=b.$departure.trim(),A.arrivalAirport=b.$arrival.trim();var x=i[g].nextTag("td6").tagContents().innerCapture(/($<airlineCode>[A-Z]+)?($<flightNumber>\d+)/);A.flightNumber=x.$flightNumber,A.airlineCode=x.$airlineCode;var y=i[g].next(t.departure).nextAnyTag("td").tagContents().replace(/^\w{2,4}/,"");y.toString().match(/mrt/)&&(y=y.replace(/mrt/,"maart").innerDate()),A.departureTime=y.innerDate();var S=i[g].next(t.arrival).nextAnyTag("td");for(S.toString().match(/mrt/)&&(S=S.replace(/mrt/,"maart").innerDate()),A.arrivalTime=S.innerDate(),c=[],a=i[g].nextTag("table5").nextTag("table5").allInnerTags("tr5"),u=0;u<a.length;u++){n={};var N=a[u].allInnerTags("td5");n.name=N[0].tagContents(),n.seat=N[1].tagContents().innerCapture(/\b(\d+\w+)\b/,1),ASSERT(n.name)&&c.push(n)}A.passengers=c,ASSERT(A.departureTime,A.arrivalTime,A.flightNumber,A.departureAirport,A.arrivalAirport)&&v.push(A)}for(g=0;g<v.length;g++)for(c=(p=v[g]).passengers,u=0;u<c.length;u++){h.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:C,airlineCode:"U2",flightNumber:p.flightNumber,departureAirportFuzzy:p.departureAirport,departureAirportCode:p.departureAirportCode,departureTime:p.departureTime,arrivalAirportFuzzy:p.arrivalAirport,arrivalAirportCode:p.arrivalAirportCode,arrivalTime:p.arrivalTime},underName:{"@type":"http://schema.org/Person",name:(n=c[u]).name},reservationId:s,reservationStatus:"http://schema.org/Reservation"+T,totalPrice:o,priceCurrency:l,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:m,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:n.seat}}})}if(h.length)return h}}).call();