(function(){return function(e,t,n){var a=Scanner.fromMessage(e);if(a.setLocale(t),a.getSpan().innerCapture(regExpFormatted(/(\1)\s\n\n\2/,n.cancellation,n.underPersonNamePrefix),1)===a.getNullSpan())return CONTINUE;var r,o,g,i,s,x,p,c,d,T="Cancelled";return p=a.getSpan().nextText(n.reservationIdPrefix).nextAnyTag("td").tagContents(),r=a.getSpan().innerCapture(regExpFormatted(/\1\s(.*?),/,n.underPersonNamePrefix),1),o=a.getSpan().nextText(n.underPersonEmailPrefix).nextAnyTag("td").tagContents(),c=a.getSpan().nextText(n.checkInDateTimePrefix).nextAnyTag("td").innerDate(),d=a.getSpan().nextText(n.checkOutDateTimePrefix).nextAnyTag("td").innerDate(),g=a.getSpan().nextText(n.hotelNamePrefix).nextAnyTag("td").tagContents(),i=a.getSpan().nextText(n.hotelPhonePrefix).nextAnyTag("td").tagContents(),x=a.getSpan().nextText(n.hotelAddressPrefix).nextAnyTag("td").tagContents().replace(/\n/g,", "),ASSERT(r,x,c)?[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r,email:o},checkinTime:c,checkoutTime:d,reservationStatus:"http://schema.org/Reservation"+T,reservationId:p,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:g,url:s,telephone:i,address:x}}]:CONTINUE}}).call();