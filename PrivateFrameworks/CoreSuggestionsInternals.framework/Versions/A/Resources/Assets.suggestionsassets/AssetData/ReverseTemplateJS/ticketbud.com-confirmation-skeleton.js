(function(){return function(t,e,n){if(!t||!e||!n)return CONTINUE;var a,r,g,p,o,c,i,s,d,x,h,S,m,u,T,l,E,C=Scanner.fromMessage(t);return C.setLocale(e),a=C.getSpan().nextTag("td2").tagContents().innerCapture(regExpFormatted(/\1:(.*)/,n.purchaser),1).trim(),r=(g=C.getSpan().nextText(n.total).nextTag("td2").nextTag("td2").tagContents()).innerCapture(regExpFormatted(/([\d\.,]+)/),1),l=g.innerCapture(regExpFormatted(/(.)[\d\.,]+/),1),d=C.getSpan().innerCapture(regExpFormatted(/\1:(.*)\s+\2/,n.order,n.purchaser),1).trim(),o=C.getDetachedSpan((E=t.subject).substr(E.indexOf("]")+1,E.length)).trim(),h=C.getSpan().nextText(n.confirmation).nextLink(),p=C.getSpan().nextText(n.start+":"),p=getFuzzyDate(C.getDetachedSpan(C.getSpan().withInterval(p.getEnd(),p.nextText("\n").getStart()).toString().replace(","," "))),u=C.getSpan().nextText(n.end+":"),u=getFuzzyDate(C.getDetachedSpan(C.getSpan().withInterval(u.getEnd(),u.nextText("\n").getStart()).toString().replace(","," "))),x=C.getSpan().nextTag("tr3").nextTag("tr3").innerTag("td3").nextTag("td3").tagContents(),ASSERT(p,o)?[{"@context":"http://schema.org","@type":"http://schema.org/EventReservation",name:a,totalPrice:r,priceCurrency:l,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:c,seatRow:T,seatSection:i},ticketToken:s,ticketNumber:d},reservationFor:{"@type":"http://schema.org/Event",eventStatus:"http://schema.org/EventConfirmed",name:o,url:h,startDate:p,endDate:u,location:{"@type":"http://schema.org/Place",name:S,telephone:m,address:x}}}]:CONTINUE}}).call();