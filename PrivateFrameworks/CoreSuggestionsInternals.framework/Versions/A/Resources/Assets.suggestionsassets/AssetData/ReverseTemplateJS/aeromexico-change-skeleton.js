(function(){return function(e,t,r){var a,n,o,i=Scanner.fromMessage(e);i.setLocale(t);var s={},p=[],g=[];a=i.getSpan().next(r.reservationId).nextAnyTag("td").tagContents();for(var l=i.getSpan().next(r.flightDetails).parentAnyTag("table").allInnerTags("tr2"),h=1;h<l.length;h++){var m=(u=l[h]).allInnerTags("td2");s[F=m[5].tagContents()]={name:F},m[0].tagContents().toString().length>0&&p.push(m)}var d=[];for(h=0;h<p.length;h++){var u,v=(u=p[h])[0].innerDate(),c=u[1].tagContents(),C=combineDateAndTime(v,c),A=u[2].tagContents(),T=combineDateAndTime(v,A);Date.parse(C)>Date.parse(T)&&(T=modifyDate(T,1));for(var f,y=(f=u[3].tagContents().innerCapture(/([A-Z]{2,3})\s?(\d+)/))[2],S=f[1],x=u[4].tagContents().innerCapture(regExpFormatted(/([A-Z]{3})\s\1\s([A-Z]{3})/,r.to)),b=x[1],D=x[2],N=Object.keys(s),F=x[0],k=[],I=0;I<N.length;I++){var R=(F=F.next(N[I])).nextAnyTag("td").tagContents();k.push({passengerName:F,seat:R})}ASSERT(C,T,b,D)&&d.push({departureTime:C,arrivalTime:T,departureAirportCode:b,arrivalAirportCode:D,flightNumber:y,airlineCode:S,passengers:k})}for(h=0;h<d.length;h++){n=(u=d[h]).passengers;for(I=0;I<n.length;I++){g.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:"Aero M\xe9xico",airlineCode:u.airlineCode,flightNumber:u.flightNumber,departureAirportCode:u.departureAirportCode,departureTime:u.departureTime,arrivalAirportCode:u.arrivalAirportCode,arrivalTime:u.arrivalTime},underName:{"@type":"http://schema.org/Person",name:(o=n[I]).passengerName},reservationId:a,reservationStatus:"http://schema.org/ReservationConfirmed",reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat",seat:o.seat}}})}}if(g.length)return g}}).call();