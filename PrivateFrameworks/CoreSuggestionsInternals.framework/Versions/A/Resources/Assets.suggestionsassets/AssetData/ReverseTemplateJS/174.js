new ReverseTemplateList([new ReverseTemplate("hotels.nl-cancellation-nl",function(e){return/Uw boeking \d+ is geannuleerd/.test(e.subject)},function(e){if(/Uw boeking \d+ is geannuleerd/.test(e.subject)){var n="it_IT",t={underPersonNamePrefix:"Uw boeking op naam van",hotelNamePrefix:"in",checkInDatePrefix:"met aankomstdatum",reservationIdPrefix:"en met het boekingsnummer"};return loadHelper("hotels.nl-cancellation-skeleton.js")(e,n,t)}},"SGd40f21d7")]);