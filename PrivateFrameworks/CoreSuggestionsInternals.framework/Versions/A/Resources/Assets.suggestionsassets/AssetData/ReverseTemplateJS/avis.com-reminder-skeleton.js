(function(){return function(e,t,n){var r,a,o,i,s,p,m,c,d,g,l,h,x,u,v,f,S,y,P,$,C,R,k=Scanner.fromMessage(e);if(k.setLocale(t),o=k.getSpan().innerCapture(regExpFormatted(/\b\1 (\w+)\s/,n.reservationIdPrefix),1),not(o)&&(o=k.getSpan().nextText(n.reservationIdPrefix).nextAnyTag("td").tagContents()),C=(R=k.getSpan().nextText(n.pickUpInformation).nextDate()).nextPhoneNumber(),P=(y=k.getSpan().withInterval(R.getEnd(),C.getStart()).trim().innerCapture(/^($<name>.*)\s(.*?\s)?($<address>.*(?:\s\(\d{5} \))?)$/))?y.$name:null,$=y?y.$address:null,f=(S=R.nextRegExp(n.returnDateRegExp).nextDate()).nextPhoneNumber(),u=(x=k.getSpan().withInterval(S.getEnd(),f.getStart()).trim().innerCapture(/^($<name>.*)\s(.*?\s)?($<address>.*(?:\s\(\d{5} \))?)$/))?x.$name:null,v=x?x.$address:null,r=k.getSpan().innerCapture(regExpFormatted(/\1 (.*?)\s+/,n.namePrefix),1),m=(p=k.getSpan().nextText(n.reservationIdPrefix).nextLink().nextLink()).nextLink(),ASSERT(o,r,$,R)){var E={"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:c,priceCurrency:d,reservationId:o,reservationStatus:"http://schema.org/Reservation"+(i||"Confirmed"),checkinUrl:s,modifyReservationUrl:p,cancelReservationUrl:m,underName:{"@type":"http://schema.org/Person",name:r,email:a},provider:{"@type":"http://schema.org/Organization",name:"Avis"},pickupTime:R,pickupLocation:{"@type":"http://schema.org/Place",name:P,telephone:C,address:$},dropoffTime:S,dropoffLocation:{"@type":"http://schema.org/Place",name:u,telephone:f,address:v}};return g&&(E.reservationFor={"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:g},license:l,color:h}),[E]}}}).call();