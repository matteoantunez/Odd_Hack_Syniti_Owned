(function(){return function(e,n,t){var a,r,o,c,s,i,g,l,p,m,h,C,u,d=Scanner.fromMessage(e);if(d.setLocale(n),a=d.getSpan().nextRegExp(t.nameCancel).tagContents().innerCapture(t.nameCancel,1),s=d.getSpan().nextRegExp(t.reservationIdCancel).tagContents().innerCapture(t.reservationIdCancel,1),p=d.getSpan().nextRegExp(t.hotelNameCancel).tagContents().innerCapture(t.hotelNameCancel,1),i=d.getSpan().nextRegExp(t.hotelNameCancel).tagContents().innerDate(),ASSERT(i,p))return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:a,email:r},totalPrice:o,priceCurrency:c,checkinTime:i,checkoutTime:g,modifyReservationUrl:C,cancelReservationUrl:u,reservationStatus:"http://schema.org/ReservationCancelled",reservationId:s,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:p,url:l,telephone:m,address:h}}]}}).call();