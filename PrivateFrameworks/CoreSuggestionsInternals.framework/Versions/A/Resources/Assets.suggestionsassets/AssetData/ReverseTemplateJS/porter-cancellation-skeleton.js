(function(){return function(e,t,r){var n=Scanner.fromMessage(e);n.setLocale(t);var a,i,s,o,p=[];a=n.getSpan().next(r.reservationIdPrefix).parentTag("td2").tagContents().innerCapture(regExpFormatted(/\1\s*(.+)/,r.reservationIdPrefix),1).trim(),(i=n.getSpan().next(r.reservationIdPrefix).next(r.passengerPrefix).parentAnyTag("table")).exists()&&(p=i.allInnerTagsFiltered("td2").map(function(e){return e.toString().trim()}).filter(function(e){return!r.passengerPrefix.test(e)&&!/^</.test(e)}));var c=n.getSpan().next(r.priceIndicator).nextTag("td2").innerCapture(r.priceMatcher);s=c[1],o=c[2];var g=[];ASSERT(p,a)&&g.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight"},underName:{"@type":"http://schema.org/Person",name:p[0]},reservationId:a,reservationStatus:"http://schema.org/ReservationCancelled",totalPrice:s,priceCurrency:o,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat"}}});if(g.length)return g}}).call();