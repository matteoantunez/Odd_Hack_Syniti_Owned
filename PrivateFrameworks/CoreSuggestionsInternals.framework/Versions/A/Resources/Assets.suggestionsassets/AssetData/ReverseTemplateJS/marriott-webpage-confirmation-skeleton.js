(function(){return function(e,t,n){if(int(e.epoch)<1514764800)return CONTINUE;var r,a,i,o,p,s,c,g,u,h,d,m,C,S=Scanner.fromMessage(e);S.setLocale(t),p="Confirmed",o=S.getSpan().innerCapture(n.reservationId,1),r=S.getSpan().innerCapture(n.guestName,1).trim(),c=S.getSpan().innerCapture(n.checkInDate,1),h=S.getSpan().innerCapture(n.checkOutDate,1),g=getFuzzyDate(S.getDetachedSpan(c+" "+s).innerDate()),d=getFuzzyDate(S.getDetachedSpan(h+" "+u).innerDate());var l=S.getSpan().innerCapture(n.price,1);return null!=n.hotelAddress&&(C=S.getSpan().innerCapture(n.hotelAddress,1)),a=l.innerCapture(/([\d,.]+)/,1),i=l.innerCapture(/([^\d,.]+)/,1).trim(),m=S.getSpan().nextRegExp(n.hotelInfo).tagContents().innerCapture(n.hotelInfo,1),ASSERT(o,m,g,d),[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r},totalPrice:a,priceCurrency:i,checkinTime:g,checkoutTime:d,reservationStatus:"http://schema.org/Reservation"+(p||"Confirmed"),reservationId:o,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:m,address:C}}]}}).call();