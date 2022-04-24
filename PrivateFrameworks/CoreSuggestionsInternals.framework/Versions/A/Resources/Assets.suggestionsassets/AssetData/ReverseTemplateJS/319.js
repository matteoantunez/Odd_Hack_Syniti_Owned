new ReverseTemplateList([new ReverseTemplate("muenchenticket-confirmation-de",function(e){return/^Reservierungsbestaetigung /.test(e.subject)},function(e){var t="de_DE",n={reservationIdRegExp:/Kartenbestellung Nr. (.+) vom/,nameRegExp:/Sehr geehrte (.+),/,priceRegExp:/Gesamtpreis inkl\. MwSt\.: (.+)/,ticketDetailsPrefix:"Bestelldetails:",ticketDetailsSuffix:"Gesamtpreis inkl. MwSt.",eventNameRegExp:/, [A-Z][a-z]\. (.+)/,ticketNumberRegExp:/(.+) \| .+ \| .+/,ticketVenueRegExp:/([^,\n]+),.+Reihe: (.+), Sitz: (.+)/},r=Scanner.fromMessage(e);r.setLocale(t);var a,i,s,p,c,o,g,m,u,x,h,v,S,R=[];for(a=r.getSpan().innerCapture(n.reservationIdRegExp,1),i=r.getSpan().innerCapture(n.nameRegExp,1),(s=r.getSpan().innerCapture(n.priceRegExp,1))&&s.exists()&&(p=s.innerCapture(/([\d,.]+)/,1),c=s.innerCapture(/([^\d,.]+)/,1).trim()),S=r.getDetachedSpan(r.getSpan().next(n.ticketDetailsPrefix).withEnd(r.getSpan().next(n.ticketDetailsPrefix).next(n.ticketDetailsSuffix).getStart()).toString()).nextDate();S.exists();){if(h=r.getDetachedSpan(S.toString()+" "+S.nextDate().toString()).innerDate(),(S=S.next(n.eventNameRegExp)).exists()&&(v=S.innerCapture(n.eventNameRegExp,1).trim()),(S=S.next(n.ticketNumberRegExp)).exists()&&(o=S.innerCapture(n.ticketNumberRegExp,1).trim()),(S=S.next(n.ticketVenueRegExp)).exists()&&(g=S.innerCapture(n.ticketVenueRegExp))&&4===g.length&&(m=g[1].trim(),u=g[2].trim(),x=g[3].trim()),ASSERT(h,o))R.push({startDate:h,eventName:v,ticketNumber:o,eventLocation:m,seatRow:u,seatNumber:x});S.exists()&&(S=S.nextDate())}var E=[];if(R.forEach(function(e){ASSERT(a)&&E.push({"@context":"http://schema.org","@type":"http://schema.org/EventReservation",name:i,totalPrice:p,priceCurrency:c,reservationStatus:"http://schema.org/ReservationConfirmed",reservationId:a,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:e.seatNumber,seatRow:e.seatRow},ticketNumber:e.ticketNumber},reservationFor:{"@type":"http://schema.org/Event",eventStatus:"http://schema.org/EventConfirmed",name:e.eventName,startDate:e.startDate,location:{"@type":"http://schema.org/Place",name:e.eventLocation}}})}),E.length)return E},"SG63d1c87f"),new ReverseTemplate("muenchenticket-confirmation-invoice-de",function(e){return""===e.subject},function(e){if(""!==e.subject||!/\svielen Dank f\xfcr die Bestellung von/.test(e.plain))return CONTINUE;var t="de_DE",n={reservationIdRegExp:/Kartenbestellung (.+) vom/,nameRegExp:/Sehr geehrte (.+),/,priceRegExp:/insgesamt (.+) bei uns/,ticketDetailsPrefix:"Der Inhalt Ihrer Bestellung:",ticketDetailsSuffix:"\n--\n",eventNameRegExp:/, [A-Z][a-z]\. (.+)/,ticketNumberRegExp:/(.+) \| .+ \| .+/,ticketVenueRegExp:/([^,\n]+),.+Reihe: (.+), Sitz: (.+)/},r=Scanner.fromMessage(e);r.setLocale(t);var a,i,s,p,c,o,g,m,u,x,h,v,S,R=[];for(a=r.getSpan().innerCapture(n.reservationIdRegExp,1),i=r.getSpan().innerCapture(n.nameRegExp,1),(s=r.getSpan().innerCapture(n.priceRegExp,1))&&s.exists()&&(p=s.innerCapture(/([\d,.]+)/,1),c=s.innerCapture(/([^\d,.]+)/,1).trim()),S=r.getDetachedSpan(r.getSpan().next(n.ticketDetailsPrefix).withEnd(r.getSpan().next(n.ticketDetailsPrefix).next(n.ticketDetailsSuffix).getStart()).toString()).next(n.ticketNumberRegExp);S.exists();){if(S.exists()&&(o=S.innerCapture(n.ticketNumberRegExp,1).trim()),S=S.nextDate(),h=r.getDetachedSpan(S.toString()+" "+S.nextDate().toString()).innerDate(),(S=S.next(n.eventNameRegExp)).exists()&&(v=S.innerCapture(n.eventNameRegExp,1).trim()),(S=S.next(n.ticketVenueRegExp)).exists()&&(g=S.innerCapture(n.ticketVenueRegExp))&&4===g.length&&(m=g[1].trim(),u=g[2].trim(),x=g[3].trim()),ASSERT(h,o))R.push({startDate:h,eventName:v,ticketNumber:o,eventLocation:m,seatRow:u,seatNumber:x});S.exists()&&(S=S.next(n.ticketNumberRegExp))}var E=[];return R.forEach(function(e){ASSERT(a)&&E.push({"@context":"http://schema.org","@type":"http://schema.org/EventReservation",name:i,totalPrice:p,priceCurrency:c,reservationStatus:"http://schema.org/ReservationConfirmed",reservationId:a,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:e.seatNumber,seatRow:e.seatRow},ticketNumber:e.ticketNumber},reservationFor:{"@type":"http://schema.org/Event",eventStatus:"http://schema.org/EventConfirmed",name:e.eventName,startDate:e.startDate,location:{"@type":"http://schema.org/Place",name:e.eventLocation}}})}),E.length?E:void 0},"SG3dc35fcb")]);