(function(){return function(e,t,n){var r=Scanner.fromMessage(e);r.setLocale(t);var a,i,s,o,c,p,g,h,d,m,v,S=[];a=r.getSpan().innerCapture(n.reservationIdRegExp,1).trim(),i=r.getSpan().innerCapture(n.nameRegExp,1).trim(),(s=r.getSpan().next(n.pricePrefix).nextTag("td1").tagContents())&&s.exists()&&(o=s.innerCapture(/([\d,.]+)/,1),c=s.innerCapture(/([^\d,.]+)/,1).trim()),r.getDetachedSpan(r.getSpan().next(n.ticketDetailsPrefix).withEnd(r.getSpan().next(n.ticketDetailsPrefix).next(n.ticketDetailsSuffix).getStart()).toString()).allInnerTags("tr1").forEach(function(e){(m=e.allInnerTags("td1"),(p=m[0].innerCapture(n.eventDetailsRegExp))&&4===p.length)&&(h=p[1].trim(),g=p[2].trim(),d=p[3].innerDate(),g&&(v=r.getSpan().next(n.eventAddressPrefix).next(g).nextAddress()),ASSERT(d)&&S.push({startDate:d,eventName:h,eventLocation:g,eventAddress:v}))});var x=[];if(S.forEach(function(e){ASSERT(a)&&x.push({"@context":"http://schema.org","@type":"http://schema.org/EventReservation",name:i,totalPrice:o,priceCurrency:c,reservationStatus:"http://schema.org/ReservationConfirmed",reservationId:a,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat"}},reservationFor:{"@type":"http://schema.org/Event",eventStatus:"http://schema.org/EventConfirmed",name:e.eventName,startDate:e.startDate,location:{"@type":"http://schema.org/Place",name:e.eventLocation,address:e.eventAddress}}})}),x.length)return x}}).call();