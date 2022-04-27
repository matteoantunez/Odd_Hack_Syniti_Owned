(function(){return function(e,t,r){if(!r.emailSubject.test(e.subject))return CONTINUE;var n,a,p,s,i,o,d,g,f,x,c,m,S,u,h,A,C,P,l,v=Scanner.fromMessage(e);return v.setLocale(t),n=r.reservationStatus,l=r.provider,a=v.getSpan().innerCapture(r.reservationId,1),p=v.getSpan().innerCapture(r.underPersonName,1).trim(),d=v.getSpan().innerCapture(r.carBrand,1).trim(),r.changeReservationUrlPrefix&&(C=P=v.getSpan().nextRegExp(r.changeReservationUrlPrefix).nextLink()),i=v.getSpan().nextRegExp(r.pickUpDateTimePrefix).nextDate(),o=v.getSpan().nextRegExp(r.dropOffDateTimePrefix).nextDate(),(h=r.pickUpAddressPrefix&&r.pickUpAddressSuffix?v.getSpan().innerCapture(regExpFormatted(/\1[\n\s]+(.+)\n+([\s\S]+)[\n\s]+\2/,r.pickUpAddressPrefix,r.pickUpAddressSuffix)):r.pickUpAddressPrefix?v.getSpan().nextText(r.pickUpAddressPrefix).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1[\n\s]+(.+)\n+([\s\S]+)/,r.pickUpAddressPrefix)):i.parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1[\n\s]+(.+)\n+([\s\S]+)/,i.toString())))&&3===h.length&&([,c,m]=h),(A=r.dropOffAddressPrefix&&r.dropOffAddressSuffix?v.getSpan().innerCapture(regExpFormatted(/\1[\n\s]+(.+)\n+([\s\S]+)[\n\s]+\2/,r.dropOffAddressPrefix,r.dropOffAddressSuffix)):r.dropOffAddressPrefix?v.getSpan().nextText(r.dropOffAddressPrefix).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1[\n\s]+(.+)\n+([\s\S]+)/,r.dropOffAddressPrefix)):o.parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1[\n\s]+(.+)\n+([\s\S]+)/,o.toString())))&&3===A.length&&([,S,u]=A),(x=v.getSpan().nextRegExp(r.totalPricePrefix).nextAnyTag("td").tagContents().innerCapture(/([^0-9\.\,\s]+)\s*([0-9\.\,]+)/))&&3===x.length&&([,f,g]=x),"Confirmed"===n&&ASSERT(a,m,i)||"Cancelled"===n&&ASSERT(a)?[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:g,priceCurrency:f,reservationStatus:"http://schema.org/Reservation"+n,reservationId:a,modifyReservationUrl:C,cancelReservationUrl:P,underName:{"@type":"http://schema.org/Person",name:p,email:s},provider:{"@type":"http://schema.org/Organization",name:l},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:d}},pickupTime:i,pickupLocation:{"@type":"http://schema.org/Place",name:c,address:m},dropoffTime:o,dropoffLocation:{"@type":"http://schema.org/Place",name:S,address:u}}]:void 0}}).call();