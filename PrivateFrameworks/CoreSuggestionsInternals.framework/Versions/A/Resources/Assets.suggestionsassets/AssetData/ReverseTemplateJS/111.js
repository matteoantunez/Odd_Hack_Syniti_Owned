new ReverseTemplateList([new ReverseTemplate("hainanairlines-confirmation-2-zh",function(e){return/\u6b22\u8fce\u4f7f\u7528\u6d77\u822a\u7535\u5b50\u5ba2\u7968/.test(e.subject)},function(e){if(!/\u5c0a\u656c\u7684\u7528\u6237\uff1a\u60a8\u5728\u6d77\u822a\u7f51\u7ad9\u8ba2\u8d2d\u7684/.test(e.plain))return CONTINUE;var t=Scanner.fromMessage(e);t.setLocale("zh_Hans_CN");var r,a,n,i,o,p,s,h,l,m,d=[],g=t.getSpan().innerCapture(/\u6d77\u822a\u7f51\u7ad9\u8ba2\u8d2d\u7684(.+)\u7684\u673a\u7968\u8ba2\u5355\u4ea4\u6613\u7f16\u53f7\u4e3a(.+)\uff0c\u6211\u4eec\u5c06/);g&&3===g.length&&([,r,n]=g,a=r.split("\u3001"));for(var u=0;u<a.length;u++){var c=a[u].innerCapture(/(\d+\u6708\d+\u65e5)(\w{2})(\d+)(.+) - (.+)(\d{2}:\d{2})\u8d77\u98de(\d{2}:\d{2})\u5230\u8fbe/);[,i,o,p,s,h,l,m]=c;var v=combineDateAndTime(i,l),T=combineDateAndTime(i,m);if(Date.parse(v)>Date.parse(T)&&(T=modifyDate(T,1)),ASSERT(g,c))d.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineCode:o,flightNumber:p,departureAirportFuzzy:s,departureTime:v,arrivalAirportFuzzy:h,arrivalTime:T},underName:{"@type":"http://schema.org/Person"},reservationId:n,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat"}},reservationStatus:"http://schema.org/ReservationConfirmed"})}return d.length?d:void 0},"SGd44449ff"),new ReverseTemplate("hainanairlines-confirmation-3-zh",function(e){return/\u6d77\u822a\u7535\u5b50\u5ba2\u7968\u9884\u8ba2\u6210\u529f|\u6d77\u822a\u7535\u5b50\u5ba2\u7968\u6539\u5347\u6210\u529f/.test(e.subject)},function(e){if(!/\u6d77\u822a\u7535\u5b50\u5ba2\u7968\u9884\u8ba2\u6210\u529f|\u6d77\u822a\u7535\u5b50\u5ba2\u7968\u6539\u5347\u6210\u529f/.test(e.subject))return CONTINUE;var t=Scanner.fromMessage(e);t.setLocale("zh_Hans_CN");for(var r=[],a=t.getSpan().innerCapture(/\u8ba2\u5ea7\u7f16\u7801:\s?([A-Z\d]+)/,1),n=[],i=t.getSpan().nextText("\u884c\u7a0b\u4fe1\u606f").nextTag("table4").allInnerTags("tr4"),o=1;o<i.length;o++){var p=(A=i[o]).allInnerTags("td4");if(!(p.length<3)){var s=p[0].tagContents().innerCapture(/(.+?)--?(.+)/),h=s[1].trim(),l=s[2].trim(),m=p[1].tagContents().innerCapture(/([A-Z\d]{2})(\d{3,4})/),d=m[1],g=m[2],u=g.nextDate(),c=u.nextDate(),v=c.nextDate(),T=combineDateAndTime(u,c),f=combineDateAndTime(u,v);Date.parse(T)>Date.parse(f)&&(f=modifyDate(f,1)),ASSERT(h,l,T,f)&&n.push({departureAirport:h,arrivalAirport:l,departureTime:T,arrivalTime:f,airlineCode:d,flightNumber:g})}}for(var y=[],C=t.getSpan().nextText("\u4e58\u5ba2\u4fe1\u606f").nextTag("table4").allInnerTags("tr4"),S=1;S<C.length;S++){var z=C[S].allInnerTags("td4")[0].tagContents();y.push(z)}for(o=0;o<n.length;o++){var A=n[o];for(S=0;S<y.length;S++){r.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineCode:A.airlineCode,flightNumber:A.flightNumber,departureAirportFuzzy:A.departureAirport,departureTime:A.departureTime,arrivalAirportFuzzy:A.arrivalAirport,arrivalTime:A.arrivalTime},underName:{"@type":"http://schema.org/Person",name:y[S]},reservationId:a,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat"}},reservationStatus:"http://schema.org/ReservationConfirmed"})}}return r.length?r:void 0},"SGb2f25f8d")]);