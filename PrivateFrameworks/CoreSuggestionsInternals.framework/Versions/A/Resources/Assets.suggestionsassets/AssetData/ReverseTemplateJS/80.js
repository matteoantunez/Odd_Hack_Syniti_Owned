new ReverseTemplateList([new ReverseTemplate("alaskaair.com-itineraries-receipts-en",function(e){return/^Itinerary sent from alaskaair\.com/.test(e.subject)},function(e){function r(e,r,t,a,n,i,p,m){s=Object.keys(p);for(var o=0;o<s.length;o++)not(m)||(p[s[o]].seatingType[r.toString()]=m),p[s[o]].seats[r]=p[s[o]].seatList[E.length];ASSERT(e,r,t,a,n,i)&&E.push({airlineName:e,flightNumber:r,departureCode:t,departureTime:a,arrivalCode:n,arrivalTime:i,passengers:p})}if(int(e.epoch)<1356998400)return CONTINUE;var t,a,n=Scanner.fromMessage(e);n.setLocale("en_US");var i,s,p,m,o,l,g,u,c,h,d,b,T,v,f,N,C,x,S,y,E=[],A={};if(/^(?:Receipt|Itinerary) sent from alaskaair\.com/.test(e.subject)){s=n.getSpan().nextText("Traveler Information").nextTag("table1").allInnerTags("tr1").map(function(e){return e.allInnerTags("td1")});for(var k=1;k<s.length;k++)s[k].length>=2&&((g=s[k][0].tagContents().innerCapture(/\bName:\s+($<name>.*)\s+MP#:\s+(?:($<membershipNumber>.*?)\s+(?:-\s+($<programName>.*))?\s+)?E-Ticket:(?:\s+($<ticketNumber>\d+))?/))&&(i=g.$name.trim().toString().replace(/\s{2,}/," "),f=g.$programName.trim(),N=g.$membershipNumber,C=g.$ticketNumber),x=s[k][1].tagContents().split(",").map(function(e){return"No Seats"===e.trim().toString()?"":e.trim()}),valid(i)&&(l=n.getSpan().nextRegExp(new RegExp("Airfare for "+regExpEscape(i))).parentTag("tr1").lastInnerTag("td1").tagContents().innerCapture(/([\d,.]+)/,1),not(l)&&(l=n.getSpan().innerCapture(/Total per Traveler\s+.*?([\d,.]+)/,1)),A[i]={name:i,programName:f,membershipNumber:N,ticketNumber:C,totalPrice:l,seatList:x,seats:{},seatingType:{}}));if(0===(m=n.getSpan().nextText("Departs").nextText("Arrives").parentTag("table1").allInnerTags("td1").filter(function(e){return e.innerTag("table2").exists()})).length)for(m=n.getSpan().nextText("Departs").nextText("Arrives").parentTag("table1").allInnerTags("td1").filter(function(e){return e.inner(/Details for Flights/i).exists()}),y=0;y<m.length;y++)c=(u=(p=m[y]).innerCapture(/(?:Flight.*\d)?($<name>.*)\s+($<flightNumber>\d+)/))?u.$name.trim():null,o=u?u.$flightNumber.trim():null,d=p.innerCapture(/Depart (?:.*)\(([A-Z]{3})\)/,1),h=getFuzzyDate(p.innerCapture(regExpFormatted(/\(\1\)\s+(.*)/,d.toString()),1)),T=p.innerCapture(/Arrive (?:.*)\(([A-Z]{3})\)/,1),b=getFuzzyDate(p.innerCapture(regExpFormatted(/\(\1\)\s+(.*)/,T.toString()),1)),v=null,valid(c,o)&&(v=p.innerCapture(new RegExp(regExpEscape(c.toString())+"\\s+"+regExpEscape(o.toString())+"\\s+(.*?)\\s+\\|"),1)),r(c,o,d,h,T,b,A,v);else for(y=0;y<m.length;y++)(p=m[y].innerTag("table2").allInnerTagsFiltered("td2")).length>=5&&(c=(u=p[0].innerCapture(/($<name>.*)\s+($<flightNumber>\d+)/))?u.$name.trim():null,o=u?u.$flightNumber:null,d=(h=c.nextDate()).previousAnyTag("td").tagContents().innerCapture(/\(([A-Z]{3})\)/,1),T=(b=h.nextDate()).previousAnyTag("td").tagContents().innerCapture(/\(([A-Z]{3})\)/,1),v=null,valid(c,o)&&(v=m[y].innerCapture(new RegExp(regExpEscape(c.toString())+"\\s+"+regExpEscape(o.toString())+"\\s+(.*?)\\s+\\|"),1)),r(c,o,d,h,T,b,A,v))}var $=[];for(y=0;y<E.length;y++)for(var F=E[y],I=Object.keys(F.passengers),z=0;z<I.length;z++){var R=F.passengers[I[z]];/alaska/i.test(F.airlineName)&&(F.airlineCode="AS"),S={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:F.airlineName,airlineCode:F.airlineCode,flightNumber:F.flightNumber,departureAirportFuzzy:F.departureAirport,departureAirportCode:F.departureCode,departureTime:F.departureTime,arrivalAirportFuzzy:F.arrivalAirport,arrivalAirportCode:F.arrivalCode,arrivalTime:F.arrivalTime},underName:{"@type":"http://schema.org/Person",name:R.name},checkinUrl:a,reservationStatus:"http://schema.org/Reservation"+(F.reservationStatus||"Confirmed"),reservationId:valid(F.reservationId)?F.reservationId:t,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:R.ticketNumber,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:R.seats[F.flightNumber],seatingType:R.seatingType[F.flightNumber]}},totalPrice:R.totalPrice,priceCurrency:R.priceCurrency},not(R.membershipNumber)||(S.programMembershipUsed={"@type":"http://schema.org/ProgramMembership",membershipNumber:R.membershipNumber,programName:R.programName}),$.push(S)}return $.length?$:void 0},"SGbe0658cb")]);