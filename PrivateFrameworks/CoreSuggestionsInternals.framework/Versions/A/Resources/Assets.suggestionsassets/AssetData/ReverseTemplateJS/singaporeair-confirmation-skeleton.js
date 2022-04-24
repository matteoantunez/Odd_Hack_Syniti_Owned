(function(){return function(e,r,t){var a=Scanner.fromMessage(e);a.setLocale(r);var i,n,o,p,s=a.getSpan(),g="Confirmed",l=[],m=[];return i=/- (.+)/.exec(e.subject)[1],p=s.next(/To check in online/).nextLink(),o=s.innerCapture(t.priceMatcher,1),n=s.innerCapture(t.priceMatcher,2),s.allInnerTags("table3").filter(function(e){return e.toString().indexOf("Cabin Class")>-1}).forEach(function(e){var r,t,i,n,o,p,g,m,c,u,d,h="Singapore Airlines";u=e.nextClosingTag("table3").previousTag("td4").tagContents();var T=/\((.*)\).*to.*\((.*)\).*\n/.exec(e.toString());p=T[1],c=T[2];var v=e.nextAnyTag("table").nextAnyTag("table"),A=/([0-9A-Z]{2,3}?)\s?(\d{3,4})/.exec(v.toString());r=A[1],t=A[2];var b=v.nextAnyTag("table").nextAnyTag("td").tagContents().toString().split("\n");o=b[0],n=b[1].replace(/[()]/g," "),n=getFuzzyDate(a.getDetachedSpan(n).firstDate());var y=v.nextAnyTag("table").nextAnyTag("table").nextAnyTag("td").tagContents().toString().split("\n");m=y[0],g=y[1].replace(/[()]/g," "),g=getFuzzyDate(a.getDetachedSpan(g).firstDate()),(d=s.next("Passengers").parentTag("table4").allInnerTags("tr4")).shift(),d.forEach(function(e){var a;a=e.nextAnyTag("td").nextAnyTag("td").tagContents(),l.push({airlineName:h,airlineCode:r,flightNumber:t,departureDateTime:n,departureAirport:o,departureAirportCode:p,arrivalDateTime:g,arrivalAirport:m,arrivalAirportCode:c,ticketNumber:i,underPersonName:a,seatType:u})})}),l.forEach(function(e){ASSERT(e.departureDateTime,e.arrivalDateTime,e.departureAirportCode,e.arrivalAirportCode),m.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:e.airlineName,airlineCode:e.airlineCode,flightNumber:e.flightNumber,departureAirportFuzzy:e.departureAirport,departureAirportCode:e.departureAirportCode,departureTime:e.departureDateTime,arrivalAirportFuzzy:e.arrivalAirport,arrivalAirportCode:e.arrivalAirportCode,arrivalTime:e.arrivalDateTime},underName:{"@type":"http://schema.org/Person",name:e.underPersonName},checkinUrl:p,reservationId:i,reservationStatus:"http://schema.org/Reservation"+g,totalPrice:n,priceCurrency:o,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:e.ticketNumber,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:e.seatNumber,seatingType:e.seatType}},programMembershipUsed:{"@type":"http://schema.org/ProgramMembership",membershipNumber:e.membershipNumber,programName:e.programName}})}),m.length>=1?m:CONTINUE}}).call();