(function(){return function(e,t,n){var a,r,p,i,o,c,g,l,m,u,s,C,d,S,f,h,v,T,k,D,y=Scanner.fromMessage(e);if(y.setLocale(t),n.cancel.test(e.subject))p=y.getSpan().innerCapture(n.cancellationId,1),a=y.getSpan().innerCapture(n.guestNameCancel,1),D=y.getSpan().innerCapture(n.pickUpDateCancel,1).innerDate(),h=y.getSpan().innerCapture(n.dropOffDateCancel,1).innerDate(),T=y.getSpan().innerCapture(n.pickUpLocCancel,1),S=y.getSpan().innerCapture(n.dropOffLocCancel,1),u=y.getSpan().innerCapture(n.car,1),i="Cancelled";else{var U,L;p=y.getSpan().innerCapture(n.reservationId,1),a=y.getSpan().innerCapture(n.guestName,1).toString().trim(),!(U=y.getSpan().innerCapture(n.pickUpTime))&&n.pickUpTimeAlt&&(U=y.getSpan().innerCapture(n.pickUpTimeAlt)),D=U.$pickupDateTime.toString().replace(/\./g,"/"),D=y.getDetachedSpan(D).innerDate(),!(L=y.getSpan().innerCapture(n.dropoffTime))&&n.dropoffTimeAlt&&(L=y.getSpan().innerCapture(n.dropoffTimeAlt)),L&&(h=L.$dropoffDateTime.toString().replace(/\./g,"/"),h=y.getDetachedSpan(h).innerDate()),T=y.getSpan().innerCapture(n.pickUpLoc,1),S=y.getSpan().innerCapture(n.dropOffLoc,1);var P=y.getSpan().allPhoneNumbers();k=P[1],f=P[2],u=y.getSpan().innerCapture(n.car,1);var R=y.getSpan().nextRegExp(n.totalPrice).innerCapture(n.totalPrice,1);l=R.innerCapture(/([\d.,]+)/,1),m=R.innerCapture(/([^\d.,]+)/,1).trim()}if(ASSERT(p,a,u,T,D))return[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:l,priceCurrency:m,reservationId:p,reservationStatus:"http://schema.org/Reservation"+(i||"Confirmed"),checkinUrl:o,modifyReservationUrl:c,cancelReservationUrl:g,underName:{"@type":"http://schema.org/Person",name:a,email:r},provider:{"@type":"http://schema.org/Organization",name:"Budget"},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:u},license:s,color:C},pickupTime:D,pickupLocation:{"@type":"http://schema.org/Place",name:v,telephone:k,address:T},dropoffTime:h,dropoffLocation:{"@type":"http://schema.org/Place",name:d,telephone:f,address:S}}]}}).call();