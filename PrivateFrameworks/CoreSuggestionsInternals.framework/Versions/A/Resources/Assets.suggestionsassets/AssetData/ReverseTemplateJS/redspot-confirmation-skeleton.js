(function(){return function(e,t,n){var a=Scanner.fromMessage(e);a.setLocale(t);var r,i,p,o,s,g,d,x,c,l,f,y,h,m,A,T,u=a.getSpan(),v=a.getDetachedSpan(e.subject),S="Confirmed";if(A=u.innerCapture(regExpFormatted(/\1 (.*) \n/,n.underPersonName_prefix),1),r=v.innerCapture(regExpFormatted(/\1 (.*)/,n.reservationId_prefix),1),i=u.next(n.pickupDetails_prefix).nextAnyTag("td").nextAnyTag("td").innerDate(),g=u.next(n.dropoffDetails_prefix).nextAnyTag("td").nextAnyTag("td").innerDate(),p=u.next(n.pickupDetails_prefix).nextAnyTag("td").nextAnyTag("td").tagContents().toString().split("\n")[0],d=u.next(n.dropoffDetails_prefix).nextAnyTag("td").nextAnyTag("td").tagContents().toString().split("\n")[0],(s=u.next(n.pickupDetails_prefix).nextAnyTag("td").nextAnyTag("td").innerAddress())===a.getNullSpan()){var C=u.next(n.pickupDetails_prefix).nextAnyTag("td").nextAnyTag("td").tagContents().toString().split("\n");C.length>=3&&(s="",s+=", "+C[0],s+=", "+C[1],s+=", "+C[2])}if((c=u.next(n.dropoffDetails_prefix).nextAnyTag("td").nextAnyTag("td").innerAddress())===a.getNullSpan()){var D=u.next(n.pickupDetails_prefix).nextAnyTag("td").nextAnyTag("td").tagContents().toString().split("\n");D.length>=3&&(c="",c+=", "+D[0],c+=", "+D[1],c+=", "+D[2])}if(T=u.next(n.carBrand_prefix).nextAnyTag("td").nextAnyTag("td").nextAnyTag("td").tagContents(),ASSERT(i,OR(s,p)))return[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",reservationId:r,totalPrice:l,priceCurrency:f,reservationStatus:"http://schema.org/"+S,checkinUrl:y,modifyReservationUrl:h,cancelReservationUrl:m,underName:{"@type":"http://schema.org/Person",name:A},provider:{"@type":"http://schema.org/Organization",name:"Redspot"},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:T},license:"",color:""},pickupTime:i,pickupLocation:{"@type":"http://schema.org/Place",name:p,telephone:o,address:s},dropoffTime:g,dropoffLocation:{"@type":"http://schema.org/Place",name:d,telephone:x,address:c}}]}}).call();