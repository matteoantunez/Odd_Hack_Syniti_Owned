(function(){return function(e,t){var r=Scanner.fromMessage(e);r.setLocale(t);for(var n=r.getSpan(),a=(n.next(/Main contact:/).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1\s*($<name>.*)/,"Main contact:")),n.next(/Traveler:/).parentAnyTag("td")),i=[];!a.isNullSpan_&&regExpFormatted(/\1\s*[\w\s]{5,15}/,"Traveler:").test(a.toString());){var o=a.next(/Traveler:/).parentAnyTag("td").innerCapture(regExpFormatted(/\1\s*($<name>.*)\s/,"Traveler:")),s=o?o.$name:null,l=a.next(/Traveler:/).next(s.toString().trim()).next(/Airline Ticket No\.:/).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1\s*($<tickNum>.*)/,"Airline Ticket No.:"));i.push({name:s,ticketNumber:l?l.$tickNum:null}),a=a.next(/Traveler:/).next(/Traveler:/).parentAnyTag("td")}var p=n.next(/Travelocity Itinerary No\.: /).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1\s*<.*>\s*($<id>.*)/,"Travelocity Itinerary No.: ")),c=p?p.$id:null,g=[];if(ASSERT(c))for(var m=0;m<i.length;m++)g.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://schema.org/Person",name:i[m].name,ticketNumber:i[m].ticketNumber},reservationId:c,reservationStatus:"http://schema.org/ReservationCancelled"});return g}}).call();