new ReverseTemplateList([new ReverseTemplate("lastminute.com-flight-canellation-es",function(e){return/Confirmaci\xf3n reembolso/i.test(e.subject)||/Cancelaci\xf3n de reserva/.test(e.subject)||/Solicitud de cancelaci\xf3n/.test(e.subject)||/Confirmaci\xf3n de cancelaci\xf3n/.test(e.subject)},function(e){var t="es_ES",n={reservationIdPrefix:/(?:ID Booking|id\sbooking|booking\sID)/i,passenger:/Estimado\/a/};return loadHelper("lastminute.com-flight-cancellation-en-skeleton.js")(e,t,n)},"SG98edd15b"),new ReverseTemplate("lastminute.com-hotel-confirmation-2016-es",function(e){return/Confirmaci\xf3n.*ID BOOKING/i.test(e.subject)},function(e){var t="es_ES",n={reservationIdPrefix:"ID booking:",hasFlightPrefix:/Trayecto:/i,contact:/Persona de contacto:/i,travelers:/VIAJEROS/i,hotel:/Hotel/i,hotelConfirmation:/Localizador de hotel:/i,neccessary:/DOCUMENTACI\xd3N NECESARIA PARA VIAJAR/i,checkin:/Entrada/i,checkout:/Salida/i};return loadHelper("lastminute.com-hotel-confirmation-2016-skeleton.js")(e,t,n)},"SG05510490")]);