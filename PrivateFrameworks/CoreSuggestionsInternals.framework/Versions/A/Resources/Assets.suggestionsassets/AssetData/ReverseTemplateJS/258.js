new ReverseTemplateList([new ReverseTemplate("expediamail.com-travel-confirmation-nl",function(e){return/Expedia\s+reis\s+bevestiging/.test(e.subject)||/Reisbevestiging van Expedia\s-\s[\w\s\d\.]{5,7}\s-\s\(?Reisplannr/.test(e.subject)||/Bijgewerkt reisplan\s-\s[\w\d\s\,.\-&]+\(Reisplan/.test(e.subject)||/Reisbevestiging van Expedia(?:\/e-ticket)?\s-\s[\w\s\d\.]{5,7}\s-\s\(?Itin/.test(e.subject)||/Reisplan#/.test(e.subject)},function(e){var t=!1,i=!1,n=!1;if(/Expedia\s+reis\s+bevestiging/.test(e.subject)){var r="nl_NL",s={flightSummary:"Vluchtoverzicht",departure:/Vertrek/,arrival:"Aankomst",flight:"Vlucht:",passengers:"Overzicht van kosten en reiziger",flightReservationId:"Expedia.nl-boeking-id (vlucht):",carSummary:"Overzicht huurauto",carPickup:/Ophalen/,carDropoff:"Terugbrengen:",carLocation:"Locatie:",carReservationId:"Bevestigingsnummer auto:",contactPerson:"Eerste contactpersoon:"};return(a=loadHelper("expediamail.com-travel-confirmation-alternative-skeleton.js"))(e,r,s)}var a,l=[],o=[];r="nl_NL";if(/Reisbevestiging van Expedia\s-\s[\w\s\d\.]{5,7}\s-\s\(?Reisplannr/.test(e.subject)||/Bijgewerkt reisplan\s-\s[\w\d\s\,.\-&]+\(Reisplan/.test(e.subject)||/Reisbevestiging van Expedia(?:\/e-ticket)?\s-\s[\w\s\d\.]{5,7}\s-\s\(?Itin/.test(e.subject)||/Reisplan#/.test(e.subject)){(/Extra hotelservices/.test(e.plain)||/Hoteloverzicht/.test(e.plain)||/View hotel details/.test(e.plain))&&(n=!0),!/Extra vluchtservices/.test(e.plain)&&!/Vluchtoverzicht/.test(e.plain)||/Je ticket is nog niet bevestigd/.test(e.plain)||(t=!0),(/Extra autoverhuurservices/.test(e.plain)||/Overzicht huurauto/.test(e.plain))&&(i=!0);s={flight:{},hotel:{},car:{}};if(t&&(/Bedankt!/.test(e.plain)?(s.date=/(Heen|Terug)/,s.cabin=/(Boekingsklasse:)/,s.passengers=/Reiziger\(s\)/,s.passengerEnd="speciale assistentie",s.reservationId="Reisplannummer",s.skipper=/Verzoeken m.b.t. frequent flyer-programma\u02bcs en speciale assistentie dienen rechtstreeks bevestigd te worden bij de airline\./,a=loadHelper("expediamail.com-flight-itinerary-skeleton-2.js"),l.push(a(e,r,s)),l[0]===undefined&&(l=l.filter(function(e){return e!==undefined}))):(s.travellers=/Reizigersinformatie/,s.priceSummary="Prijsoverzicht",s.priceCurrency="Alle prijzen vermeld in",s.totalPrice="Totaal:",s.reservationId=/(?:Reisplannummer|Reisplan #)/,s.cancelled=/Deze boeking is volledig geannuleerd/,s.noProgramName="Geen Frequent Flyer-informatie gegeven",s.ticketNumber="Ticketnummer",s.totalTravelTime="Totale reistijd",s.seat="Seat",a=loadHelper("expediamail.com-flight-itinerary-skeleton.js"),l.push(a(e,r,s)))),n){var c={reservationId:"Reisplannummer",reservedFor:"Geboekt voor",totalPrice:"Totaal:"};/Bedankt!/.test(e.plain)?(c.hotelDetails="Hoteloverzicht",c.reservationDetails="Boekingsdatums",c.checkInTime="Inchecktijd",c.checkOutTime="Uitchecktijd",c.hotelUrl="Hotel bekijken",c.check="Inchecktijd",a=loadHelper("expediamail.com-hotel-itinerary-skeleton-alternative.js"),l.push(a(e,r,c)),l[0]===undefined&&(l=l.filter(function(e){return e!==undefined}))):(c.hotelDetails="Hotelinformatie weergeven <",c.telephone="Tel.:",c.checkin=/Inchecken/,c.checkinTime="Inchecken vanaf",c.priceSummary="Prijsoverzicht",c.priceCurrency="Alle prijzen vermeld in",c.cancelled=/CANCELLED/,c.check="Hotelinformatie weergeven",a=loadHelper("expediamail.com-hotel-itinerary-skeleton.js"),l.push(a(e,r,c)))}i&&(/(?:Bedankt!|Overzicht huurauto)/.test(e.plain)?(s.pickupdropoffBlock=/Ophalen en inleveren/,s.pickUp="Ophalen",s.dropOff="Inleveren",s.reserved="Geboekt voor",s.cancelled=/.*Cancelled/,s.type="Autotype",s.itinerary="Reisplannummer",s.cancelUrl="Boeking annuleren",s.checkForProvider=/your (.+) reservation is (?:booked and )?confirmed/i,a=loadHelper("expediamail.com-car-skeleton-4.js"),l.push(a(e,r,s))):(s.booking="Confirmation",s.pickUp="Ophalen",s.dropOff="Inleveren",s.car="auto",s.reserved="Geboekt voor",s.cancelled=/.*Cancelled/,a=loadHelper("expediamail.com-car-skeleton-3.js"),l.push(a(e,r,s))))}l=l.filter(function(e){return e!==undefined&&null!==e});for(var p=0;p<l.length;p++)for(var d=0;d<l[p].length;d++)o.push(l[p][d]);return o},"SG150df81c")]);