(function(){return function(e,t,n){if(/schema\.org/.test(e.html))return CONTINUE;var r=Scanner.fromMessage(e);r.setLocale(t);var a,o,i,s,x,c,g,h,d,l,m,T=r.getSpan(),f="Confirmed";return g=T.nextText(n.reservationIdPrefix).nextAnyTag("td").tagContents().innerCapture(/(\d+)/,1),d=T.nextText(n.hotelReservationCancelUrlPrefix).nextLink(),a=T.innerCapture(regExpFormatted(/\1\s(.+),/,n.underPersonNamePrefix),1),l=T.nextText(n.checkInDatePrefix).nextAnyTag("td").innerDate(),m=T.nextText(n.checkOutDatePrefix).nextAnyTag("td").innerDate(),i=(T=T.nextText(n.hotelDetailsPrefix)).nextText(n.hotelNamePrefix).nextAnyTag("td").tagContents(),s=T.nextText(n.hotelPhonePrefix).nextAnyTag("td").tagContents(),c=T.nextText(n.hotelAddressPrefix).nextAnyTag("td").tagContents().replace(/\n/g,", "),ASSERT(a,i,l)?[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:a,email:o},checkinTime:l,checkoutTime:m,reservationStatus:"http://schema.org/Reservation"+f,reservationId:g,modifyReservationUrl:h,cancelReservationUrl:d,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:i,url:x,telephone:s,address:c}}]:CONTINUE}}).call();