new ReverseTemplateList([new ReverseTemplate("opodo.com-flight-cancellation-en",function(e){return/^Cancellation of Booking/.test(e.subject)||/^Booking Ref.+Cancellation/.test(e.subject)},function(e){if(/^Cancellation of Booking/.test(e.subject)||/^Booking Ref.+Cancellation/.test(e.subject)){var t="en_US",o={reservationId:"booking reference",reservationIdAlt:"Booking Ref"};return loadHelper("opodo.com-flight-cancellation-skeleton.js")(e,t,o)}},"SGda8a5919"),new ReverseTemplate("opodo.com-flight-confirmation-en",function(e){return/^Your Opodo flight booking confirmation/.test(e.subject)||/Booking on request/.test(e.subject)||/BOOKING REF:/.test(e.html)},function(e){if(/^Your Opodo flight booking confirmation/.test(e.subject)||/Booking on request/.test(e.subject)){var t="en_US",o={reservationIdPrefix:"Booking reference",personalInformationHeader:"Booking details",flightDetailsHeader:"Flight details",passengerEmailAddressPrefix:"Contact email address",passengerNamePrefix:"Name(s) of traveller(s)",departureHeader:"Departing:",arrivalHeader:"Arriving:",pricePrefix:"Total",flightCheck:/Outbound|Inbound/};return loadHelper("opodo.com-flight-confirmation-skeleton.js")(e,t,o)}if(/BOOKING REF:/.test(e.html)){t="en_US",o={name_ticket:/TICKET:\s?(?:[A-Z]+?\/ETKT|\/ETKT)\s($<ticket>.*?)\sFOR\s($<name>.+)\s?(?:MR|\n)?/,name_alt:/SPAIN\s+(.*\/.*)/,reservationId:/BOOKING REF:\s(\w+)/,flightSummary:/FLIGHT\s+($<airlineCode>\w+)\s($<flightNumber>\d+)\s\-\s($<airlineName>.*?)\s\s/,departure:/DEPARTURE:\s+($<airportAddress>.*?\))/,arrival:/ARRIVAL:\s+($<airportAddress>.*?\))/,seating_type:/\,\s(.*?)\s\([A-Z]\)/,ticketHeader:/TICKET:/};return loadHelper("opodo.com-flight-confirmation-alt-skeleton-en.js")(e,t,o)}},"SGb8d3bbb4")]);