(function(){return function(e,n,t){function a(e){return e=e.replace(/[^\d\sa-zA-z:\u6642]+/g," ").replace(/\s+/g," ").replace(/^(\d+)\s(\d+)\s/,"$1/$2/"),e=getFuzzyDate(f.getDetachedSpan(e))}var r,i,c,p,u,o,s,l,C,g,m,h,S,d,f=Scanner.fromMessage(e);if(f.setLocale(n),!t.emailTitelConfirmation.test(e.subject)&&!t.emailTitelCancelConfirmation.test(e.subject))return CONTINUE;if(u=f.getSpan().innerCapture(t.reservationId,1),r=f.getSpan().innerCapture(t.guestName,1),i=f.getSpan().innerCapture(t.guestEmail,1),s=a(s=f.getSpan().innerCapture(t.checkInDate,1)+" "+f.getSpan().innerCapture(t.checkInTime,1)),l=a(l=f.getSpan().innerCapture(t.checkOutDate,1)+" "+f.getSpan().innerCapture(t.checkOutTime,1)),c=f.getSpan().innerCapture(t.price,1).innerCapture(/([\d,.]+)/,1),g=f.getSpan().innerCapture(t.hotelName,1),m=f.getSpan().innerCapture(t.hotelPhone,1),h=f.getSpan().innerCapture(t.hotelAddress,1).toString(),t.emailTitelConfirmation.test(e.subject)){if(!ASSERT(r,u,s,l,h))return CONTINUE;o="Confirmed"}if(t.emailTitelCancelConfirmation.test(e.subject)){if(u=f.getSpan().innerCapture(t.cancelReservationId,1),r=f.getSpan().innerCapture(t.cancelGuestName,1),i=f.getSpan().innerCapture(t.cancelGuestEmail,1),s=a(s=f.getSpan().innerCapture(t.cancelCheckInDate,1)+" "+f.getSpan().innerCapture(t.cancelCheckInTime,1)),l=a(l=f.getSpan().innerCapture(t.cancelCheckOutDate,1)+" "+f.getSpan().innerCapture(t.cancelCheckOutTime,1)),!ASSERT(r,u,s,l,h))return CONTINUE;o="Cancelled"}return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r,email:i},totalPrice:c,priceCurrency:p,checkinTime:s,checkoutTime:l,modifyReservationUrl:S,cancelReservationUrl:d,reservationStatus:"http://schema.org/Reservation"+(o||"Confirmed"),reservationId:u,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:g,url:C,telephone:m,address:h}}]}}).call();