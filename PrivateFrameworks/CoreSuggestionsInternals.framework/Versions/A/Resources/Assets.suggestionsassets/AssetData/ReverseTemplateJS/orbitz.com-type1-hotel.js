(function(){return function(e,t,n){var a=Scanner.fromMessage(e);a.setLocale(t);var r,s,o,i,g,d,p,c=a.getSpan(),l=c.next(n.hotelCancelled).exists()?"Cancelled":"Confirmed",h=c.next(n.hotelServices).previousTag("table5").previousTag("table5").previousTag("table5");h.toString()||"Cancelled"!==l||(h=c.next(n.hotelCancelled).previousTag("table5").previousTag("table5")),s=h.nextAnyTag("td").tagContents();var u=h.nextAnyTag("td").nextAnyTag("td").tagContents().getString().split("-");d=u[0],d=getFuzzyDate(a.getDetachedSpan(d).firstDate()),p=u[1],p=getFuzzyDate(a.getDetachedSpan(p).firstDate()),g=c.innerCapture(regExpFormatted(/\1 (\w+)/,n.reservationId_prefix),1);var m=h.next(n.hotelAddress_prefix).parentAnyTag("td").tagContents().toString();if("Confirmed"===l&&(r=h.next(n.underPersonName_prefix).nextTag("td8").nextTag("td8").tagContents().split("\n")[0].trim()),(i=a.getDetachedSpan(m).firstAddress()).toString()||(i=a.getDetachedSpan(m).innerCapture(/>([\s\w\,]+?)</,1).trim()),o=/Tel: ([()\w\s-]+)/.exec(m)[1],ASSERT(s,i,d))return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r},checkinTime:d,checkoutTime:p,reservationStatus:"http://schema.org/Reservation"+l,reservationId:g,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:s,telephone:o,address:i}}]}}).call();