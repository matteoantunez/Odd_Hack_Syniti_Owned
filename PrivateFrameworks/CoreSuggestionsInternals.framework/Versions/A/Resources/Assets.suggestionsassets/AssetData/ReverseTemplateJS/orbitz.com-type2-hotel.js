(function(){return function(e,t,n){var a=Scanner.fromMessage(e);a.setLocale(t);var r,o,g,c,s,i,d,h,l,m=a.getSpan();s=(d=m.next(n.reservationDate).nextAnyTag("td").tagContents().innerCapture(/($<checkInDate>.*)\s-\s($<checkOutDate>.*)/))?d.$checkInDate:null,i=d?d.$checkOutDate:null,o=m.next(n.itinerary).nextAnyTag("td").tagContents(),g=m.next(n.checkIn).nextAnyTag("td").tagContents(),c=m.next(n.checkOut).nextAnyTag("td").tagContents(),h=combineDateAndTime(a.getDetachedSpan(s.toString()),a.getDetachedSpan(g.toString())),l=combineDateAndTime(a.getDetachedSpan(i.toString()),a.getDetachedSpan(c.toString()));var p=m.next(n.hotel).nextTag("table9").allInnerTagsFiltered("td9"),u=p[0],x=p[1],T=(m.next(n.hotel).nextTag("table9").allInnerTagsFiltered("td9")[2].innerCapture(regExpFormatted(/\1($<url>.*?)>/,n.hotelUrl)),m.next(n.reservedFor).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1\s($<name>.*)/,n.reservedFor)));if(r=T?T.$name:null,ASSERT(x,h,l))return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r},checkinTime:h,checkoutTime:l,reservationStatus:"http://schema.org/ReservationConfirmed",reservationId:o,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:u,address:x}}]}}).call();