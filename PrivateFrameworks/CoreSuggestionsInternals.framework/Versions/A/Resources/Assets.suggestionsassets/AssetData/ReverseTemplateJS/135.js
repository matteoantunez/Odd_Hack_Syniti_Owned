new ReverseTemplateList([new ReverseTemplate("ryanair.com-reminder-es",function(e){return/^Consejos para viajar a/.test(e.subject)||/^\d. Notificaci\xf3n de [Cc]ambio de horario/.test(e.subject)},function(e){var r="es_ES",n={};return/^Consejos para viajar a/.test(e.subject)?(n.reservationId=/YOUR CONFIRMATION NUMBER IS:/,n.passengers=/PASSENGERS/,n.goingOut=/GOING OUT/,n.comingBack=/COMING BACK/,loadHelper("ryanair.com-info-skeleton.js")(e,r,n)):/^\d. Notificaci\xf3n de [Cc]ambio de horario/.test(e.subject)?(n.reservationId=/SU N\xdaMERO DE CONFIRMACI\xd3N ES:/,n.passengers=/PASAJEROS/,n.goingOut=/SALIDA/,n.comingBack=/LLEGADA/,loadHelper("ryanair.com-info-skeleton.js")(e,r,n)):void 0},"SG61b4027d"),new ReverseTemplate("ryanair.com-reminder-it",function(e){return/^(Prima|Seconda|Terza) notifica di cambio d.{1,5}orario/.test(e.subject)},function(e){if(/^(Prima|Seconda|Terza) notifica di cambio d.{1,5}orario/.test(e.subject)){var r="it_IT",n={reservationId:/Il suo numero di conferma e\u2019:/,passengers:/PASSEGGERI/,goingOut:/ANDATA/,comingBack:/RITORNO/};return loadHelper("ryanair.com-info-skeleton.js")(e,r,n)}},"SG58c7029f"),new ReverseTemplate("ryanair.com-reminder-nl",function(e){return/^\d. melding van tijdsverandering/.test(e.subject)},function(e){if(/^\d. melding van tijdsverandering/.test(e.subject)){var r="nl_NL",n={reservationId:/UW BEVESTIGINGSNUMMER IS:/,passengers:/PASSAGIERS/,goingOut:/VERTREK/,comingBack:/RETOURVLUCHT/};return loadHelper("ryanair.com-info-skeleton.js")(e,r,n)}},"SGc3a98ee5")]);