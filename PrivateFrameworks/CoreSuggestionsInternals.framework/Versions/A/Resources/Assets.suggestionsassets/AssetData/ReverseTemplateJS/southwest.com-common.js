(function(){var r=/\b(?:Change\s+planes(?:\s+to\s+($<changeName>.*?))?\s*in|Depart)\s($<departureAirport>.*?)\s\(($<departureCode>[A-Z]{3})\)(?:\son\s($<name>.*?))?\s?at.*\s+(?:on\s($<otherName>.*?))?/,e=/\bArrive\sin\s($<arrivalAirport>.*?)\s\(($<arrivalCode>[A-Z]{3})\)/;return{departureRegex:r,arrivalRegex:e,addFlightLegs:function(a,t,i,n){var u=n.innerCapture(/\bAIR Confirmation: ([A-Z\d]{6})/,1);not(u)&&(u=n.innerText("Air Confirmation").nextTag("table4").nextTag("td4").tagContents()),tagNum=n.innerText("Departure/Arrival").nextDate().parentAnyTag("table").getTagNumber(),itinerary=n.innerText("Departure/Arrival").nextTag("table4").withEnd(n.nextText(i).getStart()).allInnerTags("table"+tagNum).map(function(r){return r.allInnerTags("td"+tagNum).map(function(r){return r.tagContents()})}).filter(function(r){return r.length>=5});for(var l,d=0;currentLeg=itinerary[d++];){l=currentLeg[0].innerDate().exists()?0:1;var p,o=currentLeg[l].innerDate().exists()?currentLeg[l]:o;if(flightNumber=currentLeg[l+1].innerCapture(/(?:\d+\s+Operated\s+by\s+.*\s+\#\s+)?(\d+)/,1),departure=currentLeg[l+2].innerCapture(r),arrival=currentLeg[l+2].innerCapture(e),valid(departure,arrival))times=currentLeg[l+2].allDates(),airlineName=departure.$name.result()||departure.$changeName.result()||departure.$otherName.result()||"Southwest Airlines",departureAirport=departure.$departureAirport,departureCode=departure.$departureCode,departureTime=combineDateAndTime(o,times[0]),arrivalAirport=arrival.$arrivalAirport,arrivalCode=arrival.$arrivalCode,p=/Next\sDay/.test(currentLeg)?modifyDate(o,1):o,arrivalTime=combineDateAndTime(p,times[1]);ASSERT(airlineName,flightNumber,departureCode,departureTime,arrivalCode,arrivalTime)&&(a.push({airlineName:airlineName,flightNumber:flightNumber,reservationId:u,departureAirport:departureAirport,departureCode:departureCode,departureTime:departureTime,arrivalAirport:arrivalAirport,arrivalCode:arrivalCode,arrivalTime:arrivalTime,passengers:t}),flightNumber=times=airlineName=departureAirport=departureCode=departureTime=arrivalAirport=arrivalCode=arrivalTime=null)}}}}).call();