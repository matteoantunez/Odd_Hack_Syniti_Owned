(function(){return function(e,t,n){if(!e||!t||!n)return CONTINUE;var r,a,i,o,g,p,c,s,d,x,l,h=Scanner.fromMessage(e);return h.setLocale(t),"html"===n.version?(g=h.getSpan().nextText(n.reservationCancellationTitle).withEnd(h.getSpan().nextText(n.reservationCancelled).nextText(n.reservationCancellation).getStart()),r=h.getSpan().innerCapture(regExpFormatted(/\1 (.*)\s/,n.reservationCancellationTitle),1).trim(),o=g.innerCapture(regExpFormatted(/\1 (\d+)/,n.reservationCancelled),1),p=g.innerText(n.checkin).nextDate(),c=g.innerText(n.checkout).nextDate(),d=(g=h.getSpan().nextText(n.cancellationInformation).withEnd(h.getSpan().nextText(n.rateInformation).getStart())).innerCapture(regExpFormatted(/\1 (.*)\s/,n.hotelName),1),x=(g=h.getSpan().withEnd(h.getSpan().nextText(n.reservationCancellationTitle).getStart())).innerCapture(regExpFormatted(/\1 (.+?) \2/,n.phone,n.fax),1),valid(d,x,g)&&(l=g.withStart(d.getLength()).withEnd(g.innerText(n.phone).getStart()).trim(),g.innerAddress().getLength()>=l.getLength()&&(l=g.innerAddress()))):"txt"===n.version&&(r=h.getSpan().innerCapture(regExpFormatted(/\1 (.+?)[,:]/,n.name),1),g=h.getSpan().nextText(n.cancellationInformation).withEnd(h.getSpan().nextText(n.rateInformation).getStart()),valid(g)&&(o=g.innerCapture(regExpFormatted(/\1 (\d+)\n/,n.reservationId),1),p=g.innerCapture(regExpFormatted(/\1 (.+)\n/,n.checkin),1).innerDate(),c=g.innerCapture(regExpFormatted(/\1 (.+)\n/,n.checkout),1).innerDate(),d=l=h.getSpan().innerCapture(regExpFormatted(/\1 (.+?)\n/,n.hotelName),1))),ASSERT(p,c,l)?[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r},totalPrice:a,priceCurrency:i,checkinTime:p,checkoutTime:c,reservationStatus:"http://schema.org/ReservationCancelled",reservationId:o,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:d,url:s,telephone:x,address:l}}]:void 0}}).call();