(function(){return function(e,t,r){var n,a,i,o,c,p,s=Scanner.fromMessage(e);if(s.setLocale(t),a=(n=s.getSpan()).innerCapture(r.reservationIdRegExp,1),r.underNamePrefix!==undefined&&(i=n.next(r.underNamePrefix).nextTag("td4").tagContents()),r.pricePrefix!==undefined&&(o=n.next(r.pricePrefix).nextTag("td4").tagContents())&&o.exists()&&(c=o.innerCapture(/([\d,.]+)/,1),p=o.innerCapture(/([^\d,.]+)/,1).trim()),ASSERT(a))return[{"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight"},underName:{"@type":"http://schema.org/Person",name:i},reservationId:a,reservationStatus:"http://schema.org/ReservationCancelled",totalPrice:c,priceCurrency:p,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat"}}}]}}).call();