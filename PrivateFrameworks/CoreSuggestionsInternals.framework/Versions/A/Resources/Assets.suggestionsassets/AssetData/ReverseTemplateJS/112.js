new ReverseTemplateList([new ReverseTemplate("hawaiiairlines.com-reservation-confirmation-en",function(e){return/^Reservation Confirmation/.test(e.subject)},function(e){if(/^Reservation Confirmation/.test(e.subject)){var r="en_US",t=Scanner.fromMessage(e);t.setLocale(r);var a,n,i={};if(i.reservationId="Your Hawaiian Airlines Reservation Confirmation:",i.itinerary="Air Itinerary",i.to="to",i.passenger="Name:",i.price="Total Air Travel Cost",i.checkInUrl="Web Check-in",i.frequentFlyer=/(HawaiianMiles #)/,t.getSpan().next("to your address book").exists()&&t.getSpan().next("Air Itinerary").exists())return i.passengerInfo="Passenger Information and Cost Breakdown",i.plusDay=/\(\+(\d) days?\)/,i.ticketNumber="eTicket #:",i.flight="Flight #",i.pending="Purchase Held Reservation",loadHelper("hawaiiairlines.com-confirmation-skeleton-2015.js")(e,r,i);if(t.getSpan().next("Air Itinerary").exists())return i.passengerInfo="Passenger Info and Cost Breakdown",i.ticketNumber="ETicket Number",loadHelper("hawaiiairlines.com-confirmation-skeleton.js")(e,r,i);var o,s,l,m,p,g,u,d,c,h,T,f,b,C,v,y,N,x,A,S,$=[],k={};n=t.getSpan().innerCapture(/Reservation Confirmation:\s+([A-Z]{6})\s+</,1),s=t.getSpan().nextText("Passenger and Seating Information").nextTag("table2").allInnerTags("table3");var I=(d=t.getSpan().nextText("TOTAL COST").parentAnyTag("td").tagContents()).innerCapture(/TOTAL COST \(([A-Z]{3})\)/,1),w=d.nextAnyTag("td").tagContents().innerCapture(/([\d,.]+)/,1);if(s.length){var D=s[0].allInnerTagsFiltered("td3");for(S=1;S<s.length;S++){var F;if((c=s[S].allInnerTags("td3")).length>=4&&(D[0].toString().indexOf("HawaiianMiles")>=0?(F=(o=c[1].tagContents().innerCapture(/($<name>[^\d]+)(?:($<membershipNumber>[\d ]+))?/))?o.$membershipNumber:null,o=o?o.$name.trim():null,a=c[2].tagContents()):D[1].toString().indexOf("HawaiianMiles")>=0&&(o=c[1].tagContents(),F=c[2].tagContents(),a=c[3].tagContents()),valid(o)&&(k[o.toString()]={name:o,seats:{},seatingType:{},programName:"Hawaiian Miles",membershipNumber:F,ticketNumber:a,totalPrice:w,priceCurrency:I},(l=s[S].innerTag("table4").innerTag("tr4").allInnerTags("td4").map(function(e){return e.tagContents()})).length%2==0)))for(var R=0;R<l.length/2;R++)l[2*R].getLength()&&(k[o.toString()].seats[l[2*R].toString()]=l[2*R+1].tagContents())}}for(g=t.getSpan().nextText("Flight").nextText("Date").nextText("Depart").nextText("Arrive").parentTag("table2").allInnerTags("table3").map(function(e){return e.allInnerTagsFiltered("td3")}).filter(function(e){return e.length>=5}),S=1;S<g.length;S++)T=(h=(p=g[S])[0].innerCapture(/($<code>\D+)($<flightNumber>\d+)/))?h.$code:null,u=h?h.$flightNumber:null,m=p[1].innerDate(),b=combineDateAndTime(m,p[2].innerDate()),N=combineDateAndTime(m,p[3].innerDate()),C=(f=p[2].innerCapture(/($<airport>.*) \(($<code>[A-Z]{3})\)/))?f.$airport:null,v=f?f.$code:null,x=(y=p[3].innerCapture(/($<airport>.*) \(($<code>[A-Z]{3})\)[^+]+($<nextDay>\+1)?/))?y.$airport:null,A=y?y.$code:null,y&&valid(y.$nextDay)&&(N=modifyDate(N,1)),ASSERT(T,u,b,v,N,A)&&$.push({airlineCode:T,flightNumber:u,departureTime:b,departureAirport:C,departureCode:v,arrivalTime:N,arrivalAirport:x,arrivalCode:A,passengers:k});var P=[];for(S=0;S<$.length;S++)for(var H=$[S],M=Object.keys(H.passengers),O=0;O<M.length;O++){var z=H.passengers[M[O]],j={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:H.airlineName,airlineCode:H.airlineCode,flightNumber:H.flightNumber,departureAirportFuzzy:H.departureAirport,departureAirportCode:H.departureCode,departureTime:H.departureTime,arrivalAirportFuzzy:H.arrivalAirport,arrivalAirportCode:H.arrivalCode,arrivalTime:H.arrivalTime},underName:{"@type":"http://schema.org/Person",name:z.name},reservationId:n,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:z.totalPrice,priceCurrency:z.priceCurrency,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:a,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:z.seats[H.airlineCode.toString()+H.flightNumber.toString()],seatingType:z.seatingType[H.flightNumber]}}};valid(z.membershipNumber,z.programName)&&(j.programMembershipUsed={"@type":"http://schema.org/ProgramMembership",membershipNumber:z.membershipNumber,programName:z.programName}),P.push(j)}if(P.length)return P}},"SG6e7bd645")]);