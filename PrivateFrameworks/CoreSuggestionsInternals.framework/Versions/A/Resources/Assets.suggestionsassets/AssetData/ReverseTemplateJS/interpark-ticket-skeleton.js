(function(){return function(e,t,n){var a=Scanner.fromMessage(e);a.setLocale(t);var r,s,o,i,c,l,g,p,h,m,d,u=a.getSpan(),T=n.isConfirmation?"Confirmed":"Cancelled",f=[];r=u.nextText(n.personUnderNameSuffix).parentTag("td3").tagContents().innerCapture(regExpFormatted(/(.*?)\1/,n.personUnderNameSuffix),1);var v=u.nextText(n.eventDetailsBlockPrefix).nextTag("table2").allInnerTags("tr2");if(s=v[1].allInnerTags("td2")[2].tagContents().innerCapture(/(.*)\s<.*?>/,1),c=v[2].allInnerTags("td2")[2].tagContents().innerCapture(/(.*)\s<.*?>/,1),o=v[3].allInnerTags("td2")[2].innerDate(),u.nextText(n.ticketNumberHeader).parentTag("table2").allInnerTags("tr2").slice(1).forEach(function(e){var t=e.allInnerTags("td2");if(5===t.length){var n=t[0].tagContents().innerCapture(/(\D\d+)/,1);ASSERT(s,o)&&f.push({"@context":"http://schema.org","@type":"http://schema.org/EventReservation",name:r,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:n,ticketToken:p,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:h,seatSection:m,seatRow:d}},reservationFor:{"@type":"http://schema.org/Event",eventStatus:"http://schema.org/Event"+T,name:s,startDate:o,endDate:i,location:{"@type":"http://schema.org/Place",name:c,telephone:g,address:l}}})}}),f.length>0)return f}}).call();