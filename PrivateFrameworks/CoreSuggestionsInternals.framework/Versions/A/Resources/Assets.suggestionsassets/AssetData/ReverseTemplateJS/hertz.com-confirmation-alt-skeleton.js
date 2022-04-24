(function(){return function(e,r,t){var a=loadHelper("hertz.com-microdata-parser.js")(e);if(a)return a;var n,p,o,i,s,c,d,g,m,u,S,h,f,l,C,y,v,x,$,E,F,k,A=Scanner.fromMessage(e);if(A.setLocale(r),n=A.getSpan().innerCapture(/(.*)/,1),p=A.getSpan().innerCapture(regExpFormatted(/\1\s+(.*)/,t.reservationId),1),d=(c=A.getSpan().innerCapture(regExpFormatted(/\1\s+($<totalPrice>[\d,.]+)\s+($<priceCurrency>[^\n\d,.]+)/,t.price))).$totalPrice,g=c.$priceCurrency,$=A.getSpan().innerCapture(regExpFormatted(/\1\s+($<date>.*)\s+\2\s+($<time>.*)/,t.pickupTime,t.timeSeparator)),$=A.getDetachedSpan($.$date.toString().replace(/\,/g,"")+" "+$.$time.toString()).innerDate(),C=A.getSpan().innerCapture(regExpFormatted(/\1\s+($<date>.*)\s+\2\s+($<time>.*)/,t.dropoffTime,t.timeSeparator)),C=A.getDetachedSpan(C.$date.toString().replace(/\,/g,"")+" "+C.$time.toString()).innerDate(),(v=A.getSpan().innerCapture(regExpFormatted(/\1([\S\s]*)\2/,t.pickupAndDropoffAddress,t.officeType),1)).inner(t.pickupAddress).exists()?(F=v.innerCapture(regExpFormatted(/([\S\s]*)\1/,t.pickupAddress),1),f=v.innerCapture(regExpFormatted(/\1\s+(.*)/,t.dropoffAddress),1),v=v.innerCapture(regExpFormatted(/\1\s+(.*)/,t.pickupAddress),1),k=A.getSpan().innerCapture(regExpFormatted(/\1([\S\s]*)\2/,f,t.officeType),1),f=F.toString()+" "+f.toString()+" "+k.toString(),v=F.toString()+" "+v.toString()+" "+k.toString()):f=v,x=l=A.getSpan().innerCapture(regExpFormatted(/\1\s+(.*)/,t.phoneNumber),1),ASSERT(n,p,v,$)){var T={"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:d,priceCurrency:g,reservationId:p,reservationStatus:"http://schema.org/Reservation"+(E||"Confirmed"),checkinUrl:o,modifyReservationUrl:i,cancelReservationUrl:s,underName:{"@type":"http://schema.org/Person",name:n},provider:{"@type":"http://schema.org/Organization",name:"Hertz"},pickupTime:$,pickupLocation:{"@type":"http://schema.org/Place",name:y,telephone:x,address:v.trim()}};return not(m)||(T.reservationFor={"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:m},license:u,color:S}),not(C)||not(f)||(T.dropoffTime=C,T.dropoffLocation={"@type":"http://schema.org/Place",name:h,telephone:l,address:f.trim()}),[T]}}}).call();