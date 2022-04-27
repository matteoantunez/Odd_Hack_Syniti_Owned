(function(){return function(e,r,t){var a,n=Scanner.fromMessage(e);n.setLocale(r);var i,l,d,p,o,s,u,g,m,h,T,c=[],C=[];a=n.getSpan().innerCapture(regExpFormatted(/\b\1 (.*?)\s/,t.bookingReference),1),i=n.getSpan().nextText(t.passengers).parentAnyTag("table").tagContents().toString().match(/\d?\d\.\s+(?:[a-zA-Z]+ *)+/g);for(var f=/\d?\d\.\s*((?:[a-zA-Z]+\s*)+)/,v=(n.getSpan().nextText(t.passengers).parentAnyTag("table").allInnerTagsFiltered("td4"),0);v<i.length;v++)C.push(i[v].replace(f,"$1"));if(!C.length)return CONTINUE;if((p=n.getSpan().nextText(t.itineraryDetails).nextTag("table4").allInnerTags("tr4").map(function(e){return e.allInnerTagsFiltered("td4")}).filter(function(e){return e.length>=7})).length>0)for(var b=0;b<p.length;b++){if(l=(d=p[b])[0].innerDate(),u=(s=d[1].innerCapture(/($<code>\D+)($<flightNumber>\d+)/))?s.$code:null,o=s?s.$flightNumber:null,m=d[2],T=d[3],(g=combineDateAndTime(l,d[4].innerDate())).isNullSpan_)return CONTINUE;(h=d[5].toString().match(/(\d{2}:\d{2})\s*(\(?\+\d+\)?)?/))[h.length-1]!==undefined?(l=modifyDate(l,1),h=combineDateAndTime(l,d[5].innerDate())):h=combineDateAndTime(l,d[5].innerDate());var A=d[6];ASSERT(u,o,g,m,h,T)&&c.push({airlineCode:u,flightNumber:o,departureCode:m,departureTime:g,arrivalCode:T,arrivalTime:h,seatingType:A})}else{var S=n.getSpan().nextTag("table4").nextTag("table4").allInnerTagsFiltered("tr4");v=0;for(v=n.getSpan().nextText("Date").isNullSpan_?0:1;v<S.length;v++){var N=S[v].innerCapture(/($<code>[a-zA-Z]{2,3})($<flightNumber>\d+)\s*\[.*/),$=S[v].innerCapture(/.*?\]\s*($<depCode>[a-zA-Z]{2,4})\s*\[/),y=S[v].innerCapture(/.*\]\s*($<arCode>[a-zA-Z]{2,4})\s*\[/),x=(S[v].innerCapture(/.*?\]\s*($<arTime>\d?\d:\d{2})\s*\[/),S[v].innerCapture(/.*\]\s*($<depTime>\d?\d:\d{2})\s*\[/)),z=S[v].innerCapture(/.*\]\s*($<class>.*)/);u=N?N.$code:null,o=N?N.$flightNumber:null,m=x?$.$depCode:null,T=y?y.$arCode:null;A=z?z.$class:null;ASSERT(u,o,m,T,A)&&c.push({airlineCode:u,flightNumber:o,departureCode:m,departureTime:undefined,arrivalCode:T,arrivalTime:undefined,seatingType:A})}}var D=[];for(b=0;b<c.length;b++)for(var F=c[b],I=0;I<C.length;I++){D.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:F.airlineName,airlineCode:F.airlineCode,flightNumber:F.flightNumber,departureAirportFuzzy:F.departureAirport,departureAirportCode:F.departureCode,departureTime:F.departureTime,arrivalAirportFuzzy:F.arrivalAirport,arrivalAirportCode:F.arrivalCode,arrivalTime:F.arrivalTime},underName:{"@type":"http://schema.org/Person",name:C[I]},reservationStatus:"http://schema.org/ReservationCancelled",reservationId:a,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat",seatingType:F.seatingType}}})}return D.length?D:void 0}}).call();