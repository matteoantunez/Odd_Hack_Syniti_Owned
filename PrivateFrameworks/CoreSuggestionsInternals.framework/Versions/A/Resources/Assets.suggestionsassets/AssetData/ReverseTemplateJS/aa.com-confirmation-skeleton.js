(function(){return function(e,r,t){function a(e,r){var t;A=e.innerCapture(b),f=null,A&&(t=E[A.$month.toString()]||A.$month.toString(),f=p.getDetachedSpan(A.$day.toString()+("MAY"===t?"":" ")+t+" "+A.$time.toString()).innerDate());var a="";return(c=r.innerCapture(b))?(t=E[c.$month.toString()]||c.$month.toString(),a=c.$day.toString()+("MAY"===t?"":" ")+t+" "+c.$time.toString()):I.test(r)&&A&&(a=A.$day.toString()+("MAY"===t?"":" ")+t+" "+r.innerCapture(I,1).toString()),S=p.getDetachedSpan(a).innerDate(),!c&&Date.parse(p.getDateDD(S).iso8601)<Date.parse(p.getDateDD(f).iso8601)&&(S=modifyDate(S,1,0,0,0)),{departureTime:f,arrivalTime:S}}function n(){if(C.length){for(var e,r=[],t=p.getSpan().firstRegExp(/.*Baggage charges for your itinerary will be governed by.*/).allInnerCapture(/BAG ALLOWANCE -($<origin>[A-Z]{3})($<destination>[A-Z]{3})-/),a=0;e=t[a];a++)r.push(e.$origin,e.$destination);if(C.length===r.length/2)for(a=0;a<C.length;a++)x[C[a].departureAirport]=r[2*a],x[C[a].arrivalAirport]=r[2*a+1];else{if(x[C[0].departureAirport]=r[0],x[C[C.length-1].arrivalAirport]=r[r-1],C.length%2==0){var n=!0;for(a=0;a<C.length/2;a++){var i=C[a],g=C[C.length-1-a];if(i.departureAirport.getString()!==g.arrivalAirport.getString()||i.arrivalAirport.getString()!==g.departureAirport.getString()){n=!1;break}}if(n){var l=r.slice();if(l.reverse(),arraysEqual(r,l))x[C[C.length/2].departureAirport]=r[r.length/2]}}var o=[];for(a=0;a<C.length;a++){var s=C[a];x[s.departureAirport]||o.push(s.departureAirport.getString()),x[s.arrivalAirport]||o.push(s.arrivalAirport.getString())}var m={},u=Object.keys(x);for(a=0;a<u.length;a++)m[x[u[a]]]=!0;var d=[];for(a=0;a<r.length;a++)m[r[a]]||d.push(r[a]);function h(e){for(var r={},t=1,a=[],n=0;n<e.length;n++)r[e[n]]||(r[e[n]]=t++),a.push(r[e[n]]);return a}if(arraysEqual(h(o),h(d)))for(a=0;a<o.length;a++)x[o[a]]=d[a]}}}if(!e||!r||!t)return CONTINUE;t.itineraryHeader=t.itineraryHeader||[],t.passengerHeader=t.passengerHeader||[];var i,g,l,p=Scanner.fromMessage(e);p.setLocale(r);var o,s,m,u,d,h,T,A,f,v,c,S,N,C=[],y={},b=/($<day>\d{2})($<month>\w{3})\s+($<time>.*)/,I=/(\d{1,2}:\d{2}\s*(?:[A|P]M|N)?)/,E={ABR:"APR"},x={"DALLAS FT WORTH":"DFW","NEW YORK JFK":"JFK","LOS ANGELES":"LAX","MIAMI INTERNTNL":"MIA","CHICAGO OHARE":"ORD",CHARLOTTE:"CLT",PHILADELPHIA:"PHL",PHOENIX:"PHX","WASHINGTON REAGAN":"DCA"};if("VERSION 1"===t.emailType){if(!(U=(U=p.getSpan().next(t.passengerHeader[0])).parentTag("table3").allInnerTags("table4")).length)return CONTINUE;var F,$,H=U[0].allInnerTagsFiltered("td4"),D=U[1].allInnerTags("td4");U.length>2&&(F=U[U.length-1].allInnerTags("td4"),$=U[U.length-3].innerTag("td4").tagContents().innerCapture(/-([A-Z]{3})$/,1));for(var O=1;O<H.length;O++)y[(o=H[O]).toString()]={name:o,seats:{},seatingType:{},ticketNumber:D?D[O].tagContents():null,totalPrice:F?F[O].tagContents():null,priceCurrency:$};for(var R=p.getSpan(),P=(O=0,t.itineraryHeader.length);O<P;O++)R=R.nextText(t.itineraryHeader[O]);if(!(R=R.parentTag("tr2")).exists())return CONTINUE;m=R.parentTag("table2").withStart(R.getStart()).allInnerTags("tr3");var L,k;for(O=2;O<m.length;){for(h=(z=m[O].allInnerTagsFiltered("td3"))[0].trim().replace(/^American$/i,"American Airlines"),u=z[1],v=z[2],N=z[4],s=a(z[3],z[5]),f=s.departureTime,S=s.arrivalTime,k=O+1,L=0;k<m.length&&m[k].allInnerTagsFiltered("td3").length<7;k++,L++);for(var M=1;M<=L;M++)regExpFormatted(/\1/,t.operatedBy).test(m[O+M].toString())||(o=(d=m[O+M].allInnerTags("td3"))[0].tagContents().toString().toUpperCase(),valid(u)&&y[o]&&(valid(y[o].membershipNumber)||(y[o].membershipNumber=d[1].tagContents().innerCapture(regExpFormatted(/\1: (.*)/,t.ff),1)),y[o].seatingType[u.toString()]=d[2].tagContents(),y[o].seats[u.toString()]=d[3].tagContents().innerCapture(regExpFormatted(/\1 (.*)/,t.seat),1)));ASSERT(h,u,v,f,N,S)&&C.push({airlineName:h,flightNumber:u,departureAirport:v,departureTime:f,arrivalAirport:N,arrivalTime:S,passengers:y}),h=T=u=v=f=N=S=null,O+=1+L}i=p.getSpan().nextRegExp(regExpFormatted(/\1/,t.reservationIdPrefix)).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1:\s+(.*)/,t.reservationIdPrefix),1)}else if("VERSION 2"==t.emailType){var U=p.getSpan();for(O=0,P=t.passengerHeader.length-1;O<P;O++)U=U.firstText(t.passengerHeader[O]);if(!(U=U.parentTag("table1").allInnerTags("tr1").map(function(e){return e.allInnerTagsFiltered("td1")}).filter(function(e){return e.length>0})).length)return CONTINUE;U[0].length>2&&($=U[0][U[0].length-3].innerCapture(/-([A-Z]{3})/,1));for(O=1,P=U.length;O<P;O++)(d=U[O]).length>=2&&(y[(o=d[0]).toString()]={name:o,ticketNumber:d[1],totalPrice:d.length>=5?d[d.length-1]:null,priceCurrency:$,seats:{},seatingType:{}});for(R=p.getSpan(),O=0,P=t.itineraryHeader.length;O<P;O++)R=R.nextText(t.itineraryHeader[O]);if(!(R=R.parentTag("tr2")).exists())return CONTINUE;m=R.parentTag("table2").withStart(R.getEnd()).allInnerTags("tr2");var z,w,G;for(O=0;O<m.length;O++)m[O].innerDate().exists()?(z=m[O].allInnerTagsFiltered("td2"),w=G=h=T=u=v=f=N=S=null,w=z[2].split("\n"),G=z[3].split("\n"),h=z[0].trim().replace(/^American$/i,"American Airlines"),u=z[1].trim(),v=w[0].trim(),N=G[0].trim(),s=a(z[2],z[3]),f=s.departureTime,S=s.arrivalTime,ASSERT(h||T,u,v,f,N,S)&&C.push({airlineName:h,airlineCode:T,flightNumber:u,departureAirport:v,departureTime:f,arrivalAirport:N,arrivalTime:S,passengers:y})):m[O].allInnerTagsFiltered("td2").length>=2&&(z=m[O].allInnerTags("td2")).length>=5&&(o=z[1].tagContents().toString(),valid(u)&&y[o]&&(l=z[4].tagContents().innerCapture(regExpFormatted(/^\1:\s+(($<program>[A-Z]+)\s)?($<number>\w+)/,t.ff)),!valid(y[o].membershipNumber)&&valid(l)&&(y[o].programName=l.$program.result(),y[o].membershipNumber=l.$number.result()),y[o].seats[u.toString()]=z[2].tagContents().innerCapture(regExpFormatted(/^\1\s*([^\s]*)/,t.seat),1),y[o].seatingType[u.toString()]=z[3].tagContents()));i=p.getSpan().nextRegExp(regExpFormatted(/\1/,t.reservationIdPrefix)).nextAnyTag("td").tagContents(),n()}g=p.getSpan().firstText(t.checkinPrefix).nextLink();var W=[];for(O=0;O<C.length;O++)for(var Z=C[O],B=(H=Object.keys(Z.passengers),0);B<H.length;B++){var Y=Z.passengers[H[B]],q={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:Z.airlineName,airlineCode:Z.airlineCode,flightNumber:Z.flightNumber,departureAirportFuzzy:Z.departureAirport,departureAirportCode:x[Z.departureAirport.toString()],departureTime:Z.departureTime,arrivalAirportFuzzy:Z.arrivalAirport,arrivalAirportCode:x[Z.arrivalAirport.toString()],arrivalTime:Z.arrivalTime},underName:{"@type":"http://schema.org/Person",name:Y.name},checkinUrl:g,reservationId:i,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:Y.totalPrice,priceCurrency:Y.priceCurrency,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:Y.ticketNumber,ticketedSeat:{"@type":"http://schema.org/Seat",seatingType:Y.seatingType[Z.flightNumber],seatNumber:Y.seats[Z.flightNumber]}}};valid(Y.membershipNumber)&&(q.programMembershipUsed={"@type":"http://schema.org/ProgramMembership",membershipNumber:Y.membershipNumber,programName:Y.programName||"Frequent Flyer"}),W.push(q)}return W.length?W:void 0}}).call();