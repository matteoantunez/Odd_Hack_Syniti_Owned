(function(){return function(e,t,n){var a,r,i,o,s,g,p,c,m,u,C,l,x,d,f=Scanner.fromMessage(e);if(f.setLocale(t),!n.emailTitelConfirmation.test(e.subject)&&!n.emailTitelCancelConfirmation.test(e.subject))return CONTINUE;s=f.getSpan().nextRegExp(n.reservationId).nextAnyTag("td").tagContents(),a=f.getSpan().nextRegExp(n.guestName).nextAnyTag("td").tagContents().innerCapture(/.+\n(.+)/,1),r=f.getSpan().nextRegExp(n.guestEmail).nextAnyTag("td").tagContents().innerCapture(/(.+)/,1);var h=f.getSpan().nextRegExp(n.dates).nextAnyTag("td").tagContents();p=h.innerDate(),c=h.lastInnerDate(),i=(E=f.getSpan().nextRegExp(n.price).tagContents().innerCapture(n.price,1)).innerCapture(/([\d,.]+)/,1),o=E.innerCapture(/([^\d,.]+)/,1).trim();var T=f.getSpan().nextTag("td1").tagContents();if(u=T.innerCapture(regExpFormatted(/(.+)</),1),l=T.innerAddress(),C=f.getSpan().nextRegExp(n.hotelInfo).nextPhoneNumber(),m=f.getSpan().nextRegExp(n.hotelInfo).nextLink().nextLink(),n.emailTitelConfirmation.test(e.subject)){if(!ASSERT(a,s,p,c,l))return CONTINUE;g="Confirmed"}if(n.emailTitelCancelConfirmation.test(e.subject)){var E;if(i=(E=f.getSpan().nextRegExp(n.cancelPrice).nextAnyTag("th").tagContents()).innerCapture(/([\d,.]+)/,1),o=E.innerCapture(/([^\d,.]+)/,1).trim(),!ASSERT(a,s,p,c,l))return CONTINUE;g="Cancelled"}return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:a,email:r},totalPrice:i,priceCurrency:o,checkinTime:p,checkoutTime:c,modifyReservationUrl:x,cancelReservationUrl:d,reservationStatus:"http://schema.org/Reservation"+(g||"Confirmed"),reservationId:s,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:u,url:m,telephone:C,address:l}}]}}).call();