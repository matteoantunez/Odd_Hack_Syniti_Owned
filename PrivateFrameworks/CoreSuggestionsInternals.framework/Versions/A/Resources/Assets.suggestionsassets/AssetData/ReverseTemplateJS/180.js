new ReverseTemplateList([new ReverseTemplate("laterooms.com",function(e){return/Booking Confirmation|Booking Modification/.test(e.subject)||/Booking Cancellation/.test(e.subject)},function(e){var o="en_GB",n={emailTitelConfirmation:/Booking Confirmation|Booking Modification/,reservationId:/Reservation[s]? Reference\:? ([\w\d]+)/,checkInDate:/Arrival Date\:/,checkInTime:/Check In From\:/,checkOutDate:/No. Nights\:/,checkOutTime:/Check Out By:/,guestName:/Booked By\:|Guest Names\:/,guestEmail:/Booker Email\:/,price:/Total \(.+\)\:|Total Amended Booking Price|Cancellation Charge:/,hotelName:/Hotel Name\:/,hotelInfo:/Hotel Details\:/,hotelPhone:/Tel\:/,cancelUrl:/Cancel my booking online now/,emailTitelCancelConfirmation:/Booking Cancellation/};return loadHelper("laterooms.com.js")(e,o,n)},"SGe7f27619")]);