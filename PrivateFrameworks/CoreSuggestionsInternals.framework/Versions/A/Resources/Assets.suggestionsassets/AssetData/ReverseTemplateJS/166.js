new ReverseTemplateList([new ReverseTemplate("fairmont.com-txt",function(e){return/Fairmont Hotels and Resorts Reservation/.test(e.subject)},function(e){var n="en_CA",t={emailTitelConfirmation:/Fairmont Hotels and Resorts Reservation/,reservationId:/Your confirmation number is\:\s+\n(.+)/,checkInDate:/Arriving on/,checkOutDate:/Departing on/,guestName:/Dear (.+)/,price:/Total\: (.+)/,modifyUrl:/Make an activity booking or change your reservation/,hotelInfo:/Cancel By/,hotelAddress:/TEL/};return loadHelper("fairmont.com-txt.js")(e,n,t)},"SG50970a1a"),new ReverseTemplate("fairmont.com",function(e){return/Reservation Confirmation Mail/.test(e.subject)||/Reservation Cancellation/.test(e.subject)},function(e){var n="en_CA",t={emailTitelConfirmation:/Reservation Confirmation Mail/,reservationId:/Your reservation number is:/,checkInDate:/Arriving on/,checkOutDate:/Departing on/,guestName:/Dear (.+)/,price:/Total\: (.+)/,modifyUrl:/Make an activity booking or change your reservation/,hotelInfo:/Cancel By/,hotelAddress:/Tel/,emailTitelCancelConfirmation:/Reservation Cancellation/,cancelReservationId:/Your reservation\s+\n\n(.+)\n/};return loadHelper("fairmont.com.js")(e,n,t)},"SG61db4432")]);