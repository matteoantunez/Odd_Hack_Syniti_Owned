new ReverseTemplateList([new ReverseTemplate("atgtickets-confirmation-en",function(e){return/^Confirmation of Order Number /.test(e.subject)},function(e){if(!/^Confirmation of Order Number /.test(e.subject))return CONTINUE;var t="en_GB",n={reservationIdPrefix:"Order #",namePrefix:"Customer Number:",pricePrefix:"TOTAL \xa3:",ticketDetailsPrefix:"PRICE TYPE - PRICE ZONE",ticketDetailsSuffix:"Additional Information:",eventTitleRegExp:/.+, ([^:]+): (.+)/,seatNumberRegExp:/Ticket Information\n(.+)\/([A-Z]+)\s*(\d+)/},r=Scanner.fromMessage(e);r.setLocale(t);var a,i,o,s,c,m,g,p,f,u,x,h,v,d,S,l=[];for(a=r.getSpan().next(n.reservationIdPrefix).nextTag("td2").tagContents(),i=r.getSpan().next(n.namePrefix).nextTag("td3").nextTag("td3").tagContents(),(o=r.getSpan().next(n.pricePrefix).nextTag("td3").tagContents())&&o.exists()&&(s=o.innerCapture(/([\d,.]+)/,1),c=o.innerCapture(/([^\d,.]+)/,1).trim()),S=r.getDetachedSpan(r.getSpan().next(n.ticketDetailsPrefix).withEnd(r.getSpan().next(n.ticketDetailsPrefix).next(n.ticketDetailsSuffix).getStart()).toString()).allInnerTagsFiltered("tr2"),d=0;d<S.length;d+=2){if((m=S[d].innerCapture(n.eventTitleRegExp))&&3===m.length&&(g=m[1].trim(),p=m[2].trim()),v=S[d].nextDate(),(f=S[d+1].innerCapture(n.seatNumberRegExp))&&4===f.length&&(u=f[1].trim(),x=f[2].trim(),h=f[3].trim()),ASSERT(v))l.push({startDate:v,eventName:p,eventLocation:g,seatSection:u,seatRow:x,seatNumber:h})}var T=[];return l.forEach(function(e){ASSERT(a)&&T.push({"@context":"http://schema.org","@type":"http://schema.org/EventReservation",name:i,totalPrice:s,priceCurrency:c,reservationStatus:"http://schema.org/ReservationConfirmed",reservationId:a,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:e.seatNumber,seatRow:e.seatRow,seatSection:e.seatSection}},reservationFor:{"@type":"http://schema.org/Event",eventStatus:"http://schema.org/EventConfirmed",name:e.eventName,startDate:e.startDate,location:{"@type":"http://schema.org/Place",name:e.eventLocation}}})}),T.length?T:void 0},"SGa533426a")]);