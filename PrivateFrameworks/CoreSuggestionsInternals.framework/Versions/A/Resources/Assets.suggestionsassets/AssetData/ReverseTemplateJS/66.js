new ReverseTemplateList([new ReverseTemplate("airberlin.com-itinerary",function(e){return/\s[A-Z]{3}/.test(e.subject)},function(e){if(/AIRBERLIN/.test(e.plain)){var t="en_US",n={name:/(.*?)\s+TICKET\:(.+)/,reservationId:"BOOKING REF"};return loadHelper("airberlin.com-itinerary-skeleton.js")(e,t,n)}},"SG6d9b1320"),new ReverseTemplate("cathaypacific.com-itinerary-fr",function(e){return/\s[A-Z]{3}/.test(e.subject)},function(e){if(/WWW\.CATHAYPACIFIC\.COM\/FR/.test(e.plain)||/CATHAY PACIFIC AIRWAYS LTD/.test(e.plain)){var t="fr_FR",n={name:/(.*)\s+TICKET\:/,reservationId:"BOOKING REF",price:"INVOICE TOTAL"};return loadHelper("cathaypacific.com-itinerary-alt-skeleton.js")(e,t,n)}},"SG2b93427a"),new ReverseTemplate("klm.com-eticket-de",function(e){return/^KLM e-Ticket/.test(e.subject)},function(e){if(/^KLM e-Ticket/.test(e.subject)&&/Buchungscode:/.test(e.plain)){var t="de_DE",n={confirmationCode:"Buchungscode:",confirmationCodeRegex:/Buchungscode: (\w+)/,passengerInfo:"Informationen f\xfcr Flugg\xe4ste",checkinUrl:"Internet-Check-in",itinerary:"Flugdaten",totalPrice:"Gesamtsumme:"};return loadHelper("klm-eticket-skeleton.js")(e,t,n)}},"SG485c4672"),new ReverseTemplate("klm.com-eticket-en",function(e){return/^KLM e-Ticket/.test(e.subject)},function(e){if(/^KLM e-Ticket/.test(e.subject)&&/Booking code:/.test(e.plain)){var t="en_US",n={confirmationCode:"Booking code:",confirmationCodeRegex:/Booking code: (\w+)/,passengerInfo:"Passenger Information",checkinUrl:"Internet check-in",itinerary:"Itinerary Information",totalPrice:"Total amount:"};return loadHelper("klm-eticket-skeleton.js")(e,t,n)}},"SGef42d36a"),new ReverseTemplate("klm.com-eticket-es",function(e){return/^KLM e-Ticket/.test(e.subject)},function(e){if(/^KLM e-Ticket/.test(e.subject)){var t="es_ES",n={confirmationCode:"C\xf3digo de reserva:",confirmationCodeRegex:/C\xf3digo de reserva: (\w+)/,passengerInfo:"Informacion del pasajero",checkinUrl:"Facturaci\xf3n por Internet",itinerary:"Informacion de itinerario",totalPrice:"Importo totale:"};return loadHelper("klm-eticket-skeleton.js")(e,t,n)}},"SGfd917421"),new ReverseTemplate("klm.com-eticket-fr",function(e){return/^KLM e-Ticket/.test(e.subject)},function(e){if(/^KLM e-Ticket/.test(e.subject)&&/Code de r\xe9servation:/.test(e.plain)){var t="fr_FR",n={confirmationCode:"Code de r\xe9servation:",confirmationCodeRegex:/Code de r\xe9servation: (\w+)/,passengerInfo:"Information passager",checkinUrl:"Enregistrement par Internet",itinerary:"Informations sur l'itin\xe9raire",totalPrice:"Montant total:"};return loadHelper("klm-eticket-skeleton.js")(e,t,n)}},"SG24c96427"),new ReverseTemplate("klm.com-eticket-it",function(e){return/^KLM e-Ticket/.test(e.subject)},function(e){if(/^KLM e-Ticket/.test(e.subject)){var t="it_IT",n={confirmationCode:"Prenotazione code:",confirmationCodeRegex:/Prenotazione code: (\w+)/,passengerInfo:"Informazioni del passeggero",checkinUrl:"Check in via Internet",itinerary:"Informazioni sul percorso",totalPrice:"Importo totale:"};return loadHelper("klm-eticket-skeleton.js")(e,t,n)}},"SG1ed4ffb2"),new ReverseTemplate("klm.com-eticket-nl",function(e){return/^KLM e-Ticket/.test(e.subject)},function(e){if(/^KLM e-Ticket/.test(e.subject)){var t="nl_NL",n={confirmationCode:"Boekingscode:",confirmationCodeRegex:/Boekingscode: (\w+)/,passengerInfo:"PassagierInformatie",checkinUrl:"Internet check-in",itinerary:"Reisinformatie",totalPrice:"Totaalbedrag:"};return loadHelper("klm-eticket-skeleton.js")(e,t,n)}},"SG0dbf0f62"),new ReverseTemplate("qantas.com-itinerary-amadeus-en",function(){return!0},function(e){if(/QANTAS( E-TICKET)? ITINERARY/.test(e.plain)){var t="en_AU",n={reservationId:"BOOKING REF:",name:"CUSTOMER NAME:",depart:"DEPART",arrival:"ARRIVE",duration:"DURATION",ticketNumber:"E-TICKET NO:",kilo:"KILO",price:"GRAND TOTAL:"};return loadHelper("qantas.com-itinerary-amadeus.js")(e,t,n)}},"SG0cb7db12")]);