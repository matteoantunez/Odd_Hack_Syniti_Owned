new ReverseTemplateList([new ReverseTemplate("aircorsica.com-eticket-fr",function(e){return/^Votre carte d'embarquement Air Corsica/.test(e.subject)},function(e){if(/^Votre carte d'embarquement Air Corsica/.test(e.subject)){var r="fr_FR",t={name:"Cher/Ch\xe8re",reservationId:"Num\xe9ro E-Ticket:",flight:"Vol:",departureAirport:"De:",arrivalAirport:"Vers:"};return loadHelper("aircorsica.com-eticket-skeleton.js")(e,r,t)}},"SG888f346e")]);