new ReverseTemplateList([new ReverseTemplate("cs.bestwestern.com-en",function(e){return/^Best Western - (?:Canceled )?Reservation (?:Notification|Confirmation)$/.test(e.subject)},function(e){if(int(e.epoch)<1388534400)return CONTINUE;if(/^Best Western - (?:Canceled )?Reservation (?:Notification|Confirmation)$/.test(e.subject)){var t,n,r,a,s,o,i,c,u,l,m,p,d=Scanner.fromMessage(e);d.setLocale("en_US"),/^Best Western - Canceled/.test(e.subject)&&(p="Cancelled"),s=d.getSpan().innerCapture(/(?:Confirmation|Cancellation) [Nn]umber:\s+(\d+)/,1),r=(n=d.getSpan().nextText("Total Stay:").nextAnyTag("td").innerCapture(/($<price>[\d,.]+)\s+($<currency>[A-Z]{3})/))?n.$price:null,a=n?n.$currency:null,t=d.getSpan().innerCapture(/Reservation Summary - (.+)\n/,1),o=d.getSpan().nextText("Check-in:").nextDate(),i=d.getSpan().nextText("Check-out:").nextDate();var v=d.getSpan().nextText("BEST WESTERN").parentAnyTag("td").tagContents().innerCapture(/($<name>BEST WESTERN .+)\n($<address>[^]+)\nPhone: ($<phone>.*)/);if(v&&(u=v.$name,m=v.$address,l=v.$phone),ASSERT(o,i,m))return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:t},totalPrice:r,priceCurrency:a,checkinTime:o,checkoutTime:i,reservationStatus:"http://schema.org/Reservation"+(p||"Confirmed"),reservationId:s,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:u,url:c,telephone:l,address:m}}]}},"SG2ce80fc9"),new ReverseTemplate("cs.bestwestern.com-fr",function(e){return/Best Western \- Confirmation de la r\xe9servation/.test(e.subject)||/Best Western \- Avis d'annulation de la r\xe9servation/.test(e.subject)},function(e){var t="en_US",n={emailTitelConfirmation:/Best Western \- Confirmation de la r\xe9servation/,reservationId:/(?:Num\xe9ro de confirmation de la r\xe9servation\:|Num\xe9ro d'annulation \:) (.+)/,guestName:/Synth\xe8se de la r\xe9servation \- (.+)/,checkInDate:"Arriv\xe9e :",checkOutDate:"D\xe9part :",price:"Total s\xe9jour :",emailTitelCancelConfirmation:/Best Western \- Avis d'annulation de la r\xe9servation/};return loadHelper("cs.bestwestern.com-skeleton.js")(e,t,n)},"SGcb4f16bc")]);