new ReverseTemplateList([new ReverseTemplate("tickets.com-en",function(e){return/^Thank You for your order\./.test(e.subject)},function(e){if(!/^Thank You for your order\./.test(e.subject))return CONTINUE;var t,a,n,r,s,o,i,c,l=Scanner.fromMessage(e);l.setLocale("en_US");var u=[];t=l.getSpan().innerCapture(/\bDeliver To:\s+(.*)\s/,1),a=l.getSpan().innerCapture(/\bYour confirmation number is: (.*)\s/,1),details=l.getSpan().nextText("The tickets you have purchased").nextAnyTag("table"),i=getFuzzyDate(details),c=(o=details.firstDate().parentAnyTag("td").tagContents().innerCapture(/^(.*)\s/,1)).nextTag("td1").tagContents();var p=l.getSpan().innerCapture(/\bTotal: [\D]*([\d,.]+)\s/,1),g={};if(l.getSpan().nextText("Section").nextText("Row").nextText("Seat").exists()){details=l.getSpan().nextText("Section").nextText("Row").nextText("Seat").parentAnyTag("table"),s=details.getTagNumber(),details=details.allInnerTags("tr"+s).map(function(e){return e.allInnerTags("td"+s).map(function(e){return e.tagContents().toString()})}).filter(function(e){return e.length>=3});for(var m=1;m<details.length;m++)r=details[m][0],n=details[m][1],seat=details[m][2],g[r]||(g[r]={}),g[r][n]||(g[r][n]=[]),g[r][n].push(seat)}r=Object.keys(g);for(m=0;m<r.length;m++){n=Object.keys(g[r[m]]);for(var h=0;h<n.length;h++)ASSERT(t,p,a,o,c,i)&&u.push({name:t,totalPrice:p,ticketNumber:a,seatSection:r[m],seatRow:n[h],seatNumber:g[r[m]][n[h]].join(", "),eventName:o,place:c,startDate:i})}if(u.length){var d,T=[];for(m=0;m<u.length;m++)T.push({"@context":"http://schema.org","@type":"http://schema.org/EventReservation",name:(d=u[m]).name,totalPrice:d.totalPrice,priceCurrency:d.priceCurrency,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:d.ticketNumber,ticketToken:d.ticketDownloadUrl,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:d.seatNumber,seatRow:d.seatRow,seatSection:d.seatSection}},reservationFor:{"@type":"http://schema.org/Event",eventStatus:"http://schema.org/EventConfirmed",name:d.eventName,url:d.eventUrl,startDate:d.startDate,endDate:d.endDate,location:{"@type":"http://schema.org/Place",name:d.place,telephone:d.phoneNumber,address:d.address}}});return T}},"SG0a8c7c2f")]);