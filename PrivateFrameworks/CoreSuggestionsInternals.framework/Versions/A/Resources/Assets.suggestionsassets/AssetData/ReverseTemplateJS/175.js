new ReverseTemplateList([new ReverseTemplate("neatsupport.com",function(e){return/Hotel Confirmation/.test(e.subject)||/Hotel Cancellation/.test(e.subject)},function(e){var t="en_AU",n={emailTitelConfirmation:/Hotel Confirmation/,reservationId:/Reservation\:/,guestName:/Travellername\(s\)\:/,checkInDate:/Check-in\:/,checkOutDate:/Check-out\:/,price:/Total Price\:/,hotelName:/Hotel Name\:/,hotelInfo:/Cancellation policy/,hotelPhone:/Tel\:/,emailTitelCancelConfirmation:/Hotel Cancellation/,cancelReservationId:/Confirmation Number\: (.+)/,cancelPrice:/Original booking total\: (.+)/,cancelGuestEmail:/Email \: (.+)/,cancelGuestName:/Email \: .+\n.*\n(.+)/,cancelCheckInDate:/Check-in Date\: (.+)/,cancelCheckOutDate:/Check-out Date\: (.+)/,cancelHotelName:/Booking Date\:.+\n.*\n(.+)/,cancelHotelAddress:/Booking Date.+([\S\s]*)Room Type/};return loadHelper("neatsupport.com.js")(e,t,n)},"SG43f28911")]);