(function(){return function(e,t,n){var r,a,p,o,i,s,c,g,d,m,h,x,l,u,f,S,C,R,v,y,E=Scanner.fromMessage(e);E.setLocale(t),p=E.getSpan().innerCapture(n.reservationId,1),r=E.getSpan().innerCapture(n.guestName,1),y=E.getSpan().nextRegExp(n.pickUpDate).nextDate(),S=E.getSpan().nextRegExp(n.dropOffDate).nextDate(),m=E.getSpan().nextRegExp(n.brand).tagContents().innerCapture(n.brand,1).trim();var k=E.getSpan().next(n.price).nextAnyTag("td").tagContents();if(g=k.innerCapture(/([\d,.]+)/,1),d=k.innerCapture(/([^\d,.]+)/,1).trim().toString().replace("\xc2",""),R=E.getSpan().innerCapture(n.pickUpAddress,1).trim(),u=E.getSpan().innerCapture(n.dropOffAddress,1).trim(),v=E.getSpan().nextRegExp(n.pickUpAddress).nextRegExp(n.phone).nextPhoneNumber(),f=E.getSpan().nextRegExp(n.dropOffAddress).nextRegExp(n.phone).nextPhoneNumber(),c=s=E.getSpan().nextRegExp(n.modifyUrl).nextLink(),n.cancellationHeader.test(e.subject)&&(o="Cancelled"),ASSERT(p,r,R,y)){var A={"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:g,priceCurrency:d,reservationId:p,reservationStatus:"http://schema.org/Reservation"+(o||"Confirmed"),checkinUrl:i,modifyReservationUrl:s,cancelReservationUrl:c,underName:{"@type":"http://schema.org/Person",name:r,email:a},provider:{"@type":"http://schema.org/Organization",name:"Avis"},pickupTime:y,pickupLocation:{"@type":"http://schema.org/Place",name:C,telephone:v,address:R},dropoffTime:S,dropoffLocation:{"@type":"http://schema.org/Place",name:l,telephone:f,address:u}};return m&&(A.reservationFor={"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:m},license:h,color:x}),[A]}}}).call();