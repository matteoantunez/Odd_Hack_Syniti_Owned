(function(){return function(e,r,t){var a=Scanner.fromMessage(e);a.setLocale(r);var n,p,i,o,c,s,g,m,d,h,u,l,x,f,C,R=a.getSpan(),v="Confirmed";if(R.nextText(t.isCancellation)!==a.getNullSpan()&&(v="Cancelled"),n=R.innerCapture(t.underPersonNameRegExp,1),p=R.innerCapture(t.carProviderNameRegExp,1),i=R.innerCapture(t.carReservationIdRegExp,1),o=R.innerCapture(t.carBrandRegExp,1),c=R.innerCapture(t.pickUpNameRegExp,1),s=R.innerCapture(t.pickUpTelephoneRegExp,1),g=R.innerCapture(t.pickUpAddressRegExp,1),m=a.getDetachedSpan(R.innerCapture(t.pickUpDateTimePrefix,1).toString().replace(/\s*\uff08.\uff09\s*/," ")).innerDate(),d=c,h=s,u=g,l=a.getDetachedSpan(R.innerCapture(t.dropOffDateTimePrefix,1).toString().replace(/\s*\uff08.\uff09\s*/," ")).innerDate(),x=R.nextText(t.modifyReservationUrl).nextLink(),[,f,C]=R.innerCapture(t.pricePrefixRegExp),ASSERT(n,p,o,m,g))return[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:f,priceCurrency:C,reservationStatus:"http://schema.org/Reservation"+v,reservationId:i,modifyReservationUrl:x,underName:{"@type":"http://schema.org/Person",name:n},provider:{"@type":"http://schema.org/Organization",name:p},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:o}},pickupTime:m,pickupLocation:{"@type":"http://schema.org/Place",name:c,telephone:s,address:g},dropoffTime:l,dropoffLocation:{"@type":"http://schema.org/Place",name:d,telephone:h,address:u}}]}}).call();