new ReverseTemplateList([new ReverseTemplate("expediamail.com-flight-itinerary-en",function(e){return/\(?Itin(?:erary)?(?:\s*)?#(?:\s*)?\d+\)?$/.test(e.subject)||/^Expedia\s+travel\s+confirmation/.test(e.subject)},function(e){if(/^Expedia travel confirmation(?:\/e-Ticket)?\s-\s\w{3,4}\s\d?\d,\s\d{4}\s-\s\(?Itin/.test(e.subject)||/^Expedia travel confirmation(?:\/e-Ticket)?\s-\s[\w\s\d\.]{5,7}(?:,\s\d{4})?\s-\s\(?Itin/.test(e.subject)||/^Updated Itinerary\s-\s[\w\d\s\,.\-]+\(Itiner/.test(e.subject)||/\(Itinerary# /.test(e.subject))return CONTINUE;if(/(?:Travell?er Information|Traveler\(s\))/i.test(e.plain)&&/Airline Rules (?:& Regulations|\+ restrictions)/i.test(e.plain)){var t,r="en_US",i={};return/Thanks!/.test(e.plain)?(i.date=/(Departure|Return)/,i.cabin=/(Cabin:)/,i.passengers=/Traveler\(s\)/,i.passengerEnd="Special requests",i.skipper=/Frequent flyer and special assistance requests should be confirmed directly with the airline\./,i.reservationId="Itinerary #",t=loadHelper("expediamail.com-flight-itinerary-skeleton-2.js")):(i.travellers=/Travell?er Information/,i.priceSummary="Price Summary",i.priceCurrency="All prices quoted in",i.totalPrice="Total:",i.reservationId="Itinerary #",i.cancelled=/This reservation has been fully cancell?ed/,i.noProgramName="No frequent flyer details provided",i.ticketNumber="Ticket #",i.totalTravelTime="Total travel time",i.seat="Seat",t=loadHelper("expediamail.com-flight-itinerary-skeleton.js")),t(e,r,i)}},"SG2777b257"),new ReverseTemplate("expediamail.com-travel-confirmation-en",function(e){return/^Expedia travel confirmation/.test(e.subject)||/E-ticket\s-\s[a-zA-Z\s]+\s-\s\d?\d\s[A-Za-z\.]+\s\(Itiner/.test(e.subject)||/^Updated Itinerary\s-\s[\w\d\s\,.\-]+\(Itiner/.test(e.subject)||/\(Itinerary\s?#.+\)/.test(e.subject)},function(e){var t=!1,r=!1,i=!1;if(/^Expedia travel confirmation(?:\/e-Ticket)?\s-\s\w{3,4}\s\d?\d,\s\d{4}\s-\s\(Itin/.test(e.subject)){(o={flight:{},hotel:{},car:{},reservationId:"Itinerary number:",totalPrice:"Package total:",taxes:"Taxes"}).flight.names=/\sTravell?er names?:/,o.flight.to="to",o.hotel.name="Room reservation:",o.hotel.totalPrice="Lodging total:",o.hotel.telephone="Phone:",o.hotel.checkin="Check in:",o.hotel.checkout="Check out:",o.car.name="Driver:",o.car.totalPrice="Car total:",o.car.provider="Car:",o.car.pickup=/Pick up:/i,o.car.dropoff=/Drop off:/i;var a="en_US";return(s=loadHelper("expediamail.com-travel-confirmation-skeleton.js"))(e,a,o)}var s,n=[],l=[];a="en_US";if(/(?:Expedia travel confirmation)?(?:\/e-Ticket)?\s-\s[\w\s\d\.]{5,7}\s-\s\(?Itin/.test(e.subject)||/Thanks!/.test(e.plain)||/E-ticket\s-\s[a-zA-Z\s]+\s-\s\d?\d\s[A-Za-z\.]+\s\(Itiner/.test(e.subject)||/^Updated Itinerary\s-\s[\w\d\s\,.\-&]+\(Itiner/.test(e.subject)||/^Itinerary\s-\s[\w\d\s\,.\-]+\(Itiner/.test(e.subject)||/\(Itinerary\s?#.+\)/.test(e.subject)){(/Additional Hotel Services/.test(e.plain)||/Hotel overview/.test(e.plain)||/View hotel details/.test(e.plain))&&(i=!0),(/Additional Flight Services/.test(e.plain)||/Flight overview/.test(e.plain))&&(t=!0),(/Additional Car Services/.test(e.plain)||/Car (?:rental|hire)/.test(e.plain)||/Drop off/.test(e.plain)&&/Pick up/.test(e.plain))&&(r=!0);var o={flight:{},hotel:{},car:{}};if(t&&(/Thanks!/.test(e.plain)?(o.date=/(Departure|Return)/,o.cabin=/(Cabin:|Class:)/,o.passengers=/Travell?er\(s\)/,o.passengerEnd="Special requests",o.reservationId="Itinerary #",o.skipper=/Frequent flyer and special assistance requests should be confirmed directly with the airline\./,s=loadHelper("expediamail.com-flight-itinerary-skeleton-2.js"),n.push(s(e,a,o)),n[0]===undefined&&(n=n.filter(function(e){return e!==undefined}))):(o.travellers=/Travell?er Information/,o.priceSummary="Price Summary",o.priceCurrency="All prices quoted in",o.totalPrice="Total:",o.reservationId="Itinerary #",o.cancelled=/This reservation has been fully cancell?ed/,o.noProgramName="No frequent flyer details provided",o.ticketNumber="Ticket #",o.totalTravelTime="Total travel time",o.seat="Seat",s=loadHelper("expediamail.com-flight-itinerary-skeleton.js"),n.push(s(e,a,o)))),i){var c={reservationId:"Itinerary #",reservedFor:"Reserved for",totalPrice:"Total"};/Thanks!/.test(e.plain)?(c.hotelDetails="Hotel overview",c.reservationDetails="Reservation dates",c.checkInTime="Check-in time",c.checkOutTime="Check-out time",c.hotelUrl="View hotel",c.check="Check-in",s=loadHelper("expediamail.com-hotel-itinerary-skeleton-alternative.js"),n.push(s(e,a,c)),n[0]===undefined&&(n=n.filter(function(e){return e!==undefined}))):(c.hotelDetails="View hotel details <",c.telephone="Tel:",c.checkin=/(?:Checking in|Check-in)/,c.checkinTime="Check-in time starts",c.priceSummary="Price Summary",c.priceCurrency="All prices quoted in",c.cancelled=/CANCELLED/,c.check="View hotel details",s=loadHelper("expediamail.com-hotel-itinerary-skeleton.js"),n.push(s(e,a,c)))}r&&(/(?:Thanks!|Rental car overview)/.test(e.plain)?(o.pickupdropoffBlock=/Pick-up and Drop-off/,o.pickUp="Pick-up",o.dropOff="Drop-off",o.reserved="Reserved for",o.cancelled=/.*Cancelled/,o.type="Car type",o.itinerary="Itinerary #",o.cancelUrl="Cancel your reservation",o.checkForProvider=/your (.+) reservation is (?:booked and )?confirmed/i,s=loadHelper("expediamail.com-car-skeleton-4.js"),n.push(s(e,a,o))):(o.booking="Confirmation",o.pickUp="Pick up",o.dropOff="Drop off",o.car="Car",o.reserved="Reserved for",o.cancelled=/.*Cancelled/,s=loadHelper("expediamail.com-car-skeleton-3.js"),n.push(s(e,a,o))))}n=n.filter(function(e){return e!==undefined&&null!==e});for(var d=0;d<n.length;d++)for(var p=0;p<n[d].length;p++)l.push(n[d][p]);return l},"SG8041e1fb")]);