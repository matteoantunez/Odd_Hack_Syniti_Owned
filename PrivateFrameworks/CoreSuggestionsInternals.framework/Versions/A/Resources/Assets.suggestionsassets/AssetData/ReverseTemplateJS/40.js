new ReverseTemplateList([new ReverseTemplate("malagacar-confirmation-en",function(e){return/^Booking confirmation/.test(e.subject)},function(e){if(!/^Booking confirmation/.test(e.subject))return CONTINUE;var r="en_GB",a={};return a.carReservationIdPrefix="BOOKING NUMBER",a.underPersonNamePrefix="Customer name :",a.pickUpDateTimePrefix="Date and time :",a.pickUpAddressPrefix="Place :",a.dropOffDateTimePrefix="Date and time :",a.dropOffAddressPrefix="Drop off place :",a.carBrandPrefix=/Group\s+-\s+Model\s+\(or\ssimilar\)\s+:/,a.totalPricePrefix="Price (Extras not included) :",loadHelper("malagacar-confirmation-skeleton.js")(e,r,a)},"SG611b57ee"),new ReverseTemplate("malagacar-confirmation-es",function(e){return/^Malagacar.com reserva confirmada/.test(e.subject)},function(e){if(!/^Malagacar.com reserva confirmada/.test(e.subject))return CONTINUE;var r="es_ES",a={};return a.carReservationIdPrefix="N\xfamero de reserva:",a.underPersonNamePrefix="Nombre:",a.pickUpDateTimePrefix="Comienzo de alquiler:",a.pickUpAddressPrefix="Lugar de alquiler:",a.dropOffDateTimePrefix="Devoluci\xf3n del veh\xedculo",a.dropOffAddressPrefix="Lugar de devoluci\xf3n:",a.carBrandPrefix="Categor\xeda de veh\xedculo reservado:",a.totalPricePrefix="Pendiente de pago:",loadHelper("malagacar-confirmation-skeleton.js")(e,r,a)},"SG40e4ca6f")]);