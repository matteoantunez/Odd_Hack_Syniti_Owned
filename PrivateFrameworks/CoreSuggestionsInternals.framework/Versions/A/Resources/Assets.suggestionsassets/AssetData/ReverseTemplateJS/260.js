new ReverseTemplateList([new ReverseTemplate("hotwire.com-car-cancellation-en",function(e){return/^Hotwire Cancellation confirmation/i.test(e.subject)},function(e){if(!/^Hotwire Cancellation confirmation/i.test(e.subject))return CONTINUE;var r={carCancel:/Your upcoming car reservation/i,reservationIdPrefix:/Hotwire itinerary\s+(\w+)/i,provider:/upcoming car reservation with (\w+)/i},t="en_CA";return loadHelper("hotwire.com-car-cancellation.js")(e,t,r)},"SGb56af498"),new ReverseTemplate("hotwire.com-flight-confirmation-en",function(e){return!(int(e.epoch)<1356998400)&&(/^Your Hotwire Trip to|^Hotwire\s+Vacations\s+travel\s+confirmation/i.test(e.subject)||/^Hotwire Flight Purchase Confirmation|Hotwire Vacation/.test(e.subject)||/^Hotwire travel confirmation|^Itinerary.*?\(itin/i.test(e.subject)||/^Updated Itinerary/i.test(e.subject))},function(e){var r=function(e){var r="en_US",t=loadHelper("hotwire.com-hotel-confirmation-skeleton-S24.js"),i={hotelName_preffix:/Itinerary:/,underPersonName_preffix:/Reserved for/,reservationId_preffix:/Itinerary #/,hotelAddress_preffix:/View hotel details/,hotelCancelled:/All rooms in this reservation have been cancelled/};try{return t(e,r,i)}catch(o){return null}},t=function(e){var r="en_US",t={carService:/Additional Car Service/i,previousService:/Additional (Flight|Hotel) Services/i,reservationId:/Confirmation #/i,pickUpDateTimePrefix:/Pick up/i,dropOffDateTimePrefix:/Drop off/i,namePrefix:/Reserved for/i,phonePrefix:/contact the car agency/i};try{return loadHelper("hotwire.com-car-confirmation-bundle.js")(e,r,t)}catch(i){return null}};if(int(e.epoch)<1356998400)return CONTINUE;var i="en_US",o={};if((/^Your Hotwire Trip to/.test(e.subject)||/^Hotwire Flight Purchase Confirmation/.test(e.subject))&&/flight is confirmed/.test(e.plain))return o.customerInformationHeader="Customer Information",o.passengerNamePrefix="Passenger name",o.tripSummaryHeader="Trip Details",o.spans="Flight",o.flightSummaryHeader="Flight",o.ticketNumberPrefix="Ticket number",o.flightNumberPrefix="Flight",o.fromPrefix="From:",o.toPrefix="To:",o.departureDTPrefix="Departs:",o.reservationIdPrefix="Hotwire Itinerary:",o.frequentFlyerPrefix="Frequent flyer program",o.pricePrefix="Trip total:",loadHelper("hotwire.com-flight-confirmation-skeleton.js")(e,i,o);if(/Hotwire\s+Vacations\s+travel\s+confirmation|^Itinerary.*?\(itin/i.test(e.subject))return o.flightSummary=/Flight Summary/i,o.hotelSummary=/Hotel Summary/i,o.carSummary=/Car.*?Summary/i,o.namePrefix=/Traveler and cost summary/i,o.depart=/depart/gi,o.flightID=/booking\sID\s\(flight\):\s(\w+)/i,o.hotelID=/booking\sID\s\(hotel\):\s(\w+)/i,o.flightNo=/Flight: (\d+)/i,o.carRules=/Car Rules and Restrictions/i,o.hotelTimes=/Check\s+in:\s+(\w+ \w+-\d+-\d+)\s+Check out:\s+(\w+ \w+-\d+-\d+)/i,o.hotelPersonName=/Contact:\s+([\w ]+)/i,o.hotwireItinNum=/itinerary number: (\d+)/i,o.hotelConfNumber=/Hotel confirmation number:\s+(\d+)/i,o.hotelPhone=/contact the hotel: tel: ([\d ()-]+)/i,o.ticketNumber=/airline ticket number\(s\):\s+(\w+)/i,o.travelerPrefix=/Traveler and cost summary/i,loadHelper("hotwire.com-bundle-old-confirmation.js")(e,i,o);if(/^Hotwire travel confirmation/.test(e.subject)||/Updated Itinerary/.test(e.subject)){var n=e.plain.search(/Thanks!/);if(-1===n||n>350){o.travellers=/Travell?er Information/,o.priceSummary="Price Summary",o.totalPrice="Total:",o.priceCurrency="All prices quoted in",o.reservationId="Itinerary #",o.cancelled=/This reservation has been fully cancell?ed/,o.noProgramName="No frequent flyer details provided",o.ticketNumber="Ticket #",o.totalTravelTime="Total travel time",o.seat="Seat";var a=[];a=a.concat(loadHelper("hotwire.com-flight-confirmation-skeleton-alternative.js")(e,i,o));var c=r(e),l=t(e);return(a=(a=a.concat(c)).concat(l)).filter(function(e){return null!==e})}var s,f=!1,u=[],m=[];i="en_US";if(/Check-in/.test(e.plain)&&!0,(/booked a flight/.test(e.plain)||/Flight overview/.test(e.plain))&&!0,/Car rental/.test(e.plain)&&(f=!0),/Thanks!/.test(e.plain)){o.dates="Travel dates",o.itNum="Itinerary #",o.confirmation="Confirmation",o.ticket="Ticket #",o.departure="Departure",o["return"]="Return",o.passengers="Traveler(s)",o.cancelled=/cancelled/,o.op="operated by",s=loadHelper("hotwire.com-flight-itinerary-alternative-skeleton-3M.js");try{u.push(s(e,i,o))}catch(d){}}if(/Thanks!/.test(e.plain)){o.itinerary="Itinerary #",o.checkIn="Check-in time",o.checkOut="Check-out time",o.hotelUrl="View hotel <",o.hotel="Hotel overview",o.reservationDate="Reservation dates",o.reservedFor="Reserved for",s=loadHelper("hotwire.com-hotel-itinerary-skeleton-alternative-2M.js");try{u.push(s(e,i,o))}catch(d){}}if(f){o.booking="Confirmation",o.pickUp="Pick-up",o.dropOff="Drop-off",o.car="Car",o.reserved="Reserved for",o.cancelled=/.*Cancelled/,o.type="Car type",o.phone="Specific questions about your car?",o.itinerary="Itinerary #",o.thanks="Thanks!",o.cancelUrl="Cancel your reservation",o.checkForProvider=/reservation is booked and confirmed\./,s=loadHelper("hotwire.com-car-skeleton-4.js");try{u.push(s(e,i,o))}catch(d){}}u=u.filter(function(e){return e!==undefined});for(var h=0;h<u.length;h++)for(var p=0;p<u[h].length;p++)m.push(u[h][p]);return m}},"SG3e569c1f"),new ReverseTemplate("hotwire.com-itinerary-confirmation-en",function(e){return/^Your Hotwire Trip/i.test(e.subject)||/Hotwire Reservation Confirmation/.test(e.subject)},function(e){if(/^Your\s+Hotwire\s+Trip|^Hotwire Vacations travel/.test(e.subject)||/Hotwire Reservation Confirmation/.test(e.subject)){var r,t="en_US",i={};return/Your car/.test(e.html)?(i.reservationIdPrefix="Hotwire itinerary",i.providerNameRegExp=/You do not need to reconfirm with (.*) or Hotwire\./,i.underPersonNameSuffix=/(?:, you got a great deal|, Your trip is coming up)/,i.pickUpTimePrefix="Pick up",i.dropOffTimePrefix="Drop off",i.sameDropOffLocation="Pick-up/drop-off must be the same location.",i.totalPriceRegExp=/(Trip total|Estimated trip total)/,r=loadHelper("hotwire.com-itinerary-car-confirmation-skeleton-S24.js")):/Your hotel/.test(e.html)&&(i.confirmation_id="Hotwire itinerary",i.underPersonName_suffix=", Your trip is coming up!",i.hotelName_prefix="Your hotel",i.hotelPhone_prefix="See ratings guide",i.checkInDateTime_prefix=/Check in/i,i.checkOutDateTime_prefix=/Check out/i,r=loadHelper("hotwire.com-itinerary-hotel-confirmation-skeleton-S24.js")),r(e,t,i)}},"SGb3d496ad")]);