(function(){return function(e){if(e.html){var r=parseMicrodataAndJsonLd(e.html),t=[];if(r.length){for(var s=0;s<r.length;s++)switch(r[s]["@context"]="http://schema.org",r[s]["@type"]){case"LodgingReservation":var a=r[s].checkinDate.split("T")[0],o=r[s].checkoutDate.split("T")[0];ASSERT(r[s].checkinDate,r[s].underName),t.push({"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r[s].underName.name,email:r[s].underName.email},totalPrice:r[s].totalPrice,priceCurrency:r[s].priceCurrency,checkinTime:a,checkoutTime:o,modifyReservationUrl:r[s].modifyReservationUrl,cancelReservationUrl:r[s].cancelReservationUrl,reservationStatus:r[s].reservationStatus,reservationId:r[s].reservationNumber,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:r[s].reservationFor.name,url:r[s].reservationFor.url,telephone:r[s].reservationFor.telephone,address:{"@type":"http://schema.org/PostalAddress",streetAddress:r[s].reservationFor.address.streetAddress,addressCountry:r[s].reservationFor.address.addressCountry,addressLocality:r[s].reservationFor.address.addressLocality,addressRegion:r[s].reservationFor.address.addressRegion,postalCode:r[s].reservationFor.address.postalCode}}})}return t.length>0?t:CONTINUE}}}}).call();