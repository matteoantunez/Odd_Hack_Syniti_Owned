(function(){return function(e,t,n){var a,r=Scanner.fromMessage(e);r.setLocale(t);var s=r.getSpan().next(n.namePrefix).nextAnyTag("td").nextAnyTag("td").tagContents().split("\n")[0];a=r.getSpan().innerCapture(n.reservationId,1);var i=r.getSpan().nextTag("table9").nextAnyTag("td").nextAnyTag("td").nextAnyTag("td").tagContents(),g=i.split("\n")[0],o=g.previousDate().split("-"),p=o[0];p=r.getDetachedSpan(unSpanDate_(p)).innerDate();var c=o[1];c=r.getDetachedSpan(unSpanDate_(c)).innerDate();var d=i.split("\n")[2];a.exists()||(a=r.getSpan().innerCapture(n.reservationIdPrefix,1));var h=[];ASSERT(a)&&h.push({"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:s},checkinTime:p,checkoutTime:c,reservationStatus:"http://schema.org/ReservationCancelled",reservationId:a,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:g,address:d}});if(h.length)return h}}).call();