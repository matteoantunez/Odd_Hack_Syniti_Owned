(function(){return function(e){var t=loadHelper("generic_common.js")(e,"movie");if(!t||t===STOP)return STOP;var a,s,r,i,o,l,n,d,p,c,m,v,g=t[0],u=t[1],_=t[2],j=loadHelper("bail.js");if(a=loadHelper("name.js")(e.subject,u,_,e).trim(),!(r=loadHelper("starttime.js")(u,_,e,a)).exists()&&j(u,_,"noDateBail"))return STOP;if(s=loadHelper("reservationid.js")(u,_,e.subject,e.url),v=loadHelper("reservation_id_domain_whitelist.js"),"Cancelled"===g?v.includes(e.domain)?ASSERT({sg_validate:a,sg_description:"eventName"}):ASSERT({sg_validate:s,sg_description:"reservationId"},{sg_validate:a,sg_description:"eventName"}):v.includes(e.domain)?ASSERT({sg_validate:r,sg_description:"startTime"},{sg_validate:a,sg_description:"eventName"}):ASSERT({sg_validate:r,sg_description:"startTime"},{sg_validate:a,sg_description:"eventName"},{sg_validate:s,sg_description:"reservationId"})){l=loadHelper("undername.js")(e.to,u,_),i=loadHelper("place.js")(u,_,a,e.subject,null,"movie"),o=loadHelper("address.js")(u,_,e,a,l,i),i=!i.exists()&&o.exists()?loadHelper("place_from_address.js")(u,_,o):i,c=loadHelper("phone.js")(u,_,s,o),p=loadHelper("ticketnumber.js")(u,_),loadHelper("price.js")(u,_).exists()?loadHelper("pricecurrency.js")(u,_):null;var h=!1;return h=loadHelper("shouldtableextractseatinfo.js")(u,_),d=loadHelper("seatsection.js")(u,_,h),n=loadHelper("seatrow.js")(u,_,h),[{"@context":"http://schema.org","@type":"http://schema.org/EventReservation",reservationId:s,reservationStatus:"http://schema.org/Reservation"+g,url:m,underName:{"@type":"http://schema.org/Person",name:l},reservationFor:{"@type":"http://schema.org/ScreeningEvent",name:a,startDate:r,location:{"@type":"http://schema.org/Place",name:i,telephone:c,address:o}},reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:p,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:loadHelper("seat.js")(u,_,n,h),seatRow:n,seatSection:d}}}]}}}).call();