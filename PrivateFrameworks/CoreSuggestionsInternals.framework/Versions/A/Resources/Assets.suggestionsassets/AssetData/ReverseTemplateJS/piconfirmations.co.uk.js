(function(){return function(e,t,n){var a,r,i,o,s,g,c,m,l,p,u,C,x,d,T=Scanner.fromMessage(e);if(T.setLocale(t),!n.emailTitelConfirmation.test(e.subject)&&!n.emailTitelCancelConfirmation.test(e.subject))return CONTINUE;s=T.getSpan().innerCapture(n.reservationId,1),a=T.getSpan().nextRegExp(n.guestName).tagContents().innerCapture(n.guestName,1);var h=T.getSpan().nextText(n.hotel).nextAnyTag("td").nextAnyTag("td").tagContents();p=h.innerCapture(/(.+)/,1),C=h.innerCapture(n.hotelAddress,1),u=h.innerPhoneNumber(),l=T.getSpan().nextText(n.hotelUrl).tagContents().nextLink(),c=T.getSpan().nextText(n.checkInDate).nextAnyTag("td").tagContents().innerDate(),m=T.getSpan().nextText(n.checkOutDate).nextAnyTag("td").tagContents().innerDate(),x=d=T.getSpan().nextText(n.modifyUrl).tagContents().nextLink();var f=T.getSpan().nextRegExp(n.price).nextAnyTag("td").tagContents();if(i=f.innerCapture(/([\d,.]+)/,1),o=f.innerCapture(/([^\d,.]+)/,1).trim(),n.emailTitelConfirmation.test(e.subject)){if(!ASSERT(a,s,c,m,C))return CONTINUE;g="Confirmed"}if(n.emailTitelCancelConfirmation.test(e.subject)){if(!ASSERT(a,c,m,C))return CONTINUE;g="Cancelled"}return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:a,email:r},totalPrice:i,priceCurrency:o,checkinTime:c,checkoutTime:m,modifyReservationUrl:x,cancelReservationUrl:d,reservationStatus:"http://schema.org/Reservation"+(g||"Confirmed"),reservationId:s,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:p,url:l,telephone:u,address:C}}]}}).call();