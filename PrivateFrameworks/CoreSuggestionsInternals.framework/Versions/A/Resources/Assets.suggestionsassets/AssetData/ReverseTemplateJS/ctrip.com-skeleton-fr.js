(function(){return function(e,t,n){var a,r,i,o,g,s,p,c,m,u,x,d,C,h,l=Scanner.fromMessage(e);if(l.setLocale(t),!n.emailTitelConfirmation.test(e.subject))return CONTINUE;if(n.emailTitelConfirmation.test(e.subject)){g=l.getSpan().nextRegExp(n.reservationId).tagContents().innerCapture(n.reservationId,1),a=l.getSpan().nextRegExp(n.guestName).nextAnyTag("td").tagContents().innerCapture(/(.+)\,/,1),p=l.getSpan().nextRegExp(n.checkInDate).nextAnyTag("td").tagContents().innerDate(),c=l.getSpan().nextRegExp(n.checkOutDate).nextAnyTag("td").tagContents().innerDate(),u=l.getSpan().nextRegExp(n.hotelName).nextAnyTag("td").tagContents();var R=l.getSpan().nextRegExp(n.price).nextAnyTag("td").tagContents();if(i=R.innerCapture(/([\d,.]+)/,1),o=R.innerCapture(/([^\d,.]+)/,1).trim(),C=h=l.getSpan().nextRegExp(n.modifyUrl).tagContents().innerLink(),!ASSERT(a,g,p,c,OR(d,u)))return CONTINUE;s="Confirmed"}return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:a,email:r},totalPrice:i,priceCurrency:o,checkinTime:p,checkoutTime:c,modifyReservationUrl:C,cancelReservationUrl:h,reservationStatus:"http://schema.org/Reservation"+(s||"Confirmed"),reservationId:g,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:u,url:m,telephone:x,address:d}}]}}).call();