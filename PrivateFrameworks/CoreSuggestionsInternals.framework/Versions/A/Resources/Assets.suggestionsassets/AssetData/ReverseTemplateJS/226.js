new ReverseTemplateList([new ReverseTemplate("cheaptickets.com-hotel-itinerary-en",function(e){return/^Hotel Confirmation \|/.test(e.subject)},function(e){if(/(Bus|Event|Flight|FoodEstablishment|Lodging|RentalCar|Train)Reservation/.test(e.html))return CONTINUE;if(/Hotel Confirmation/.test(e.plain)){var t={reservedFor:"Hotel reservations under:",reservationId:"CheapTickets record locator",hotelDetails:"Hotel\n\n",hotelNameSuffix:"hotel details",telephone:"Phone:",checkin:"Check-in:",checkout:"Check-out:",checkinTime:"Hotel check-in/check-out:",priceSummary:"Trip cost",totalPrice:"Total due at booking",priceCurrency:"All prices quoted in"},r="en_US";return loadHelper("cheaptickets.com-hotel-itinerary-skeleton.js")(e,r,t)}},"SG559a2e53"),new ReverseTemplate("cheaptickets.com-itinerary-en",function(e){return/^Flight Cancellation/.test(e.subject)||/^Flight Booking Request/.test(e.subject)||/^Flight Confirmation/.test(e.subject)||/^Your Flight Reservation Changed/.test(e.subject)},function(e){var t="en_US",r={};return/(Bus|Event|Flight|FoodEstablishment|Lodging|RentalCar|Train)Reservation/.test(e.html)?CONTINUE:/^Flight Cancellation/.test(e.subject)||/^Flight Confirmation/.test(e.subject)||/^Your Flight Reservation Changed/.test(e.subject)?loadHelper("cheaptickets.com-flight-itinerary.js")(e):/^Flight Booking Request/.test(e.subject)?(r.reservationIdPrefix="Record locator:",r.itineraryPrefix="Your Flight",r.departurePrefix="Depart",r.arrivalPrefix="Arrive",r.seatNumberPrefix="Seats:",r.traverlerPrefix="Traveler information",r.traverlerName="Traveler 1",r.Seatpreference="Seat preference:",r.tripTotal="Trip cost",r.pricePrefix="Airline Ticket",loadHelper("cheaptickets.com-flight-booking.js")(e,t,r)):void 0},"SG60052903"),new ReverseTemplate("cheaptickets.com-plan-your-trip-en",function(e){return/^Prepare for your trip/.test(e.subject)},function(e){var t="en_US",r={};if(/^Prepare for your trip/.test(e.subject))return r.reservationIdPrefix="CheapTickets record locator:",r.itineraryPrefix="Flight itinerary",r.departurePrefix="Depart",r.arrivalPrefix="Arrive",r.seatNumberPrefix="Seats:",r.traverlerPrefix="Traveler information",r.passenger="Traveler",r.ticket="Airline Ticket Number:",r.Seatpreference="Seat preference:",r.pricePrefix="Total due at booking",loadHelper("cheaptickets.com-plantrip-skeleton.js")(e,t,r)},"SG85a05b64")]);