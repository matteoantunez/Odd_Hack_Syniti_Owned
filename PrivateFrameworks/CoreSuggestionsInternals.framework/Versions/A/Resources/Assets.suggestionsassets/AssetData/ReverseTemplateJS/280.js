new ReverseTemplateList([new ReverseTemplate("lastminute.com-hotel-confirmation-2016-fr",function(e){return/^Confirmation de la r\xe9servation de votre voyage/.test(e.subject)},function(e){var t="fr_FR",i={reservationIdPrefix:"ID booking :",hasFlightPrefix:/D\xe9tails du vol :/i,contact:/Contact person:/i,pricePrefix:"Prix total :",travelers:/VOYAGEURS/i,hotel:/H\xd4TEL/i,hotelConfirmation:/Code confirmation de l'h\xf4tel :/i,neccessary:/CONDITIONS G\xc9N\xc9RALES/i,checkin:/Arriv\xe9e :/i,checkout:/D\xe9part :/i};return loadHelper("lastminute.com-hotel-confirmation-2016-skeleton.js")(e,t,i)},"SGacbd4307")]);