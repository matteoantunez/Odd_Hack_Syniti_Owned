new ReverseTemplateList([new ReverseTemplate("usairways.com-travel-confirmation-en",function(e){return/^US Airways Travel Confirmation$/.test(e.subject)},function(e){if(/^US Airways Travel Confirmation$/.test(e.subject)){var r,t,a=Scanner.fromMessage(e);a.setLocale("en_US");var n,i,o,p,s,l,m,u,g,c,h,d,T=[],f={};r=a.getSpan().innerCapture(/Travel Confirmation: (\w{6})\s/,1),n=a.getSpan().nextText("Passenger Information").parentTag("table4").allInnerTags("tr4").map(function(e){return e.allInnerTags("td4").map(function(e){return e.tagContents()})}).filter(function(e){return e.length>=4});for(var v=1;v<n.length;v++)f[n[v][0].toString()]={name:n[v][0],seats:{},seatingType:{},ticketNumber:n[v][2]};for(o=a.getSpan().nextText("Flight Itinerary").parentTag("table4").allInnerTags("tr4").map(function(e){return e.allInnerTags("td4").map(function(e){return e.tagContents()})}).filter(function(e){return e.length>0}),d=0;d<o.length;d++)(i=o[d]).length>=6&&i[0].innerDate().exists()&&(m=a.getDetachedSpan(i[0].toString().replace(/\n/," ")).innerDate(),p=i[1],u=(l=i[2].innerCapture(/($<code>[A-Z]{3})\/($<airport>.*)\s/))?l.$code:null,l?l.$airport:null,h=(g=i[3].innerCapture(/($<code>[A-Z]{3})\/($<airport>.*)\s/))?g.$code:null,g?g.$airport:null,c=a.getDetachedSpan(i[4].toString().replace(/\n/," ")).innerDate(),s=o[d+1]&&o[d+1][0]&&o[d+1][0].innerCapture(/FLIGHT OPERATED BY/)?o[d+1][0].innerCapture(/FLIGHT OPERATED BY (.*)/,1):"US Airways",ASSERT(s,p,u,m,h,c)&&T.push({airlineName:s,flightNumber:p,departureCode:u,departureTime:m,arrivalCode:h,arrivalTime:c,passengers:f}));var b=[];for(d=0;d<T.length;d++)for(var C=T[d],y=Object.keys(C.passengers),S=0;S<y.length;S++){var N=C.passengers[y[S]],A={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:C.airlineName,airlineCode:C.airlineCode||"US",flightNumber:C.flightNumber,departureAirportFuzzy:C.departureAirport,departureAirportCode:C.departureCode,departureTime:C.departureTime,arrivalAirportFuzzy:C.arrivalAirport,arrivalAirportCode:C.arrivalCode,arrivalTime:C.arrivalTime},underName:{"@type":"http://schema.org/Person",name:N.name,email:N.email},checkinUrl:t,reservationId:r,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:N.totalPrice,priceCurrency:N.priceCurrency,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:N.ticketNumber,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:N.seats[C.flightNumber],seatingType:N.seatingType[C.flightNumber]}}};valid(N.membershipNumber,N.programName)&&(A.programMembershipUsed={"@type":"http://schema.org/ProgramMembership",membershipNumber:N.membershipNumber,programName:N.programName}),b.push(A)}if(b.length)return b}},"SGd1bea755")]);