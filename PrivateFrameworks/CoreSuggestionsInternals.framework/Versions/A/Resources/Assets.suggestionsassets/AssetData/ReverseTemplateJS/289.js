new ReverseTemplateList([new ReverseTemplate("opodo.com-hotel-cancellation-it",function(e){return/^La tua prenotazione/.test(e.subject)},function(e){if(/^La tua prenotazione/.test(e.subject)&&/La tua prenotazione \xe8 stata cancellata/.test(e.plain)){var o="it_IT",i={information:"Riepilogo prenotazione",namePrefix:"Gentile",cancellationMessage:/La tua prenotazione \xe8 stata cancellata./,hotelNamePrefix:"Nome della struttura",guestEmailAddressPrefix:"Indirizzo e-mail",hotelAddressPrefix:"Indirizzo",hotelTelephonePrefix:"Telefono",checkInTimePrefix:"Arrivo",checkOutTimePrefix:"Partenza",bookingNumberPrefix:"Numero di prenotazione"};return loadHelper("opodo.com-hotel-cancel-change-skeleton.js")(e,o,i)}},"SG50d82729"),new ReverseTemplate("opodo.com-hotel-change-it",function(e){return/^La tua prenotazione/.test(e.subject)},function(e){if(/^La tua prenotazione/.test(e.subject)&&/Modifica della prenotazione/.test(e.plain)){var o="it_IT",i={modificationMessage:/Ecco la prenotazione con le tue modifiche./i,information:"Riepilogo prenotazione",namePrefix:"Gentile",hotelNamePrefix:"Nome della struttura",guestEmailAddressPrefix:"Indirizzo e-mail",hotelAddressPrefix:"Indirizzo",hotelTelephonePrefix:"Telefono",checkInTimePrefix:"Arrivo",checkOutTimePrefix:"Partenza",bookingNumberPrefix:"Numero di prenotazione",reservationUrlPrefix:"Vuoi visualizzare, cancellare o modificare la tua prenotazione?",cancellationUrlPrefix:"Cancella la prenotazione",guestNamePrefix:"Nome del cliente"};return loadHelper("opodo.com-hotel-cancel-change-skeleton.js")(e,o,i)}},"SG37fffb5e"),new ReverseTemplate("opodo.com-hotel-confirmation-it",function(e){return/^La tua prenotazione/.test(e.subject)},function(e){if(/^La tua prenotazione/.test(e.subject)||/conferma della tua prenotazione/.test(e.plain)){if(/(Bus|Event|Flight|FoodEstablishment|Lodging|RentalCar|Train)Reservation/.test(e.html))return CONTINUE;var o="it_IT",i={confirmationMessage:"conferma della tua prenotazione",namePrefix:"Gentile",hotelNamePrefix:"Nome della struttura",bookingNumberPrefix:"Numero di prenotazione",guestEmailAddressPrefix:"Indirizzo e-mail",checkInTimePrefix:"Arrivo",checkOutTimePrefix:"Partenza",pricePrefix:"Gesamtpreis",hotelAddressPrefix:"Indirizzo",hotelTelephonePrefix:"Telefono",reservationUrlPrefix:"Vuoi visualizzare, cancellare o modificare la tua prenotazione?",guestNamePrefix:"Nome del cliente",cancellationUrlPrefix:"Cancella la prenotazione"};return loadHelper("opodo.com-hotel-confirmation-skeleton.js")(e,o,i)}},"SG0a7b02e7")]);