(function(){return function(e,r,t,n){var a=Scanner.fromMessage(e);a.setLocale(r);var i,o,p,s,c,m,u,g,d,x,h,l,f,v=a.getSpan(),F=n;if(x=v.innerCapture(regExpFormatted(/\1(.*)\n(.*)\n(.*)\n/,t.reservationFor_prefix),3),(f=v.nextAddress())===a.getNullSpan()&&(f=v.innerCapture(regExpFormatted(/\1(.*)\n(.*)\n(.*)\n([\s\S]*)T:/,t.reservationFor_prefix),4)),l=v.innerCapture(regExpFormatted(/\1 (.*)\n/,t.reservationFor_telephone_prefix),1),d=v.innerCapture(regExpFormatted(/\1 (.*)\n/,t.reservationId_prefix),1),i=v.innerCapture(regExpFormatted(/\1 (.*)\n/,t.underName_name_prefix),1),c=v.innerCapture(regExpFormatted(/\1 (.*)\n/,t.checkinTime_prefix),1),m=v.innerCapture(regExpFormatted(/\1 (.*)\n/,t.checkoutTime_prefix),1),p=v.innerCapture(regExpFormatted(/\1 (.*)\n/,t.totalPrice_prefix),1),ASSERT(c,m,f))return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:i,email:o},totalPrice:p,priceCurrency:s,checkinTime:c,checkoutTime:m,modifyReservationUrl:u,cancelReservationUrl:g,reservationStatus:"http://schema.org/Reservation"+F,reservationId:d,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:x,url:h,telephone:l,address:f}}]}}).call();