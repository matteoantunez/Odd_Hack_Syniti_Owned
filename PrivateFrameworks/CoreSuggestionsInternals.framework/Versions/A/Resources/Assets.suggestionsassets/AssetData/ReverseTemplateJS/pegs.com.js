(function(){return function(e,t,n){var r,a,i,o,c,g,s,p,C,l,u,m,x,S,h=Scanner.fromMessage(e);if(h.setLocale(t),!n.emailTitelConfirmation.test(e.subject)&&!n.emailTitelCancelConfirmation.test(e.subject))return CONTINUE;var d=h.getSpan().nextTag("td1").tagContents();return l=d.innerCapture(/(.+)/,1),u=d.innerPhoneNumber(),m=d=(d=d.toString().replace(l.toString()+"\n","")).toString().replace(u.toString(),""),c=h.getSpan().nextRegExp(n.reservationId).tagContents().innerCapture(n.reservationId,1),r=h.getSpan().nextRegExp(n.guestName).tagContents().innerCapture(n.guestName,1),a=h.getSpan().nextRegExp(n.guestEmail).tagContents().innerCapture(n.guestEmail,1),s=h.getSpan().nextRegExp(n.checkIn).tagContents().innerCapture(n.checkIn,1).innerDate(),p=h.getSpan().nextRegExp(n.checkOut).tagContents().innerCapture(n.checkOut,1).innerDate(),i=h.getSpan().nextRegExp(n.totalPrice).tagContents().innerCapture(n.totalPrice,1),o=h.getSpan().nextRegExp(n.priceCurrency).tagContents().innerCapture(n.priceCurrency,1),S=x=h.getSpan().nextText(n.modifyUrl).tagContents().parentTag("td1").innerLink(),n.emailTitelConfirmation.test(e.subject)?g="Confirmed":n.emailTitelCancelConfirmation.test(e.subject)&&(g="Cancelled",i=h.getSpan().nextRegExp(n.totalCancelPrice).tagContents().innerCapture(n.totalCancelPrice,1),o=h.getSpan().nextRegExp(n.totalCancelCurrencyPrice).tagContents().innerCapture(n.totalCancelCurrencyPrice,1)),ASSERT(s,p,m)?[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r,email:a},totalPrice:i,priceCurrency:o,checkinTime:s,checkoutTime:p,modifyReservationUrl:x,cancelReservationUrl:S,reservationStatus:"http://schema.org/Reservation"+(g||"Confirmed"),reservationId:c,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:l,url:C,telephone:u,address:m}}]:void 0}}).call();