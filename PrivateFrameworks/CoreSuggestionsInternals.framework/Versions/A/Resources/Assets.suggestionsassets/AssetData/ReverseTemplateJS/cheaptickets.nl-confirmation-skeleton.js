(function(){return function(t,e,r){var a=Scanner.fromMessage(t),n=a.getSpan();a.setLocale(e);var i,g,x,s,T,o,l,p,d,c,m,h,u,y,f,C,v;return g=n.nextText(r.reservationIdPrefix).nextRegExp(/[A-Z\d]{6}/),[,u,C,c,p]=n.nextText(r.itineraryPrefix).nextTag("td2").tagContents().toString().match(/(.+)\s\-\s(.+)\|(.+)\|(.+)/),h=n.nextText(r.itineraryPrefix).nextTag("table3").lastInnerTag("tr3").nextTag("td3").nextTag("td3").tagContents(),f=n.nextText(r.itineraryPrefix).nextTag("table3").lastInnerTag("tr3").nextTag("td3").nextTag("td3").nextTag("td3").nextTag("td3").nextTag("td3").tagContents(),m=n.nextText(r.itineraryPrefix).nextTag("table3").lastInnerTag("tr3").lastInnerTag("td3").tagContents().split(/\s/)[0],d=n.nextText(r.itineraryPrefix).nextTag("table3").lastInnerTag("tr3").lastInnerTag("td3").tagContents().split(/\s/)[1],i=(i=n.nextText(r.underPersonNamePrefix).nextTag("table3").lastInnerTag("tr3").allInnerTagsFiltered("td3").toString().replace(/,/g," ")).match(/([a-zA-Z ]+)/)[1].trim(),s=n.nextText(r.pricePrefix).nextTag("td3").tagContents(),x=n.nextText(r.pricePrefix).nextTag("td3").nextTag("td3").tagContents(),ASSERT(i,c||m,u||y,h)?[{"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:c,airlineCode:m,flightNumber:d,departureAirportFuzzy:u,departureAirportCode:y,departureTime:h,arrivalAirportFuzzy:C,arrivalAirportCode:v,arrivalTime:f},underName:{"@type":"http://schema.org/Person",name:i},checkinUrl:o,reservationId:g,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:x,priceCurrency:s,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:T,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:l,seatingType:p}}}]:CONTINUE}}).call();