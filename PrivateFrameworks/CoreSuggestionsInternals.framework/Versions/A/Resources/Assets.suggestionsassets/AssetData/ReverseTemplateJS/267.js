new ReverseTemplateList([new ReverseTemplate("kayak.com-hotel-cancellation-en",function(e){return/^Your KAYAK booking(?: receipt)? for/.test(e.subject)},function(e){if(/^Your KAYAK booking(?: receipt)? for/.test(e.subject)&&/Room Type/.test(e.plain)&&/has been canceled$/.test(e.subject)){var t="en_US",n={cancellation:/has been canceled$/,reservationId:"Your confirmation number:",reservationDetails:"Reservation Details",checkIn:"Check-in",checkOut:"Check-out",guestDetails:"Guest Details",underName:"Guest",email:"Email",price:"Total Cost"};return loadHelper("kayak.com-hotel-skeleton.js")(e,t,n)}},"SGfd69a2fb"),new ReverseTemplate("kayak.com-hotel-confirmation-en",function(e){return/^Your KAYAK booking receipt for/.test(e.subject)},function(e){if(/^Your KAYAK booking receipt for/.test(e.subject)&&!/has been canceled$/.test(e.subject)&&/You're booked\./.test(e.plain)){var t="en_US",n={cancellation:/has been canceled$/,reservationId:"Your confirmation number:",reservationDetails:"Reservation Details",checkIn:"Check-in",checkOut:"Check-out",guestDetails:"Guest Details",underName:"Guest",email:"Email",price:"Total Cost"};return loadHelper("kayak.com-hotel-skeleton.js")(e,t,n)}},"SG12325422")]);