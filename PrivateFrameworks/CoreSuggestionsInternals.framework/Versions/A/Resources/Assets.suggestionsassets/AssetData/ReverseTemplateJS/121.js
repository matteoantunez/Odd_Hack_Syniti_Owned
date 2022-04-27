new ReverseTemplateList([new ReverseTemplate("kenya-reservation-en",function(e){return/^Confirmation for Reservation/.test(e.subject)||/^Cancellation of reservation/.test(e.subject)},function(e){if(/^Confirmation for Reservation/.test(e.subject)||/^Cancellation of reservation/.test(e.subject)){var t=Scanner.fromMessage(e);t.setLocale("en_US");var r,n,a,i,o=t.getSpan(),l=!1;/Confirmation/.test(e.subject)?r="Confirmed":(r="Cancelled",l=!0);var s,c,p,g,d,u,m,h,v,T,C,f,x,b,y,S,A,F,k,I=[],N={};for(a=o.nextText("Booking reservation number:").parentTag("td2").tagContents().innerCapture(regExpFormatted(/\1(.+)/,"Booking reservation number:"),1).trim(),u=(d=!0===l?o.nextText("amount to be refunded").nextTag("td4").tagContents().innerCapture(/($<totalPrice>[\d,.]+)\s($<priceCurrency>[\w]+)/):o.nextText("Flight payment and ticket").nextTag("table3").nextTag("td3").tagContents().innerCapture(/($<totalPrice>[\d,.]+)\s($<priceCurrency>[\w]+)/))?d.$totalPrice:null,m=d?d.$priceCurrency:null,c=o.withInterval(o.nextText("Traveller information").getEnd(),o.nextText("Contact Information").getStart()).allInnerTagsFiltered("td2"),F=0;F<c.length;F++)N[(s=c[F].toString()).toString()]={name:s,totalPrice:u,priceCurrency:m};for(p=!0===l?o.withInterval(o.nextText("your flight selection").getEnd(),o.nextText("amount to be refunded").getStart()).allInnerTagsFiltered("table2"):o.withInterval(o.nextText("your flight selection").getEnd(),o.nextText("Flight payment and ticket").getStart()).allInnerTagsFiltered("table2"),F=0;F<p.length;F++)if(!/Your e-ticket and flight payment have been processed./.test(p[F])){T=p[F].innerDate(),[,h,v,g]=p[F].nextText("Airline").nextTag("td3").tagContents().innerCapture(/(.+)\s([A-Z0-9]{2})\s(\d+)/);var w=p[F].nextTag("table4").allInnerTagsFiltered("td4");C=w[1],f=w[2],b=w[4],y=w[5],C=combineDateAndTime(T,C),b=combineDateAndTime(T,b),ASSERT(g,C,b)&&I.push({airlineName:h,airlineCode:v,flightNumber:g,departureTime:C,departureCode:x,departureAirport:f.trim(),arrivalTime:b,arrivalCode:S,arrivalAirport:y.trim(),passengers:N})}var P=[];for(F=0;F<I.length;F++){var R=I[F],j=Object.keys(R.passengers);for(k=0;k<j.length;k++){P.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:R.airlineName,airlineCode:R.airlineCode,flightNumber:R.flightNumber,departureAirportFuzzy:R.departureAirport,departureAirportCode:R.departureCode,departureTime:R.departureTime,arrivalAirportFuzzy:R.arrivalAirport,arrivalAirportCode:R.arrivalCode,arrivalTime:R.arrivalTime},underName:{"@type":"http://schema.org/Person",name:(A=R.passengers[j[k]]).name},checkinUrl:i,reservationId:a,reservationStatus:"http://schema.org/Reservation"+r,totalPrice:A.totalPrice,priceCurrency:A.priceCurrency,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:n,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:"",seatingType:""}}})}}if(P.length)return P}},"SG20c746c5")]);