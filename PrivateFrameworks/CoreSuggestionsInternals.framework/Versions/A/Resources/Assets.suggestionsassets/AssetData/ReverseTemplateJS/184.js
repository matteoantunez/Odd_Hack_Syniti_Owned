new ReverseTemplateList([new ReverseTemplate("melia.com-cancellation-es",function(e){return/^(Modificaci\xf3n o )?cancelaci\xf3n de la reserva/i.test(e.subject)},function(e){if(!/^(Modificaci\xf3n o )?cancelaci\xf3n de la reserva/i.test(e.subject))return CONTINUE;var a="es_ES",n={name:"Titular de la reserva:",total:"Coste total:",checkIn:"Fecha de entrada:",checkOut:"Fecha de salida:",phone:"Tel.",viewOnMelia_Com:"ver hotel en melia.com",viewOnGoogleMaps:"ver en Google Maps"};return loadHelper("melia.com-cancellation-skeleton.js")(e,a,n)},"SGebdf9310")]);