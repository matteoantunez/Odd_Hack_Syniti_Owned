(function(){return function(e,t,r){var n,a,o,i,p,s,m,c,g,d,l,h,u,x,E,S,f,v,C,R,y,P=Scanner.fromMessage(e);P.setLocale(t),o=P.getSpan().innerCapture(regExpFormatted(/\1 (\w+)/,r.confirmationNumberPrefix),1);var $=P.getSpan().nextText(r.pickupHeader).withEnd(P.getSpan().nextText(r.dropoffHeader).getStart());y=$.innerDate(),C=$.withStart(y.getEnd()).trim().innerCapture(/(.*)\s/,1).trim(),R=$.innerPhoneNumber();var F=P.getSpan().nextText(r.dropoffHeader).withEnd(P.getSpan().nextRegExp(regExpFormatted(/\1\s+-----/,r.carHeader)).getStart());f=F.innerDate(),E=F.withStart(F.getEnd()).trim().innerCapture(/(.*)\s/,1).trim(),S=F.innerPhoneNumber(),not(E)&&(E=C),not(S)&&(S=R),d=(d=P.getSpan().nextRegExp(regExpFormatted(/\1\s+-----/,r.carHeader)).withEnd(P.getSpan().nextRegExp(regExpFormatted(/\1\s+-----/,r.optionsHeader)).getStart()).trim()).exists()?d.innerCapture(/\s(.*)$/,1):null,n=(u=(u=P.getSpan().nextRegExp(regExpFormatted(/\1\s+-----+/,r.personalInformationHeader)).collapseToEnd().withEnd(P.getSpan().nextRegExp(regExpFormatted(/\1\s+-----+/,r.promisedRateHeader)).getStart()).trim())?u.innerCapture(/^($<name>.*)\s+($<email>.*)\s+/):null)?u.$name:null,a=u?u.$email:null;var H=P.getSpan().innerCapture(regExpFormatted(/\s+-+\s+\1 ($<priceCurrency>[A-Z]{3})\s+: ($<totalPrice>[\d,.]+)/,r.pricePrefix));if(c=H?H.$totalPrice:null,g=H?H.$priceCurrency:null,ASSERT(o,n,d,C,y))return[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:c,priceCurrency:g,reservationId:o,reservationStatus:"http://schema.org/Reservation"+(i||"Confirmed"),checkinUrl:p,modifyReservationUrl:s,cancelReservationUrl:m,underName:{"@type":"http://schema.org/Person",name:n,email:a},provider:{"@type":"http://schema.org/Organization",name:"Budget"},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:d},license:l,color:h},pickupTime:y,pickupLocation:{"@type":"http://schema.org/Place",name:v,telephone:R,address:C},dropoffTime:f,dropoffLocation:{"@type":"http://schema.org/Place",name:x,telephone:S,address:E}}]}}).call();