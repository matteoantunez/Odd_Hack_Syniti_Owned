(function(){return function(e,t,r){var a=Scanner.fromMessage(e);a.setLocale(t);var n,i,o,g,p,s,l,u,h,m,c,d,f,C,T,v,S,x=[],y=[],A=[];for(o=a.getSpan().innerCapture(regExpFormatted(/\1\s*(.+)/,r.reservationId),1),g=a.getSpan().next(r.passengersPrefix).nextTag("table5").allInnerTags("tr5"),(f=a.getSpan().next(r.pricePrefix).nextTag("td5").tagContents().innerCapture(regExpFormatted(/^(.+)\1/,r.priceSuffix),1))&&f.exists()&&(C=f.innerCapture(/([\d,.]+)/,1),T=f.innerCapture(/([^\d,.]+)/,1).trim()),v=3;v<g.length;v++)3===(S=g[v].allInnerTags("td5")).length&&(n=S[1].tagContents(),i=S[2].tagContents(),x.push({name:n.toString()+" "+i.toString()}));for(p=a.getSpan().next(r.flightInfoPrefix).nextTag("table5").allInnerTags("tr5"),v=3;v<p.length;v++)5===(S=p[v].allInnerTags("td5")).length&&(3===(s=S[0].tagContents().innerCapture(/(\w{2})(\d+)/)).length&&([,l,u]=s),h=S[1].tagContents(),c=S[2].tagContents(),m=S[3].tagContents(),d=S[4].tagContents(),ASSERT(l,u,m)&&y.push({airlineCode:l,flightNumber:u,departureAirport:h,arrivalAirport:c,departureTime:m,arrivalTime:d}));if(ASSERT(o)&&x.forEach(function(e){y.forEach(function(t){A.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:"TAP Portugal",airlineCode:t.airlineCode,flightNumber:t.flightNumber,departureAirportFuzzy:t.departureAirport,departureTime:t.departureTime,arrivalAirportFuzzy:t.arrivalAirport,arrivalTime:t.arrivalTime},underName:{"@type":"http://schema.org/Person",name:e.name},reservationId:o,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:C,priceCurrency:T,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat"}}})})}),A.length)return A}}).call();