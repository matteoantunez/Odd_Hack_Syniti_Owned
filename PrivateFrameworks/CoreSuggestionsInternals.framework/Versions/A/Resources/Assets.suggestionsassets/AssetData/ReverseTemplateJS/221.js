new ReverseTemplateList([new ReverseTemplate("cheapoair.com-cancellation-en",function(e){return/^REFUND CONFIRMATION$/.test(e.subject)||/^Your booking \d+ on CheapOair\.c(?:om|a)\s+has been cancelled/.test(e.subject)||/Booking # \d+ has been cancelled/.test(e.subject)||/Cancelled Hotel Reservation/.test(e.subject)},function(e){if(/^REFUND CONFIRMATION$/.test(e.subject)||/^Your booking \d+ on CheapOair\.c(?:om|a)\s+has been cancelled/.test(e.subject)||/^Booking # \d+ has been cancelled/.test(e.subject)||/Cancelled Hotel Reservation/.test(e.subject)){var t="en_US",r={reservationId:/[Bb]ooking(?: [Nn]umber)?\s?\n?/,reservationId2:/[bB]ooking\s?#\s?/};return loadHelper("cheapoair.com-cancellation-skeleton.js")(e,t,r)}},"SG8166f82b"),new ReverseTemplate("cheapoair.com-cancellation-es",function(e){return/ha sido cancelada\.$/.test(e.subject)},function(e){if(/ha sido cancelada\.$/.test(e.subject)){var t="es_ES",r={reservationId:/reserva de\s?#\s?/};return loadHelper("cheapoair.com-cancellation-skeleton.js")(e,t,r)}},"SG01ddb95a"),new ReverseTemplate("cheapoair.com-itinerary-en",function(e){return/^AIR TICKET NUMBER  & AIRLINE CONFIRMATION/.test(e.subject)||/^CheapOair.com - .+ - Booking receipt/.test(e.subject)||/VACATION PACKAGE CONFIRMATION/.test(e.subject)},function(e){if(/^AIR TICKET NUMBER  & AIRLINE CONFIRMATION/.test(e.subject)||/^CheapOair.com - .+ - Booking receipt/.test(e.subject)||/VACATION PACKAGE CONFIRMATION/.test(e.subject)){var t="en_US";if(/schema\.org/.test(e.html))return CONTINUE;if(/Booking Receipt/.test(e.plain)){var r={customerInformationHeader:"Customer Information",passengerNamePrefix:"Traveler",passengerEmailPrefix:"Email",passengerPhonePrefix:"Phone",tripSummaryHeader:"Trip Summary",flightSummaryHeader:"Flight Summary",ticketNumberSuffix:"E-Ticket",flightDetails:"Flight Booking Details",flightNumberPrefix:"Flight",operatedByPrefix:"Operated by",fromPrefix:"From",toPrefix:"To",reservationIdPrefix:"Airline confirmation",pricePrefix:"Total Cost"};return loadHelper("cheapoair.com-flight-confirmation-skeleton.js")(e,t,r)}if(/Booking Confirmation/.test(e.plain)){r={reservationId:"CheapOair Booking: ",flightHeader:"Flight Details",departingFlight:"Departing Flight",returnFlight:"Return Flight",flight:"Flight",travelerHeader:"Traveler Information",carHeader:"Car Details",carPickUp:"Car Pick-Up",carDropOff:"Car Drop-Off",carConfirmation:"Car Confirmation:",mileage:"Mileage",hotelHeader:"Hotel Details",checkIn:"Hotel Check-In",checkOut:"Hotel Check-Out",checkinTime:"Check-in time starts",checkoutTime:"Check-out time starts",guestName:"Guest Name"};return loadHelper("cheapoair.com-flight-confirmation2-skeleton.js")(e,t,r)}return CONTINUE}},"SGe0505f9c"),new ReverseTemplate("cheapoair.com-itinerary-es",function(e){return/^AIRE NUMERO DE TICKET Y CONFIRMACI\xd3N DE AEROL\xcdNEA/.test(e.subject)||/^CheapOair.mx - .+ Booking receipt/.test(e.subject)},function(e){if(/^AIRE NUMERO DE TICKET Y CONFIRMACI\xd3N DE AEROL\xcdNEA/.test(e.subject)||/^CheapOair.mx - .+ Booking receipt/.test(e.subject)){var t="es_ES";if(/schema\.org/.test(e.html))return CONTINUE;var r={customerInformationHeader:"Customer Information",passengerNamePrefix:"Traveler",passengerEmailPrefix:"Email",passengerPhonePrefix:"Phone",tripSummaryHeader:"Trip Summary",flightSummaryHeader:"Flight Summary",ticketNumberSuffix:"E-Ticket",flightDetails:"Flight Booking Details",flightNumberPrefix:"Flight",operatedByPrefix:"Operated by",fromPrefix:"From",toPrefix:"To",reservationIdPrefix:"Airline confirmation",pricePrefix:"Total Cost"};return loadHelper("cheapoair.com-flight-confirmation-skeleton.js")(e,t,r)}},"SGc4741f2b")]);