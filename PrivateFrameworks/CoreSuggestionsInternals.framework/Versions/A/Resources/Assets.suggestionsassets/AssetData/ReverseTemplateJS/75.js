new ReverseTemplateList([new ReverseTemplate("airfrance.com-modification-de",function(e){return/^Confirmation de votre modification$/.test(e.subject)},function(e){if(/^Confirmation de votre modification$/.test(e.subject)&&/Ihr Flug/.test(e.plain)){var r="de_DE",t={reference:"Buchungscode:",passenger:"Passagiere",payment:"Tarifberechnung",flightNumber:"Flug nummer","class":"Booking Class",operated:"Durchgef\xfchrt von"};return loadHelper("airfrance-modification-skeleton.js")(e,r,t)}return CONTINUE},"SGbb21b024"),new ReverseTemplate("airfrance.com-modification-en",function(e){return/^Confirmation de votre modification$/.test(e.subject)},function(e){if(/^Confirmation de votre modification$/.test(e.subject)&&/Your Flight/.test(e.plain)){var r="en_US",t={reference:"Your reservation reference number",passenger:"Passenger",payment:"Payment",flightNumber:"Flight number","class":"Class",operated:"Operated by"};return loadHelper("airfrance-modification-skeleton.js")(e,r,t)}return CONTINUE},"SGabf9f999"),new ReverseTemplate("airfrance.com-reservation-change-de",function(e){return/^\xc4nderung/.test(e.subject)},function(e){if(/^\xc4nderung/.test(e.subject)){var r="de_DE",t={travelTableTitle:"Ihre Reise",flightTableTitle:"Ihr Flug",paymentTableTitle:"Tarifberechnung",preferencesTableTitle:"Ihre Reisepr\xe4ferenzen",passengerTableTitle:"Passagiere",ticketPriceLabel:"Zur\xfcckerstatteter Betrag",reservationIdLabel:"Buchungscode :",ticketNumberLabel:"Ticketnummer",membershipLabel:"TBD :"};return loadHelper("airfrance.com-reservationConfirm-skeleton.js")(e,r,t)}},"SG7251327a"),new ReverseTemplate("airfrance.com-reservation-change-en",function(e){return/Change request confirmation/.test(e.subject)},function(e){if(/Change request confirmation/.test(e.subject)){var r="en_US",t={travelTableTitle:"Your travel",flightTableTitle:"Your flight",paymentTableTitle:"Payment",preferencesTableTitle:"Preferences",ticketPriceLabel:"Total amount",reservationIdLabel:"Your reservation reference number:",passengerTableTitle:"Passenger",ticketNumberLabel:"ticket number",membershipLabel:"Loyalty card number :"};return loadHelper("airfrance.com-reservationConfirm-skeleton.js")(e,r,t)}},"SG1e6fbec7"),new ReverseTemplate("airfrance.com-reservationConfirm-cn",function(e){return/^\u60a8\u7684\u6cd5\u822a\u9884\u8ba2\u786e\u8ba4/.test(e.subject)},function(e){if(/^\u60a8\u7684\u6cd5\u822a\u9884\u8ba2\u786e\u8ba4/.test(e.subject)){var r="zh_Hans_CN",t={travelTableTitle:"\u60a8\u7684\u65c5\u7a0b",flightTableTitle:"\u60a8\u7684\u822a\u73ed",paymentTableTitle:"\u7968\u4ef7",preferencesTableTitle:"\u4e2a\u4eba\u504f\u597d",passengerTableTitle:"\u4e58\u5ba2",ticketPriceLabel:"\u7f51\u4e0a\u7f34\u4ed8\u7684\u603b\u989d",reservationIdLabel:"\u60a8\u7684\u9884\u8ba2\u53c2\u8003\u7f16\u53f7 :",ticketNumberLabel:"\u673a\u7968\u53f7\u7801",membershipLabel:"TBD :"};return loadHelper("airfrance.com-reservationConfirm-skeleton.js")(e,r,t)}},"SG2cff0e65"),new ReverseTemplate("airfrance.com-reservationConfirm-en",function(e){return/^Confirmation of your( Air France)?( Online)? [bB]ooking$/.test(e.subject)||/Confirmation de votre r\xe9servation$/.test(e.subject)},function(e){if(/^Confirmation of your( Air France)?( Online)? [bB]ooking$/.test(e.subject)||/Confirmation de votre r\xe9servation$/.test(e.subject)){var r="en_US",t={travelTableTitle:"Your Trip",travelAlt:"Your travel",flightTableTitle:"Your flight",flightAlt:"Your flight :",paymentTableTitle:"Payment",preferencesTableTitle:"Preferences",ticketPriceLabel:"Total amount paid online :",reservationIdLabel:"Your reservation reference number:",passengerTableTitle:"Passenger",ticketNumberLabel:"ticket number :",membershipLabel:"Loyalty card number :"};return loadHelper("airfrance.com-reservationConfirm-skeleton.js")(e,r,t)}},"SGa23995db"),new ReverseTemplate("airfrance.com-reservationConfirm-es",function(e){return/^Confirmaci\xf3n de su reserva/.test(e.subject)},function(e){if(/^Confirmaci\xf3n de su reserva/.test(e.subject)&&!/pendiente/.test(e.subject)){var r="es_ES",t={travelTableTitle:"Su viaje",flightTableTitle:"Su vuelo",paymentTableTitle:"Tarificaci\xf3n",preferencesTableTitle:"Preferencias",ticketPriceLabel:"Importe total pagado online :",reservationIdLabel:"Referencia de su expediente de reserva :",passengerTableTitle:"Pasajero",ticketNumberLabel:"N\xfamero(s) de billete(s)",membershipLabel:"N\xfamero de tarjeta de fidelidad :",extraPassengerSpacing:!0};return loadHelper("airfrance.com-reservationConfirm-skeleton.js")(e,r,t)}},"SG24031744"),new ReverseTemplate("airfrance.com-reservationConfirm-it",function(e){return/^Conferma della sua prenotazione con/.test(e.subject)},function(e){if(/^Conferma della sua prenotazione con/.test(e.subject)){var r="it_IT",t={travelTableTitle:"Il suo viaggio",flightTableTitle:"Il suo volo",paymentTableTitle:"Prezzo pagato",preferencesTableTitle:"Preferenze",passengerTableTitle:"Passeggeri",ticketPriceLabel:"Importo totale pagato online",reservationIdLabel:"Codice del dossier di prenotazione:",ticketNumberLabel:"N\xb0 di biglietto",membershipLabel:"Il tuo numero di carta fedelt\xe0:"};return loadHelper("airfrance.com-reservationConfirm-skeleton.js")(e,r,t)}},"SG8ec4ede8"),new ReverseTemplate("airfrance.com-reservationConfirm-jp",function(e){return/\u3054\u4e88\u7d04\u306e\u8a73\u7d30/.test(e.subject)||/\u306e\u5909\u66f4\u306e\u8a73\u7d30/.test(e.subject)},function(e){if(/\u3054\u4e88\u7d04\u306e\u8a73\u7d30/.test(e.subject)||/\u306e\u5909\u66f4\u306e\u8a73\u7d30/.test(e.subject)){var r="ja_JP",t={travelTableTitle:"\u304a\u5ba2\u69d8\u306e\u3054\u65c5\u7a0b",flightTableTitle:"\u304a\u5ba2\u69d8\u306e\u4fbf",paymentTableTitle:"\u6599\u91d1",preferencesTableTitle:"\u3054\u5e0c\u671b",ticketPriceLabel:"\u30aa\u30f3\u30e9\u30a4\u30f3\u3067\u306e\u5408\u8a08\u652f\u6255\u91d1\u984d :",reservationIdLabel:"\u304a\u5ba2\u69d8\u306e\u3054\u4e88\u7d04\u756a\u53f7 :",passengerTableTitle:"\u642d\u4e57\u8005",ticketNumberLabel:"\u822a\u7a7a\u5238\u756a\u53f7",membershipLabel:"TBD :"};return loadHelper("airfrance.com-reservationConfirm-skeleton.js")(e,r,t)}},"SG81d555e7")]);