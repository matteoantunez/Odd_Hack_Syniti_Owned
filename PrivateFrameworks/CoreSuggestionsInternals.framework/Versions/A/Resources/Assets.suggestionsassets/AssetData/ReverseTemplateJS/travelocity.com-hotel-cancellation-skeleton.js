(function(){return function(e,t,n){var a,r,s,g,c,i,o,d,p,h,l,m,u,S,T,v,x=Scanner.fromMessage(e);if(x.setLocale(t),a=x.getSpan().nextText(n.name).nextTag("td9").nextTag("td9").tagContents().innerCapture(/(.*)\s/,1).trim(),(o=x.getSpan().nextTag("table6").nextTag("td6").tagContents().innerCapture(/($<checkIn>(.*)) - ($<checkOut>.*)/))&&(h=x.getDetachedSpan(o.$checkIn.toString().replace(/\//g," ")).innerDate(),l=x.getDetachedSpan(o.$checkOut.toString().replace(/\//g," ")).innerDate()),S=(m=(s=x.getSpan().nextTag("table9").lastInnerTag("td9").tagContents()).innerCapture(/($<name>.*)\s+($<address>.*)/))?m.$name:null,(!(v=m?m.$address:null)||s.innerAddress().getLength()>=v.getLength())&&(v=s.innerAddress()),i=x.getSpan().innerCapture(regExpFormatted(/\1\s+(\d+)/,n.reservationId),1),ASSERT(a,S,v,h,l))return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:a,email:r},totalPrice:g,priceCurrency:c,checkinTime:h,checkoutTime:l,modifyReservationUrl:d,cancelReservationUrl:p,reservationStatus:"http://schema.org/ReservationCancelled",reservationId:i,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:S,url:u,telephone:T,address:v}}]}}).call();