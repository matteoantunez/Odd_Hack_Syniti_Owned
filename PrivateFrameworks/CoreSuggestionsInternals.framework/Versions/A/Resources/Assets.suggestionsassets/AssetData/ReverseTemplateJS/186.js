new ReverseTemplateList([new ReverseTemplate("neckermann.com-confirmation",function(e){return/^Bevestigingsmail/.test(e.subject)},function(e){if(/^Bevestigingsmail/.test(e.subject)){var t="nl_NL",n={};return n.confirmation=/Reserveringsnummer\s(.*)\n/,n.guestDetails=/Contactgegevens:/,n.guestName=/contactpersoon/,n.guestEmail=/E-mail/,n.bookingDetails=/Je hebt geboekt:/,n.hotelName=/Accommodatie/,n.hotelPhone=/Customer Contact Center\s(.*?)\s\(/,n.checkin=/Aankomst en vertrek/,n.dates=/($<checkin>.*)\s-\s($<checkout>.*)/,n.totalPrice=/Totaal*/,loadHelper("neckermann.com-confirmation-skeleton.js")(e,t,n)}},"SG8d6c155c")]);