(function(){return function(e,t,n){var r,a,i,o,c,s,u,l,m,p,T,g,d,h,C=Scanner.fromMessage(e);if(C.setLocale(t),!n.emailTitelConfirmation.test(e.subject)&&!n.emailTitelCancelConfirmation.test(e.subject))return CONTINUE;c=C.getSpan().innerCapture(n.reservationId,1);var S=C.getSpan().nextText(n.price).nextAnyTag("td").innerCapture(/($<price>[\d,.]+)\s+($<currency>[A-Z]{3})/);i=S?S.$price:null,o=S?S.$currency:null,r=C.getSpan().innerCapture(n.guestName,1),u=C.getSpan().nextText(n.checkInDate).nextDate(),l=C.getSpan().nextText(n.checkOutDate).nextDate();var f=C.getSpan().nextText("BEST WESTERN").parentAnyTag("td").tagContents().innerCapture(/($<name>BEST WESTERN .+)\n($<address>[^]+)\nPhone: ($<phone>.*)/);if(f&&(p=f.$name,g=f.$address,T=f.$phone),n.emailTitelConfirmation.test(e.subject)){if(!ASSERT(r,c,u,l,g))return CONTINUE;s="Confirmed"}if(n.emailTitelCancelConfirmation.test(e.subject)){if(!ASSERT(r,c,u,l,g))return CONTINUE;s="Cancelled"}return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r,email:a},totalPrice:i,priceCurrency:o,checkinTime:u,checkoutTime:l,modifyReservationUrl:d,cancelReservationUrl:h,reservationStatus:"http://schema.org/Reservation"+(s||"Confirmed"),reservationId:c,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:p,url:m,telephone:T,address:g}}]}}).call();