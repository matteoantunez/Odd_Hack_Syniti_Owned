new ReverseTemplateList([new ReverseTemplate("tingo.com-confirmation-en",function(e){return/Reservation Confirmation\s+.+\s+Itinerary/.test(e.subject)},function(e){if(/Reservation Confirmation\s+.+\s+Itinerary/.test(e.subject)){var t="en_US",n={reservationId:/Hotel Confirmation \#\:\s+(.+)\s+?</,guestName:/Guest1\s+(.+)/,checkIn:"Check-in:",totalPrice:"Total:"};return loadHelper("tingo.com-confirmation-skeleton.js")(e,t,n)}},"SG9b42a561")]);