(function(){return function(e,t,r){var a=Scanner.fromMessage(e);a.setLocale(t);var n,o,p,i,g,s,c,x,d,m,f,h,u,l,T,C,v,y,S,D,F=a.getSpan(),_="Confirmed";if(n=F.nextTag("td2").tagContents().innerCapture(regExpFormatted(/(.*) \1/,r.underPersonName_suffix),1),p=F.nextText(r.reservationId_prefix).nextTag("td3").tagContents(),[,S,D]=F.nextText(r.DateTime_prefix).nextTag("td3").tagContents().innerCapture(regExpFormatted(/(.*) ~ (.*)/)),(m=getFuzzyDate(a.getDetachedSpan(S.toString()).firstDate()))===a.getNullSpan()&&(m=S),(l=getFuzzyDate(a.getDetachedSpan(D.toString()).firstDate()))===a.getNullSpan()&&(l=D),c=F.nextText(r.pickup_prefix).nextTag("td3").tagContents().innerCapture(regExpFormatted(/(.*)\(/),1),f=F.nextText(r.dropoff_prefix).nextTag("td3").tagContents().innerCapture(regExpFormatted(/(.*)\(/),1),[,v,y]=F.nextText(r.price_prefix).nextTag("td3").tagContents().innerCapture(regExpFormatted(/(.*)(.)/)),i=F.nextText(r.carBrand_prefix).nextTag("td3").tagContents(),ASSERT(p,c,m))return[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:v,priceCurrency:y,reservationStatus:"http://schema.org/Reservation"+_,reservationId:p,modifyReservationUrl:T,cancelReservationUrl:C,underName:{"@type":"http://schema.org/Person",name:n,email:o},provider:{"@type":"http://schema.org/Organization",name:"Dongbu"},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:i},license:g,color:s},pickupTime:m,pickupLocation:{"@type":"http://schema.org/Place",name:c,telephone:x,address:d},dropoffTime:l,dropoffLocation:{"@type":"http://schema.org/Place",name:f,telephone:h,address:u}}]}}).call();