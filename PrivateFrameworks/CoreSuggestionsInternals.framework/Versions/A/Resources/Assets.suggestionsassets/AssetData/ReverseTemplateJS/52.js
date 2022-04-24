new ReverseTemplateList([new ReverseTemplate("united.com-car-confirmation-en",function(e){return/^united\.com Rental Car Confirmation for/.test(e.subject)},function(e){if(/^united\.com Rental Car Confirmation for/.test(e.subject)){var t,n,r,i,a,o,c,s,u,l,d,f,m,g,p,h,v,b,C,y="en_US",j=Scanner.fromMessage(e);if(j.setLocale(y),t=j.getSpan().innerCapture(/Rental Car Confirmation for (.*)/,1).trim(),n=j.getSpan().next("Confirmation Number:").nextAnyTag("td").nextAnyTag("td").tagContents(),i=(r=j.getSpan().next("Pick up:").nextAnyTag("td").nextAnyTag("td").tagContents().innerDate()).nextAnyTag("td").nextAnyTag("td").nextAnyTag("td").tagContents(),o=(a=j.getSpan().next("Return:").nextAnyTag("td").nextAnyTag("td").tagContents()).nextAnyTag("td").nextAnyTag("td").nextAnyTag("td").tagContents(),c=j.getSpan().next("Car Company:").nextAnyTag("td").nextAnyTag("td").tagContents(),s=j.getSpan().next("Car Type:").nextAnyTag("td").nextAnyTag("td").tagContents(),ASSERT(t,n,i,r)){var S={"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:u,priceCurrency:l,reservationId:n,reservationStatus:"http://schema.org/ReservationConfirmed",checkinUrl:d,modifyReservationUrl:f,cancelReservationUrl:m,underName:{"@type":"http://schema.org/Person",name:t},provider:{"@type":"http://schema.org/Organization",name:c},pickupTime:r,pickupLocation:{"@type":"http://schema.org/Place",name:h,telephone:v,address:i}};return not(s)||(S.reservationFor={"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:s},license:g,color:p}),not(a)||not(o)||(S.dropoffTime=a,S.dropoffLocation={"@type":"http://schema.org/Place",name:b,telephone:C,address:o}),[S]}}},"SGb3c1f520"),new ReverseTemplate("micro-united.com-confirmation-webpage",function(e){return loadHelper("ShouldDownloadMessageWithClassifier.js")(e,"flight")},function(e){var t,n={};if(n.depart=/Depart.+/,n.arrive=/Arrive.+/,/Ticket Purchase Confirmation/.test(e.subject))t="en_US",n.tripSummary=/Trip summary/,n.departing=/Departing/;else if(/Confirmation d&#8217;achat de billet/.test(e.subject))t="fr_FR",n.tripSummary=/R\xe9capitulatif du voyage/,n.departing=/D\xe9part/;else if(/Ticketkaufbest\xe4tigung/.test(e.subject)||/united\.com\/ual\/de\/de/.test(e.url))t="de_DE",n.tripSummary=/Reise-Zusammenfassung/,n.departing=/Abflug/;else if(/&#33322;&#31354;&#21048;&#12372;&#36092;&#20837;&#12398;&#30906;&#35469;/.test(e.subject))t="ja_JP",n.tripSummary=/\u65c5\u7a0b\u8868/,n.departing=/\u51fa\u767a\u6642\u9593/;else{if(!/Travel Itinerary sent from/.test(e.subject))return CONTINUE;t="en_US",n.tripSummary=/Flight Details/,n.departing=/Depart/}return loadHelper("united.com-micro-skeleton-confirmation.js")(e,t,n)},"SGa97c74d3"),new ReverseTemplate("united.com-boarding-pass-en",function(e){return/^Boarding pass(es)? for confirmation/.test(e.subject)||/^Link to mobile boarding pass/.test(e.subject)},function(e){if(/^Boarding pass(es)? for confirmation/.test(e.subject)||/^Link to mobile boarding pass/.test(e.subject))return STOP},"SG32408310"),new ReverseTemplate("united.com-cancellation-de",function(e){return/^Benachrichtigung von United.com [\u2013\w\%]+? Stornierung einer Flugbuchung$/.test(e.subject)},function(e){if(/^Benachrichtigung von United.com [\u2013\w\%]+? Stornierung einer Flugbuchung$/.test(e.subject)){var t="de_DE",n={reservationId:/Reserv(?:ierung|ation)\,?\s/};return loadHelper("united.com-flight-cancellation-skeleton.js")(e,t,n)}},"SG4f8983b7"),new ReverseTemplate("united.com-cancellation-en",function(e){return/^united\.com Notification - Flight Booking Cancellation$/.test(e.subject)},function(e){if(/^united\.com Notification - Flight Booking Cancellation$/.test(e.subject)){var t="en_US",n={reservationId:/Reservation\, /,reservationId2:/reservation\, /};return loadHelper("united.com-flight-cancellation-skeleton.js")(e,t,n)}},"SGc1b8706b"),new ReverseTemplate("united.com-cancellation-es",function(e){return/^Notificaci\xf3n de united.com - Cancelaci\xf3n de reservaciones de vuelo$/.test(e.subject)},function(e){if(/^Notificaci\xf3n de united.com - Cancelaci\xf3n de reservaciones de vuelo$/.test(e.subject)){var t="es_ES",n={reservationId:"reserva, ",reservationId2:/reservaci\xf3n\,? /};return loadHelper("united.com-flight-cancellation-skeleton.js")(e,t,n)}},"SGd811955f"),new ReverseTemplate("united.com-cancellation-fr",function(e){return/^Notification united.com - Annulation de r\xe9servation de vol$/.test(e.subject)},function(e){if(/^Notification united.com - Annulation de r\xe9servation de vol$/.test(e.subject)){var t="fr_FR",n={reservationId:/r\xe9servation\,? /};return loadHelper("united.com-flight-cancellation-skeleton.js")(e,t,n)}},"SG55e886d2"),new ReverseTemplate("united.com-cancellation-jp",function(e){return/^\u901a\u77e5\u30b5\u30fc\u30d3\u30b9 - \u30d5\u30e9\u30a4\u30c8\u4e88\u7d04\u306e\u30ad\u30e3\u30f3\u30bb\u30eb\u306b\u3064\u3044\u3066$/.test(e.subject)},function(e){if(/^\u901a\u77e5\u30b5\u30fc\u30d3\u30b9 - \u30d5\u30e9\u30a4\u30c8\u4e88\u7d04\u306e\u30ad\u30e3\u30f3\u30bb\u30eb\u306b\u3064\u3044\u3066$/.test(e.subject)){var t="ja_JP",n={reservationId:"\u305f\u3054\u4e88\u7d04"};return loadHelper("united.com-flight-cancellation-skeleton.js")(e,t,n)}},"SG5b914a50"),new ReverseTemplate("united.com-checkin-and-schedule-change-en",function(e){return/^Check in now for your(.*)flight to/.test(e.subject)||/^United Airlines Schedule Change Notification for reservation/.test(e.subject)},function(e){if(/^Check in now for your(.*)flight to/.test(e.subject)||/^United Airlines Schedule Change Notification for reservation/.test(e.subject)){var t="en_US",n={scheduleChange:"Your itinerary has been affected by a schedule change",scheduleChangeNotification:"Schedule Change Notification for reservation",flightCheckInReminder:"Flight Check-in Reminder for",confirmationNumber:"Confirmation Number:",travelerInformation:"Traveler Information",fareClass:"Fare Class:"};return loadHelper("united.com-checkin-and-schedule-change-skeleton.js")(e,t,n)}},"SG81d3fc4b"),new ReverseTemplate("united.com-hotel-cancellation-en",function(e){return/^Confirm Cancellation Itinerary Number:/.test(e.subject)},function(e){if(/^Confirm Cancellation Itinerary Number:/.test(e.subject)){var t="en_US";return loadHelper("united-hotel-skeleton.js")(e,t)}},"SGdcc200d3"),new ReverseTemplate("united.com-hotel-confirmation-en",function(e){return/^Your Reservation Has Been Confirmed - Itinerary Number/.test(e.subject)},function(e){if(/^Your Reservation Has Been Confirmed - Itinerary Number/.test(e.subject)){var t="en_US";return loadHelper("united-hotel-skeleton.js")(e,t)}},"SG3122347e")]);