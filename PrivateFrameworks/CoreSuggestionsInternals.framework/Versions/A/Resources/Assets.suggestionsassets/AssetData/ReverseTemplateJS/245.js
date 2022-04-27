new ReverseTemplateList([new ReverseTemplate("expediamail.com-car-cancellation-it",function(e){return/^(?:Prenotazione (?:noleggio )?auto Expedia cancellata|Noleggio auto a)/.test(e.subject)},function(e){if(/^(?:Prenotazione (?:noleggio )?auto Expedia cancellata|Noleggio auto a)/.test(e.subject)||/^Noleggio auto/.test(e.subject)&&/La prenotazione \xe8 stata cancellata/.test(e.plain)){var i="it_IT",a={total:"Prezzo totale",reserved:"Prenotata per",pickUp:"Ritiro",dropOff:"Riconsegna",reservationId:"Itinerario #",cancelled:/(?:Prenotazione auto Expedia cancellata|La prenotazione .{0,25}\xe8 stata cancellata)/};return loadHelper("expediamail.com-car-skeleton.js")(e,i,a)}},"SG5f7fa940"),new ReverseTemplate("expediamail.com-car-confirmation-it",function(e){return/^Conferma di viaggio Expedia/.test(e.subject)||/Itinerario#/.test(e.subject)},function(e){if(/Conferma di viaggio Expedia/.test(e.subject))return CONTINUE;if((/Servizi aggiuntivi per l'auto/.test(e.plain)||/Noleggio auto/.test(e.plain))&&!/^Prenotazione auto Expedia cancellata/.test(e.subject)&&!/La prenotazione \xe8 stata cancellata/.test(e.plain)){var i="it_IT",a={total:"Prezzo totale",reserved:"Prenotata per",pickUp:"Ritiro",dropOff:"Riconsegna",reservationId:"Itinerario #",cancelled:/(?:Prenotazione auto Expedia cancellata|La prenotazione \xe8 stata cancellata)/};return loadHelper("expediamail.com-car-skeleton.js")(e,i,a)}},"SG51fd59a5"),new ReverseTemplate("expediamail.com-flight-itinerary-it",function(e){return/\(Itin(?:erario)?#\s+\d+\)$/.test(e.subject)||/^Itinerario/.test(e.subject)},function(e){if(/Informazioni sul viaggiatore/.test(e.plain)&&/Regolamenti della compagnia aerea/.test(e.plain)){var i={travellers:"Informazioni sul viaggiatore",priceSummary:"Riepilogo prezzi",totalPrice:"Totale:",priceCurrency:"Prezzi calcolati in",reservationId:"Itinerario #",cancelled:/La prenotazione \xe8 stata cancellata/,noProgramName:"Dettagli Frequent Flyer non forniti",ticketNumber:"N\xb0 biglietto",totalTravelTime:"Durata totale del viaggio",seat:"Posto a sedere"},a="it_IT";return loadHelper("expediamail.com-flight-itinerary-skeleton.js")(e,a,i)}},"SG039a8a3f"),new ReverseTemplate("expediamail.com-hotel-cancellation-it",function(e){return/^Expedia\s+(?:-\s+)?Conferma\s+cancellazione\s+hotel/.test(e.subject)},function(e){if(/^Expedia\s+(?:-\s+)?Conferma\s+cancellazione\s+hotel/.test(e.subject)){var i="it_IT",a={reservationId:"Numero itinerario Expedia:",name:/Prenota(?:ta|zione) per/};return loadHelper("expediamail.com-hotel-cancellation-skeleton.js")(e,i,a)}},"SG763fba70"),new ReverseTemplate("expediamail.com-hotel-itinerary-it",function(e){return/Itin#/.test(e.subject)||/^Itinerario aggiornato/.test(e.subject)},function(e){if((/Itin#/.test(e.subject)||/^Itinerario aggiornato/.test(e.subject))&&/Servizi aggiuntivi hotel/.test(e.plain)){var i="it_IT",a={reservedFor:"Prenotata per",reservationId:/(?:Numero di itinerario|Itinerario #)/,hotelDetails:"Mostra dettagli hotel <",telephone:"Tel:",checkin:"Arrivo",checkinTime:"Check-in dalle ore",priceSummary:"Riepilogo prezzi",totalPrice:"Totale",priceCurrency:"Prezzi calcolati in",cancelled:/CANCELLED/,check:"Mostra dettagli hotel"};return loadHelper("expediamail.com-hotel-itinerary-skeleton.js")(e,i,a)}},"SG041237c3"),new ReverseTemplate("expediamail.com-travel-confirmation-it",function(e){return/^Expedia\s+viaggio\s+conferma/.test(e.subject)||/Conferma di viaggio/.test(e.subject)||/Itinerario\s-\s[\w\s\d\.,-]{5,25}\(Itinerario #/.test(e.subject)||/Itinerario aggiornato.+?\(Itin/.test(e.subject)},function(e){if(/^Expedia\s+viaggio\s+conferma/.test(e.subject)){var i="it_IT",a={flight:{},hotel:{},car:{},event:{}};return/Conferma del viaggio\/VOUCHER PREPAGATO/.test(e.plain)?(a.flightSummary="Riepilogo volo",a.departure=/Partenza/,a.arrival="Arrivo",a.flight="Volo:",a.passengers="Riepilogo viaggiatori e costi",a.flightReservationId="Expedia.it Numero di prenotazione (volo):",a.carSummary="Riepilogo autonoleggi",a.carPickup=/Ritiro/,a.carDropoff="Riconsegna:",a.carLocation="Localit\xe0:",a.carReservationId="Numero di conferma dell'auto:",a.contactPerson="Contatto principale:",a.traveller="NOT_DEFINED_YET",t=loadHelper("expediamail.com-travel-confirmation-alternative-skeleton.js")):(a.bookedItems="Voci prenotate",a.carName="Auto",a.eventName="Attrazioni",a.flightName="Volo",a.car.name="Contatto principale",a.car.reservationId="Numero di conferma",a.car.totalPrice="Totale autonoleggio",a.car.pickupTime="Ritiro",a.car.loc="Localit\xe0",a.car.driver="Driver",a.event.ticketNr="Numero itinerario",a.event.price="prezzo",a.flight.summary="Riepilogo volo",a.flight.passenger="Riepilogo viaggiatori e costi",a.flight.depart="Partenza",a.flight.taxes="Tasse e spese",a.flight.price="Totale",a.flight.reservationId=/ID prenotazione Expedia\.it:/,t=loadHelper("expediamail.com-travel-confirmation-en_au-skeleton.js")),t(e,i,a)}var t,r=!1,o=!1,n=!1,l=[],c=[];i="it_IT";if(/Conferma di viaggio Expedia\s-\s[\w\s\d\.]{5,7}\s-\s\(?(?:Numero|N\xb0 di itinerario|Itin)/.test(e.subject)||/Itinerario\s-\s[\w\s\d\.,-]{5,25}\(Itinerario #/.test(e.subject)||/Itin(?:erario)?\s?#\s?\d+/.test(e.subject)){(/Servizi aggiuntivi dell\u2019hotel/.test(e.plain)||/Panoramica hotel/.test(e.plain))&&(n=!0),(/Servizi aggiuntivi per il volo/.test(e.plain)||/Riepilogo volo/.test(e.plain))&&(r=!0),(/Servizi aggiuntivi per l'auto/.test(e.plain)||/Riepilogo del noleggio auto/.test(e.plain))&&(o=!0);a={flight:{},hotel:{},car:{}};if(r&&(/(?:Grazie!|Riepilogo volo)/.test(e.plain)?(a.date=/(Partenza|Ritorno)/,a.cabin=/(Cabina:|Class:)/,a.passengers=/Viaggiatori/,a.passengerEnd="Special requests",a.reservationId="N\xb0 di itinerario",a.skipper=/Le richieste Frequent Flyer e quelle di assistenza speciale vanno verificate direttamente con la compagnia aerea/,t=loadHelper("expediamail.com-flight-itinerary-skeleton-2.js"),l.push(t(e,i,a)),l[0]===undefined&&(l=l.filter(function(e){return e!==undefined}))):(a.travellers=/Informazioni sul viaggiatore/,a.priceSummary="Riepilogo prezzi",a.priceCurrency="All prices quoted in",a.totalPrice="Totale",a.reservationId="N\xb0 di itinerario",a.cancelled=/cancellato la prenotazione/,a.noProgramName="Dettagli Frequent Flyer non forniti",a.ticketNumber="Ticket #",a.totalTravelTime="Durata totale del viaggio",a.seat="Seat",t=loadHelper("expediamail.com-flight-itinerary-skeleton.js"),l.push(t(e,i,a)))),n){var s={reservationId:"N\xb0 di itinerario",reservedFor:/(?:Prenotazione|Prenotata) per:?/,totalPrice:"Totale"};/Grazie!/.test(e.plain)?(s.hotelDetails="Panoramica hotel",s.reservationDetails="Date prenotate",s.checkInTime="Orario del check-in",s.checkOutTime="Ora di partenza",s.hotelUrl="Visualizza hotel <",s.check="Orario del check-in",t=loadHelper("expediamail.com-hotel-itinerary-skeleton-alternative.js"),l.push(t(e,i,s)),l[0]===undefined&&(l=l.filter(function(e){return e!==undefined}))):(s.hotelDetails="Mostra dettagli hotel <",s.telephone="Tel:",s.checkin=/Arrivo/,s.checkinTime="check-in inizia alle",s.priceSummary="Riepilogo prezzi",s.priceCurrency="All prices quoted in",s.cancelled=/CANCELLED/,s.check="Mostra dettagli hotel",t=loadHelper("expediamail.com-hotel-itinerary-skeleton.js"),l.push(t(e,i,s)))}o&&(/(?:Grazie!|Riepilogo del noleggio auto)/.test(e.plain)?(a.pickupdropoffBlock=/Ritiro e riconsegna/,a.pickUp="Ritiro",a.dropOff="Riconsegna",a.reserved="Prenotata per",a.cancelled=/.*Cancelled/,a.type="Tipo di auto",a.itinerary="N\xb0 di itinerario",a.cancelUrl="Cancella prenotazione",a.checkForProvider=/your (.+) reservation is (?:booked and )?confirmed/i,t=loadHelper("expediamail.com-car-skeleton-4.js"),l.push(t(e,i,a))):(a.booking="N\xb0 conferma",a.pickUp="Ritiro",a.dropOff="Riconsegna",a.car="Car",a.reserved="Prenotata per",a.cancelled=/.*Cancelled/,t=loadHelper("expediamail.com-car-skeleton-3.js"),l.push(t(e,i,a))))}l=l.filter(function(e){return e!==undefined});for(var p=0;p<l.length;p++)for(var d=0;d<l[p].length;d++)c.push(l[p][d]);return c},"SGde179d62")]);