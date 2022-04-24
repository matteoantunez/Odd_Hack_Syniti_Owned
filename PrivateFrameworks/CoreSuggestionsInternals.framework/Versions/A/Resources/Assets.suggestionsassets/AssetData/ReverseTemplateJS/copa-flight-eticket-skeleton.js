(function(){return function(e,t,r){if(!e||!t||!r)return CONTINUE;var a=Scanner.fromMessage(e);a.setLocale(t);var n,i,l,o,s,g,p,u,d,m,h,c,v,x,T,C,S,F=a.getSpan(),f=[],y=[];i=F.withInterval(F.nextText(r.reservationId).getEnd(),F.nextText(r.ticketNumber).getStart()).trim().toString().match(/(.+)\s/)[1],n=F.withInterval(F.nextText(r.ticketNumber).getEnd(),F.nextText(r.flightDetails).getStart()).trim().toString().match(/(.+)\s/)[1],p=(g=F.nextText(r.totalPrice).nextTag("th1").tagContents().innerCapture(/($<priceCurrency>[\w]+)\s($<totalPrice>[\d,.]+)/))?g.$totalPrice:null,u=g?g.$priceCurrency:null,o=F.withInterval(F.nextText(r.flightDetails).getEnd(),F.nextText(r.endOfFlightDetails).getStart()).allInnerTagsFiltered("table1");for(var N=F.next(regExpFormatted(/\[\/table1\]\s*[\n]+(?:Miss|Mr|Ms|Mrs)?\s([^\n]+)\s*[\n]+\1/,r.language));!N.isNullSpan_;){var M=N.innerCapture(regExpFormatted(/\[\/table1\]\s*[\n]+(?:Miss|Mr|Ms|Mrs)?\s([^\n]+)\s*[\n]+\1/,r.language),1);y.push({name:M}),N=N.nextAnyTag("td").next(regExpFormatted(/\[\/table1\]\s*[\n]+(?:Miss|Mr|Ms|Mrs)?\s([^\n]+)\s*[\n]+\1/,r.language))}for(S=0;S<o.length;S++){var b=o[S].allInnerTagsFiltered("tr1");m=b[0].toString().match(/,(.+)/)[1].trim();var A=b[1].allInnerDates().toString().split(",");h=A[0],x=A[1],m=(A=(m=m.replace(/,/g,"")).split(" "))[1]+" "+A[0]+" "+A[2].toString(),h=getFuzzyDate(a.getDetachedSpan(m+" "+h.toString())),x=getFuzzyDate(a.getDetachedSpan(m+" "+x.toString())),[,c,v]=b[1].innerCapture(/\n(.+)\((.+)\)/);var z=b[1].allInnerTagsFiltered("th1");[,T,C]=z[0].innerCapture(/\n(.+)\((.+)\)/),[,d,s]=z[1].innerCapture(/([0-9A-Z]{2}?)(?:\W+)(\d+)/);var I=o[S].innerCapture(regExpFormatted(/\1\s?(.+)/,r.airline),1);ASSERT(s,h,x)&&f.push({airlineCode:d,airlineName:I,flightNumber:s,departureTime:h,departureCode:v,departureAirport:c.trim(),arrivalTime:x,arrivalCode:C,arrivalAirport:T.trim()})}var E=[];for(S=0;S<f.length;S++)for(var D=f[S],k=0;k<y.length;k++){E.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:D.airlineName,airlineCode:D.airlineCode,flightNumber:D.flightNumber,departureAirportFuzzy:D.departureAirport,departureAirportCode:D.departureCode,departureTime:D.departureTime,arrivalAirportFuzzy:D.arrivalAirport,arrivalAirportCode:D.arrivalCode,arrivalTime:D.arrivalTime},underName:{"@type":"http://schema.org/Person",name:y[k].name},checkinUrl:l,reservationId:i,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:p,priceCurrency:u,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:n,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:"",seatingType:""}}})}return E.length?E:void 0}}).call();