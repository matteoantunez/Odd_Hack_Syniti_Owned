(function(){return function(e,t,n){var r=Scanner.fromMessage(e);r.setLocale(t);var a,s,i,o,g,p,d,c,h,f,l=r.getSpan();i=l.next(n.hotelAddress_preffix).previousDate().parentAnyTag("table").firstTag("td5").tagContents(),a=l.next(n.underPersonName_preffix).nextAnyTag("td").nextAnyTag("td").tagContents().toString().split("\n")[0].trim();var m=l.next(n.hotelAddress_preffix).previousDate().parentAnyTag("td").tagContents().toString().split("-");d=m[0],d=getFuzzyDate(r.getDetachedSpan(d).firstDate()),c=m[1],c=getFuzzyDate(r.getDetachedSpan(c).firstDate()),p=l.innerCapture(regExpFormatted(/\1 (.*) </,n.reservationId_preffix),1);var u=l.next(n.hotelAddress_preffix).parentAnyTag("td").tagContents().toString();(g=r.getDetachedSpan(u).firstAddress()).toString()||(g=r.getDetachedSpan(u).innerCapture(/>\s*?(.+?)</,1).trim()),o=/Tel: (.*),/.exec(u)[1];var x=n.hotelCancelled.test(e.plain)?"Cancelled":"Confirmed";if(ASSERT(i,g,d))return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:a,email:s},totalPrice:h,priceCurrency:f,checkinTime:d,checkoutTime:c,reservationStatus:"http://schema.org/Reservation"+x,reservationId:p,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:i,telephone:o,address:g}}]}}).call();