(function(){return function(e,t,n){var a,r,c,i,s,o,u,p,m,l,h,v,g,S=Scanner.fromMessage(e);S.setLocale(t),a=S.getSpan().next(n.custumerDetails).next(n.guestName).innerCapture(n.guestName,1);var x=S.getSpan().next(n.ticketDetails);if(i=x.next(n.eventStart).nextDate(),p=x.next(n.ticketNumber).innerCapture(n.ticketNumber,1),s=x.next(n.eventName).innerCapture(n.eventName,1),h=m=S.getSpan().next(n.eventVenue).innerCapture(n.eventVenue,1),r=(c=S.getSpan().next(n.reservationDetails).next(n.totalPrice).innerCapture(n.totalPrice)).$price,g=c.$currency,ASSERT(i,s))return[{"@context":"http://schema.org","@type":"http://schema.org/EventReservation",name:a,totalPrice:r,priceCurrency:g,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:o,seatRow:v,seatSection:u},ticketToken:null,ticketNumber:p},reservationFor:{"@type":"http://schema.org/Event",eventStatus:"http://schema.org/EventConfirmed",name:s,url:l,startDate:i,endDate:null,location:{"@type":"http://schema.org/Place",name:h,telephone:null,address:m}}}]}}).call();