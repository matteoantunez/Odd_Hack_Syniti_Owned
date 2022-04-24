(function(){function e(e,t,n){var r=Scanner.fromMessage(e);if(r.setLocale(t),!r.getSpan().next(n.hotelSummary).exists())return null;var a=r.getSpan().next(n.hotelSummary).nextAnyTag("table").nextAnyTag("table").nextAnyTag("table"),i=a.nextAnyTag("td").tagContents(),o=a.next(/\d{3,}/).parentAnyTag("td").tagContents(),s=a.next(n.hotelTimes).innerCapture(n.hotelTimes),u=s[1],m=s[2],g=r.getSpan().next(n.hotelPersonName).innerCapture(n.hotelPersonName,1).trim(),p=r.getSpan().next(n.hotelConfNumber).innerCapture(n.hotelConfNumber,1),h=a.next(n.hotelPhone).innerCapture(n.hotelPhone,1).trim();return ASSERT(i,u,m)?[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:g},checkinTime:u,checkoutTime:m,reservationStatus:"http://schema.org/ReservationConfirmed",reservationId:p,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:i,telephone:h,address:o}}]:null}function t(e,t,n){var r,a,i,o,s,u=Scanner.fromMessage(e);if(u.setLocale(t),!u.getSpan().next(n.carSummary).exists())return null;var m=u.getSpan().next(n.carSummary);return a=m.next(n.carRules).nextAnyTag("td").innerCapture(/:\s([\w ]+)/,1).trim(),i=u.getSpan().next(n.namePrefix).nextAnyTag("td").tagContents(),o=m.next(/Pick up:\s+(.*)/i).nextDate(),s=m.next(/Drop off:\s+(.*)/i).nextDate(),r=m.next(/Car confirmation number:\s+(\w+)/i).innerCapture(/Car confirmation number:\s+(\w+)/i,1),ASSERT(i,a,o)?[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",reservationId:r,reservationStatus:"http://schema.org/ReservationConfirmed",underName:{"@type":"http://schema.org/Person",name:i},provider:{"@type":"http://schema.org/Organization",name:a},pickupTime:o,dropoffTime:s}]:null}function n(e,t,n){var a=Scanner.fromMessage(e);if(a.setLocale(t),!a.getSpan().next(n.flightSummary).exists())return null;var i=a.getSpan().next(n.flightID).innerCapture(n.flightID,1);i.toString()||(i=a.getSpan().next(n.hotwireItinNum).innerCapture(n.hotwireItinNum,1));var o=a.getSpan().next(n.ticketNumber).innerCapture(n.ticketNumber,1),s=a.getSpan().next(n.travelerPrefix).nextAnyTag("td").tagContents(),u=a.getSpan().next(n.flightSummary).nextAnyTag("table").nextAnyTag("table"),m=(u.getString().match(n.depart),u.allInnerTagsFiltered("td8"));if(!["td8","td7","td5"].some(function(e){return!!u.allInnerTagsFiltered(e).some(function(e){return n.depart.test(e.getString())})&&(m=u.allInnerTagsFiltered(e),!0)}))return null;var g=m[0],p=[],h=[],c=0;m=m.map(function(e){return e.getString().split("\n")}).reduce(function(e,t){return e.concat(t)});for(var l=0;l<m.length;l++)if(/Total distance/i.test(m[l]))c++;else if(/Econonmy|Seat assignments|Coach/i.test(m[l])){for(var d=[];c<=l;c++)d.push(m[c]);h.push(d)}for(l=0;l<h.length;l++){var f=new r(h[l]),x=f.getItem(/(\w+ \d{1,2}-\w{2,3}-\d{2})/);x instanceof Array&&x.length>1&&(g=x[1].replace(/-/g," "));var v=f.getItem(/(\w+)\s+\((\w+)\)/),S=f.getItem(/(\d{1,2}:\d{1,2} [ap]m)/i),y=f.getItem(/(\w+)\s+\((\w+)\)/),T=f.getItem(/(\d{1,2}:\d{1,2} [ap]m)/i),C=f.getItem(n.flightNo),A=f.getPrev(/(\w+) (\w+)/);p.push({"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",departureAirportFuzzy:v[1],departureAirportCode:v[2],airlineCode:A[1],airlineName:A[2],flightNumber:C[1],departureTime:combineDateAndTime(a.getDetachedSpan(g),a.getDetachedSpan(S[1])),arrivalAirportFuzzy:y[1],arrivalAirportCode:y[2],arrivalTime:combineDateAndTime(a.getDetachedSpan(g),a.getDetachedSpan(T[1]))},underName:{"@type":"http://schema.org/Person",name:s},reservationId:i,reservationStatus:"http://schema.org/ReservationConfirmed",reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:o,ticketedSeat:{"@type":"http://schema.org/Seat"}}}),ASSERT(p[l].reservationFor.departureAirportCode,p[l].reservationFor.flightNumber,p[l].reservationId,p[l].reservationFor.departureTime)||p.pop()}return p.length?p:null}var r=function(){var e=function(e){this.info=e,this.index=0};return e.prototype={getItem:function(e){if(!(e instanceof RegExp))throw"Must be regexp";for(var t=this.index;t<this.info.length;t++)if(e.test(this.info[t]))return this.index=t,this.info[t].match(e);return null},getPrev:function(e){for(var t=this.index;t--;)if(e.test(this.info[t]))return this.info[t].match(e);return null}},e}();return function(r,a,i){var o=[];try{o=o.concat(n(r,a,i))}catch(s){}try{o=o.concat(t(r,a,i))}catch(s){}try{o=o.concat(e(r,a,i))}catch(s){}return o.filter(function(e){return!(null===e||e===undefined)})}}).call();