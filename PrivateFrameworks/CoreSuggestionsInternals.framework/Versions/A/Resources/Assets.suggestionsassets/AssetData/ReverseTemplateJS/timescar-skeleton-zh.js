(function(){return function(e,t,r){function a(e){return e=e.replace(/[^\d\sa-zA-z:\u6642\u5206]+/g," ").replace(/\s+/g," ").replace(/^(\d+)\s(\d+)\s/,"$1/$2/"),e=getFuzzyDate(k.getDetachedSpan(e))}var n,o,i,p,c,s,m,g,u,d,h,l,S,f,C,v,y,R,T,U,k=Scanner.fromMessage(e);k.setLocale(t);var N="Timescar";i=k.getSpan().innerCapture(r.reservationId,1),n=k.getSpan().innerCapture(r.guestName,1),U=a(U=k.getSpan().innerCapture(r.pickupTime,1).toString()),R=k.getSpan().innerCapture(r.pickupAddress,1).toString(),v=a(v=k.getSpan().innerCapture(r.dropoffTime,1).toString()),f=k.getSpan().innerCapture(r.dropoffAddress,1).toString(),d=k.getSpan().innerCapture(r.car,1).toString();var P=k.getSpan().innerCapture(r.price,1);if(g=P.innerCapture(/([\d,.]+)/,1),u=P.innerCapture(/([^\d,.]+)/,1).trim(),m=s=k.getSpan().innerCapture(r.modifyUrl,1).toString(),r.confirmSubject.test(e.subject)&&!ASSERT(n,i,U,v,R||y,f||S))return CONTINUE;if(r.cancellationSubject.test(e.subject)){if(i=k.getSpan().innerCapture(r.cancellationReservationId,1),n=k.getSpan().innerCapture(r.cancellationGuestName,1),!ASSERT(n,i))return CONTINUE;p="Cancelled"}return d?[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:g,priceCurrency:u,reservationId:i,reservationStatus:"http://schema.org/Reservation"+(p||"Confirmed"),checkinUrl:c,modifyReservationUrl:s,cancelReservationUrl:m,underName:{"@type":"http://schema.org/Person",name:n,email:o},provider:{"@type":"http://schema.org/Organization",name:N},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:d},license:h,color:l},pickupTime:U,pickupLocation:{"@type":"http://schema.org/Place",name:y,telephone:T,address:R},dropoffTime:v,dropoffLocation:{"@type":"http://schema.org/Place",name:S,telephone:C,address:f}}]:[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:g,priceCurrency:u,reservationId:i,reservationStatus:"http://schema.org/Reservation"+(p||"Confirmed"),checkinUrl:c,modifyReservationUrl:s,cancelReservationUrl:m,underName:{"@type":"http://schema.org/Person",name:n,email:o},provider:{"@type":"http://schema.org/Organization",name:N},pickupTime:U,pickupLocation:{"@type":"http://schema.org/Place",name:y,telephone:T,address:R},dropoffTime:v,dropoffLocation:{"@type":"http://schema.org/Place",name:S,telephone:C,address:f}}]}}).call();