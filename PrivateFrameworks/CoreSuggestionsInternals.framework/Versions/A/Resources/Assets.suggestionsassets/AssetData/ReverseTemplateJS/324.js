new ReverseTemplateList([new ReverseTemplate("ticketweb.com-confirmation-en",function(e){return/^Order Confirmation/.test(e.subject)},function(e){if(/^Order Confirmation/.test(e.subject)){var t="en_US",a=loadHelper("ticketweb-schemaorg-parser.js")(e);if(a)return a;var r,n,s=Scanner.fromMessage(e);s.setLocale(t);var c,i,o,p,m,d,g=[];for(r=s.getSpan().innerCapture(/\bName: (.*)\s/,1),n=s.getSpan().innerCapture(/\bOrder Number: (.*?)\s/,1),d=s.getSpan().nextText("Order Summary");d.nextText("Delivery Type:").exists();){c={};var u=(m=(d=d.nextText("Delivery Type:")).previousTag("td3").tagContents()).toString().split("\n");c.eventName=u[0].trim(),c.startDate=getFuzzyDate(s.getDetachedSpan(u[1]).firstDate()),u.length>=3&&(c.endDate=getFuzzyDate(s.getDetachedSpan(u[2]).firstDate())),valid(c.eventName,c.startDate)&&(c.name=r,c.ticketNumber=n,c.address=m.innerAddress(),c.address.exists()&&(i=s.getAddressDD(c.address).text,(o=m.innerCapture(new RegExp("\\b($<place>.*?), ($<address>.*(?:"+regExpEscape(i)+").*)")))&&(c.place=o.$place,p=o.$address.trim(),i.length<p.toString().length&&(c.address=p))),c.numSeats=m.nextText("Delivery Type:").nextTag("td2").tagContents(),c.price=c.numSeats.nextTag("td2").nextTag("td2").tagContents().innerCapture(/([\d,.]+)/,1),ASSERT(c.name,c.eventName,c.startDate,c.ticketNumber,c.address)&&g.push(c))}if(1===g.length&&(g[0].price=s.getSpan().nextText("Total Charges:").nextTag("td2").tagContents().trim().innerCapture(/([\d.,]+)$/,1)),g.length){for(var h,l=[],v=0;h=g[v++];)l.push({"@context":"http://schema.org","@type":"http://schema.org/EventReservation",name:h.name,totalPrice:h.price,priceCurrency:h.priceCurrency,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:h.ticketNumber,ticketToken:h.ticketDownloadUrl,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:h.seat,seatRow:h.seatRow,seatSection:h.seatSection}},reservationFor:{"@type":"http://schema.org/Event",eventStatus:"http://schema.org/EventConfirmed",name:h.eventName,url:h.eventUrl,startDate:h.startDate,endDate:h.endDate,location:{"@type":"http://schema.org/Place",name:h.place,telephone:h.phoneNumber,address:h.address}}});return l}}},"SGbfd6bd19"),new ReverseTemplate("ticketweb.com-ticket-update-en",function(e){return/^An important update regarding/.test(e.subject)},function(e){if(/^An important update regarding/.test(e.subject)){var a=Scanner.fromMessage(e);a.setLocale("en_US");var r,n,s,c=[];if(r={},s=/\b($<eventName>.*)\s+at ($<place>.*)\s+on/,(n=a.getSpan().innerCapture(s))&&(r.eventName=n.$eventName,r.place=n.$place),r.startDate=a.getSpan().firstDate(),r.ticketNumber=a.getSpan().innerCapture(/Confirmation #:\s+(.*)\s+/,1),ASSERT(r.eventName,r.startDate)&&c.push(r),c.length){for(var i=[],o=0;t=c[o++];)i.push({"@context":"http://schema.org","@type":"http://schema.org/EventReservation",name:t.name,totalPrice:t.price,priceCurrency:t.priceCurrency,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:t.ticketNumber,ticketToken:t.ticketDownloadUrl,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:t.seat,seatRow:t.seatRow,seatSection:t.seatSection}},reservationFor:{"@type":"http://schema.org/Event",eventStatus:"http://schema.org/EventConfirmed",name:t.eventName,url:t.eventUrl,startDate:t.startDate,endDate:t.endDate,location:{"@type":"http://schema.org/Place",name:t.place,telephone:t.phoneNumber,address:t.address}}});return i}}},"SG8c76c7dc")]);