(function(){return function(e,t,r){var n=Scanner.fromMessage(e);n.setLocale(t);var a,i,o,p,s,c,m,d,g,h,u,x,v,E,S,f=n.getSpan(),l="Confirmed";return a=f.innerCapture(regExpFormatted(/\1\n\n(.*?)\n/,r.personUnderNamePrefix),1),i=f.innerCapture(regExpFormatted(/\n(.*?)\n\1/,r.eventTimePrefix),1),p=n.getDetachedSpan(f.innerCapture(regExpFormatted(/\1\s(.*)\n/,r.eventTimePrefix),1).toString().replace(/\D+,\s(\d{2}\/\d{2}\/\d{2})\s(\d{2})\.(\d{2})/,"$1 $2:$3")).innerDate(),c=f.innerCapture(regExpFormatted(/\1\s(.*?)\n/,r.eventLocationPrefix),1).trim(),[,S,E]=f.nextText(r.pricePrefix).nextRegExp(/\s\D\s[\d\,\.]+/).innerCapture(/\s(\D)\s([\d\,\.]+)/),ASSERT(i,p)?[{"@context":"http://schema.org","@type":"http://schema.org/EventReservation",name:a,totalPrice:E,priceCurrency:S,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:g,ticketToken:h,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:u,seatSection:x,seatRow:v}},reservationFor:{"@type":"http://schema.org/Event",eventStatus:"http://schema.org/Event"+l,name:i,url:o,startDate:p,endDate:s,location:{"@type":"http://schema.org/Place",name:c,telephone:d,address:m}}}]:CONTINUE}}).call();