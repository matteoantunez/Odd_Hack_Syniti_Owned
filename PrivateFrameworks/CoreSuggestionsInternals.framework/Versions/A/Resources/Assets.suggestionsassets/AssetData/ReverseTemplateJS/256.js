new ReverseTemplateList([new ReverseTemplate("expediamail.com-travel-confirmation-fr",function(e){return/confirmation de voyage/.test(e.subject)||/Expedia voyage confirm\xe9\(e\)/.test(e.subject)||/\(N\xb0 de voyage \d+\)/.test(e.subject)||/\(Voyage #\d+\)/.test(e.subject)||/Votre confirmation de voyage Expedia\s-\s[\w\s\d\.]{5,7}\s-\s\(?Itin/.test(e.subject)},function(e){var t,r=!1,i=!1,a=!1,n=[],o=[],s="fr_FR";if(/Votre confirmation de voyage Expedia(?:\/billet \xe9lectronique)?\s-\s[\xe9\xfb\w\s\d\.]{5,9}\s-\s\(?Itin/.test(e.subject)||/Merci !/.test(e.plain)||/\(N\xb0 de voyage \d+\)/.test(e.subject)||/\(Voyage #\d+\)/.test(e.subject)){(/Services d\u2019h\xf4tel suppl\xe9mentaires/.test(e.plain)||/Aper\xe7u de l'h\xf4tel/.test(e.plain)||/Afficher les d\xe9tails de l\u2019h\xf4tel/.test(e.plain))&&(a=!0),(/Services \xe0 bord suppl\xe9mentaires/.test(e.plain)||/Aper\xe7u du vol/.test(e.plain))&&(r=!0),(/Services additionnels pour votre voiture/.test(e.plain)||/Restitution/.test(e.plain))&&(i=!0);var l={flight:{},hotel:{},car:{}};if(r&&(/Merci !/.test(e.plain)||/Voir votre voyage/.test(e.plain)?(l.date=/(Departure|Return|Vol aller|Retour|D\xe9part)/,l.cabin=/(Cabin:|Classe\xa0:)/,l.passengers=/Voyageur\(s\)/,l.passengerEnd="Special requests",l.reservationId="N\xb0 de voyage",l.skipper=/Les demandes d\u2019assistance sp\xe9ciale et relatives au programme de fid\xe9lit\xe9/,t=loadHelper("expediamail.com-flight-itinerary-skeleton-2.js"),n.push(t(e,s,l)),n[0]===undefined&&(n=n.filter(function(e){return e!==undefined}))):(l.travellers=/Informations sur le voyageur/,l.priceSummary="R\xe9capitulatif du prix",l.priceCurrency="Tous les prix sont indiqu\xe9s en",l.totalPrice="Total :",l.reservationId=/(?:N\xb0 de voyage|Voyage #)/,l.cancelled=/Cette r\xe9servation a bien \xe9t\xe9 annul\xe9e/,l.noProgramName="Aucune information concernant le programme de fid\xe9lit\xe9",l.ticketNumber="Billet n\xb0 ",l.totalTravelTime="Dur\xe9e totale",l.seat="Seat",t=loadHelper("expediamail.com-flight-itinerary-skeleton.js"),n.push(t(e,s,l)))),a){var c={reservationId:"N\xb0 de voyage",reservedFor:"R\xe9servation pour",totalPrice:"Prix total"};/Merci !/.test(e.plain)||/Voir votre voyage/.test(e.plain)?(c.hotelDetails=/Aper\xe7u de l\'h\xf4tel/,c.reservationDetails="Dates de r\xe9servation",c.checkInTime="Heure d'arriv\xe9e",c.checkOutTime="Heure de d\xe9part",c.hotelUrl="Voir l'h\xf4tel",c.check="Arriv\xe9e",t=loadHelper("expediamail.com-hotel-itinerary-skeleton-alternative.js"),n.push(t(e,s,c)),n[0]===undefined&&(n=n.filter(function(e){return e!==undefined}))):(c.hotelDetails="Afficher les d\xe9tails de l\u2019h\xf4tel <",c.telephone="T\xe9l. :",c.checkin=/Arriv\xe9e/,c.checkinTime="Arriv\xe9es \xe0 partir de",c.priceSummary="R\xe9capitulatif du prix",c.priceCurrency="sont indiqu\xe9s en",c.cancelled=/ANNUL\xc9E/,c.check="Arriv\xe9e",c.reservationId=/(?:N\xb0 de voyage|Voyage #)/,t=loadHelper("expediamail.com-hotel-itinerary-skeleton.js"),n.push(t(e,s,c)))}i&&(/R\xe9capitulatif de votre location/.test(e.plain)?(l.pickupdropoffBlock=/Prise en charge et restitution/,l.pickUp="Prise en charge",l.dropOff="Restitution",l.reserved="R\xe9servation pour",l.cancelled=/.*Cancelled/,l.type="Type de voiture de location",l.itinerary="N\xb0 de voyage",l.cancelUrl="Annuler votre r\xe9servation",l.checkForProvider=/your (.+) reservation is (?:booked and )?confirmed/i,t=loadHelper("expediamail.com-car-skeleton-4.js"),n.push(t(e,s,l))):(l.booking="N\xb0 de confirmation",l.pickUp="Prise en charge",l.dropOff="Restitution",l.car="Car",l.reserved="R\xe9serv\xe9e pour",l.cancelled=/.*cancelled/,l.reservationId="Voyage #",t=loadHelper("expediamail.com-car-skeleton-3.js"),n.push(t(e,s,l))))}n=n.filter(function(e){return e!==undefined});for(var d=0;d<n.length;d++)for(var p=0;p<n[d].length;p++)o.push(n[d][p]);return o},"SG23fe5b2c")]);