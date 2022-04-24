(function(){return function(e,t,r){function n(e){return e=e.replace(/[^\d\sa-zA-z:]+/g," ").replace(/\s+/g," ").replace(/^(\d+)\s(\d+)\s/,"$1/$2/"),e=getFuzzyDate(S.getDetachedSpan(e))}var a,i,o,s,c,p,u,l,m,g,C,d,h,f,S=Scanner.fromMessage(e);if(S.setLocale(t),!r.emailTitelCancelConfirmation.test(e.subject))return CONTINUE;c=S.getSpan().innerCapture(r.reservationId,1),a=S.getSpan().innerCapture(r.guestName,1),i=S.getSpan().innerCapture(r.guestEmail,1),u=n(u=S.getSpan().innerCapture(r.checkInDate,1).toString());var v=S.getSpan().innerCapture(r.price,1);o=v.innerCapture(/([\d,.]+)/,1),s=v.innerCapture(/([^\d,.]+)/,1).trim(),g=S.getSpan().innerCapture(r.hotelName,1);var N=S.getSpan().innerCapture(r.hotelInfo,1);if(d=N.innerCapture(r.hotelAddress,1).trim(),C=N.innerPhoneNumber(),r.emailTitelConfirmation.test(e.subject)){if(!ASSERT(a,c,u,l,d))return CONTINUE;p="Confirmed"}if(r.emailTitelCancelConfirmation.test(e.subject)){if(!ASSERT(a,c,u,g))return CONTINUE;p="Cancelled"}return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:a,email:i},totalPrice:o,priceCurrency:s,checkinTime:u,checkoutTime:l,modifyReservationUrl:h,cancelReservationUrl:f,reservationStatus:"http://schema.org/Reservation"+(p||"Confirmed"),reservationId:c,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:g,url:m,telephone:C,address:d}}]}}).call();