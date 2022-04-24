new ReverseTemplateList([new ReverseTemplate("ihg.com-cancellation-de",function(e){return/Stornierung Ihrer Reservierung (?:#\s?)?\d+ bei .+/.test(e.subject)},function(e){if(!/Stornierung Ihrer Reservierung (?:#\s?)?\d+ bei .+/.test(e.subject))return CONTINUE;var r="de_DE",i={isCancellation:!0,reservationIdPrefix:"Ihre Reservierung",modifyReservationUrlPrefix:"RESERVIERUNG \xc4NDERN",underPersonNamePrefix:"Name des Gastes:",hotelNamePrefix:"Kundenservice",hotelPhonePrefix:"Telefonnummer der Hotelrezeption::",dateTimesPrefix:"Check-in:",pricePrefix:"Voraussichtlicher Gesamtpreis:"};return loadHelper("ihg.com-confirmation-skeleton.js")(e,r,i)},"SGd1fe43e3"),new ReverseTemplate("ihg.com-cancellation-fr",function(e){return/Votre annulation de r\xe9servation (?:#\s)?\d+ chez .+/.test(e.subject)},function(e){if(!/Votre annulation de r\xe9servation (?:#\s)?\d+ chez .+/.test(e.subject))return CONTINUE;var r="fr_FR",i={isCancellation:!0,reservationIdPrefix:"Votre r\xe9servation",modifyReservationUrlPrefix:"MODIFIER LA R\xc9SERVATION",underPersonNamePrefix:"Nom du client :",hotelNamePrefix:"Service client\xe8le",hotelPhonePrefix:"R\xe9ception de l'h\xf4tel :",dateTimesPrefix:"Arriv\xe9e :",pricePrefix:"Total (estimation) :"};return loadHelper("ihg.com-confirmation-skeleton.js")(e,r,i)},"SG85c2f8e4"),new ReverseTemplate("ihg.com-cancellation-it",function(e){return/Cancellazione della tua prenotazione (?:#\s)?\d+ presso .+/.test(e.subject)},function(e){if(!/Cancellazione della tua prenotazione (?:#\s)?\d+ presso .+/.test(e.subject))return CONTINUE;var r="it_IT",i={isCancellation:!0,reservationIdPrefix:"La tua prenotazione",modifyReservationUrlPrefix:"MODIFICA PRENOTAZIONE",underPersonNamePrefix:"Nome ospite:",hotelNamePrefix:"Servizio clienti",hotelPhonePrefix:"Front Desk dell'hotel:",dateTimesPrefix:"Check In:",pricePrefix:"Prezzo totale stimato:"};return loadHelper("ihg.com-confirmation-skeleton.js")(e,r,i)},"SGfc29a720"),new ReverseTemplate("ihg.com-cancellation-nl",function(e){return/Uw reserveringsannulering \d+ bij/.test(e.subject)},function(e){if(!/Uw reserveringsannulering \d+ bij/.test(e.subject))return CONTINUE;var r="nl_NL",i={isCancellation:!0,reservationIdPrefix:"Annuleringsnummer",underPersonNamePrefix:"Naam gast:",hotelNamePrefix:"Klantendienst",hotelPhonePrefix:"Hotelreceptie:",dateTimesPrefix:"Inchecken",pricePrefix:"Geschatte totale kosten:"};return loadHelper("ihg.com-confirmation-skeleton.js")(e,r,i)},"SG6a5e502a"),new ReverseTemplate("ihg.com-confirmation-de",function(e){return/Best\xe4tigung Ihrer Reservierung (?:#\s?)?\d+ bei .+/.test(e.subject)},function(e){if(!/Best\xe4tigung Ihrer Reservierung (?:#\s?)?\d+ bei .+/.test(e.subject))return CONTINUE;var r="de_DE",i={reservationIdPrefix:"Ihre Best\xe4tigungsnummer ist:",modifyReservationUrlPrefix:"RESERVIERUNG \xc4NDERN",underPersonNamePrefix:"Name des Gastes:",hotelNamePrefix:"Kundenservice",hotelPhonePrefix:"Telefonnummer der Hotelrezeption::",dateTimesPrefix:"Check-in:",pricePrefix:"Voraussichtlicher Gesamtpreis:"};return loadHelper("ihg.com-confirmation-skeleton.js")(e,r,i)},"SGf640a320"),new ReverseTemplate("ihg.com-confirmation-es",function(e){return/Su confirmaci\xf3n de reserva (?:#\s)?\d+ para .+/.test(e.subject)},function(e){if(!/Su confirmaci\xf3n de reserva (?:#\s)?\d+ para .+/.test(e.subject))return CONTINUE;var r="es_ES",i={reservationIdPrefix:"Su n\xfamero de confirmaci\xf3n es",modifyReservationUrlPrefix:"MODIFICAR RESERVA",underPersonNamePrefix:"Nombre del cliente:",hotelNamePrefix:"Servicio al cliente",hotelPhonePrefix:"Recepci\xf3n del hotel:",dateTimesPrefix:"Entrada:",pricePrefix:"Precio total estimado:"};return loadHelper("ihg.com-confirmation-skeleton.js")(e,r,i)},"SG38566b87"),new ReverseTemplate("ihg.com-confirmation-fr",function(e){return/Votre confirmation de r\xe9servation (?:#\s)?\d+ chez .+/.test(e.subject)},function(e){if(!/Votre confirmation de r\xe9servation (?:#\s)?\d+ chez .+/.test(e.subject))return CONTINUE;var r="fr_FR",i={reservationIdPrefix:"Votre num\xe9ro de confirmation est le",modifyReservationUrlPrefix:"MODIFIER LA R\xc9SERVATION",underPersonNamePrefix:"Nom du client :",hotelNamePrefix:"Service client\xe8le",hotelNamePrefix2:/R\xe9ception de l'h\xf4tel/,hotelPhonePrefix:"R\xe9ception de l'h\xf4tel :",dateTimesPrefix:"Arriv\xe9e :",pricePrefix:"Total (estimation) :"};return loadHelper("ihg.com-confirmation-skeleton.js")(e,r,i)},"SG9193659b"),new ReverseTemplate("ihg.com-confirmation-it",function(e){return/Conferma della tua prenotazione (?:#\s)?\d+ presso .+/.test(e.subject)},function(e){if(!/Conferma della tua prenotazione (?:#\s)?\d+ presso .+/.test(e.subject))return CONTINUE;var r="it_IT",i={reservationIdPrefix:"Il tuo numero di conferma \xe8:",modifyReservationUrlPrefix:"MODIFICA PRENOTAZIONE",underPersonNamePrefix:"Nome ospite:",hotelNamePrefix:"Servizio clienti",hotelPhonePrefix:"Front Desk dell'hotel:",dateTimesPrefix:"Check In:",pricePrefix:"Prezzo totale stimato:"};return loadHelper("ihg.com-confirmation-skeleton.js")(e,r,i)},"SG072309ca"),new ReverseTemplate("ihg.com-confirmation-nl",function(e){return/Uw reserveringsbevestiging \d+ bij/.test(e.subject)},function(e){if(!/Uw reserveringsbevestiging \d+ bij/.test(e.subject))return CONTINUE;var r="nl_NL",i={reservationIdPrefix:"Annuleringsnummer",underPersonNamePrefix:"Naam gast:",hotelNamePrefix:"Klantendienst",hotelPhonePrefix:"Hotelreceptie:",dateTimesPrefix:"Inchecken",pricePrefix:"Geschatte totale kosten:"};let t={maart:"mar",mrt:"mar",mei:"may",augustus:"aug",juni:"jun",juli:"july"};for(let r in t){let i=new RegExp(r,"ig");e.plain=e.plain.replace(i,t[r])}return loadHelper("ihg.com-confirmation-skeleton.js")(e,r,i)},"SG17d3aa41"),new ReverseTemplate("ihg.com-modification-de",function(e){return/Best\xe4tigung Ihrer aktualisierten Reservierung (?:#\s)?\d+ bei .+/.test(e.subject)},function(e){if(!/Best\xe4tigung Ihrer aktualisierten Reservierung (?:#\s)?\d+ bei .+/.test(e.subject))return CONTINUE;var r="de_DE",i={reservationIdPrefix:"Neue Best\xe4tigungsnummer:",modifyReservationUrlPrefix:"RESERVIERUNG \xc4NDERN",underPersonNamePrefix:"Name des Gastes:",hotelNamePrefix:"Kundenservice",hotelPhonePrefix:"Telefonnummer der Hotelrezeption::",dateTimesPrefix:"Check-in:",pricePrefix:"Voraussichtlicher Gesamtpreis:"};return loadHelper("ihg.com-confirmation-skeleton.js")(e,r,i)},"SG9d874231"),new ReverseTemplate("ihg.com-modification-fr",function(e){return/Votre confirmation de r\xe9servation (?:#\s)?\d+ mise \xe0 jour chez .+/.test(e.subject)},function(e){if(!/Votre confirmation de r\xe9servation (?:#\s)?\d+ mise \xe0 jour chez .+/.test(e.subject))return CONTINUE;var r="fr_FR",i={reservationIdPrefix:"Nouveau num\xe9ro de confirmation",modifyReservationUrlPrefix:"MODIFIER LA R\xc9SERVATION",underPersonNamePrefix:"Nom du client :",hotelNamePrefix:"Service client\xe8le",hotelPhonePrefix:"R\xe9ception de l'h\xf4tel :",dateTimesPrefix:"Arriv\xe9e :",pricePrefix:"Total (estimation) :"};return loadHelper("ihg.com-confirmation-skeleton.js")(e,r,i)},"SGc2b7b3cc"),new ReverseTemplate("ihg.com-modification-it",function(e){return/Conferma della tua prenotazione aggiornata (?:#\s)?\d+ presso .+/.test(e.subject)},function(e){if(!/Conferma della tua prenotazione aggiornata (?:#\s)?\d+ presso .+/.test(e.subject))return CONTINUE;var r="it_IT",i={reservationIdPrefix:"Nuovo numero di conferma",modifyReservationUrlPrefix:"MODIFICA PRENOTAZIONE",underPersonNamePrefix:"Nome ospite:",hotelNamePrefix:"Servizio clienti",hotelPhonePrefix:"Front Desk dell'hotel:",dateTimesPrefix:"Check In:",pricePrefix:"Prezzo totale stimato:"};return loadHelper("ihg.com-confirmation-skeleton.js")(e,r,i)},"SGfad36f73")]);