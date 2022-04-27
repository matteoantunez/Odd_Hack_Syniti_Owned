(function(){return function(e,t,r){function n(e){return e=e.replace(/[^\d\sa-zA-z:\u6642\u5206]+/g," ").replace(/\s+/g," ").replace(/^(\d+)\s(\d+)\s/,"$1/$2/"),e=getFuzzyDate(k.getDetachedSpan(e))}var a,i,o,p,c,s,g,m,u,h,l,d,S,f,C,v,y,R,N,T,k=Scanner.fromMessage(e);k.setLocale(t);var P="Toyota";if(o=k.getSpan().innerCapture(r.reservationId,1),a=k.getSpan().innerCapture(r.guestName,1),i=k.getSpan().innerCapture(r.guestEmail,1),y=k.getSpan().innerCapture(r.pickupNameAndPhone,1).toString(),N=k.getSpan().innerCapture(r.pickupNameAndPhone,2).toString(),0!==y.toString().length&&null!==y||(y=k.getSpan().innerCapture(r.pickupName,1).toString()),T=n(T=k.getSpan().innerCapture(r.pickupTime,1).toString()),S=k.getSpan().innerCapture(r.dropoffName,1).toString(),v=n(v=k.getSpan().innerCapture(r.dropoffTime,1).toString()),h=k.getSpan().innerCapture(r.car,1).toString(),0===(U=k.getSpan().innerCapture(r.price,1)).toString().length||null===U)var U=k.getSpan().innerCapture(r.priceAlt,1);if(m=U.innerCapture(/([\d,.]+)/,1),u=U.innerCapture(/([^\d,.]+)/,1).trim(),0===a.toString.length&&r.reminderSubject.test(e.subject)&&(a=k.getSpan().innerCapture(/(.+)/,1)),r.confirmSubject.test(e.subject)){if(!ASSERT(a,o,T,v,R||y,f||S))return CONTINUE;p="Confirmed"}if(r.cancellationSubject.test(e.subject)){if(!ASSERT(a,o,T,v,R||y,f||S))return CONTINUE;p="Cancelled"}return h.toString().length>0?[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:m,priceCurrency:u,reservationId:o,reservationStatus:"http://schema.org/Reservation"+(p||"Confirmed"),checkinUrl:c,modifyReservationUrl:s,cancelReservationUrl:g,underName:{"@type":"http://schema.org/Person",name:a,email:i},provider:{"@type":"http://schema.org/Organization",name:P},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:h},license:l,color:d},pickupTime:T,pickupLocation:{"@type":"http://schema.org/Place",name:y,telephone:N,address:R||y},dropoffTime:v,dropoffLocation:{"@type":"http://schema.org/Place",name:S,telephone:C,address:f||S}}]:[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:m,priceCurrency:u,reservationId:o,reservationStatus:"http://schema.org/Reservation"+(p||"Confirmed"),checkinUrl:c,modifyReservationUrl:s,cancelReservationUrl:g,underName:{"@type":"http://schema.org/Person",name:a,email:i},provider:{"@type":"http://schema.org/Organization",name:P},pickupTime:T,pickupLocation:{"@type":"http://schema.org/Place",name:y,telephone:N,address:R||y},dropoffTime:v,dropoffLocation:{"@type":"http://schema.org/Place",name:S,telephone:C,address:f||S}}]}}).call();