(function(){return function(e,t,r){var n,a,o,s,i,p=Scanner.fromMessage(e);return p.setLocale(t),o=p.getSpan().innerCapture(regExpFormatted(/\1\s(\D+\d+)/,r.reservationIdPrefix),1),n=p.getDetachedSpan(e.subject).innerCapture(regExpFormatted(/\1\s(.*)/,r.underPersonNamePrefix),1),s=p.getSpan().innerCapture(regExpFormatted(/\1\s(.*)/,r.checkInDatePrefix),1),i=p.getSpan().innerCapture(regExpFormatted(/\1\s(.*)/,r.checkOutDatePrefix),1),a=p.getSpan().innerCapture(regExpFormatted(/\1\s(.*)/,r.hotelNamePrefix),1),ASSERT(!0)?[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:n},checkinTime:s,checkoutTime:i,reservationStatus:"http://schema.org/ReservationCancelled",reservationId:o,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:a}}]:CONTINUE}}).call();