new ReverseTemplateList([new ReverseTemplate("europcar.nl",function(e){return/^Betalingsbevestiging Europcar/.test(e.subject)||/^Bevestiging reservering Europcar/.test(e.subject)||/^Bevestiging aanvraag Europcar/.test(e.subject)},function(e){if(!/^Betalingsbevestiging Europcar/.test(e.subject)&&!/^Bevestiging reservering Europcar/.test(e.subject)&&!/^Bevestiging aanvraag Europcar/.test(e.subject))return CONTINUE;var r="nl_NL",t={reservationId:"Reserveringsnummer",inquiryId:"Aanvraagnummer",car:"Auto",pickup:/Ophalen|Ophaaldatum/,pickupAddress:"Locatie details",dropoff:/Inleveren|Retourdatum/,price:"Totaal huursom",guestName:"Naam",guestEmail:"E-mailadres",address:/Vestiging/i};return loadHelper("europcar-reservation-skeleton.js")(e,r,t)},"SGd64432a5")]);