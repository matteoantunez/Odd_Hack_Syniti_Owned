new ReverseTemplateList([new ReverseTemplate("aireuropa.com-pending-confirmation-es",function(e){return/^Reserva temporal confirmada/.test(e.subject)},function(e){if(/^Reserva temporal confirmada/.test(e.subject)){var r="es_ES",a={reservationId:"Localizador",passportNumber:/(N.MERO Pasaporte|EMAIL DE CONTACTO)/,seatingType:"TARIFA",departure:/(SALIDA)/};return loadHelper("aireuropa.com-pending-confirmation-skeleton.js")(e,r,a)}},"SG7fb16c87")]);