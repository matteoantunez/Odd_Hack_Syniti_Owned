new ReverseTemplateList([new ReverseTemplate("klm.com-confirmation-en",function(e){return/^Confirmation\: /.test(e.subject)},function(e){if(/^Confirmation\: /.test(e.subject)){var t="en_US",o={confirmationCode:/(Flight - Booking code|Booking code for your option)/,passenger:"Passengers",totalPrice:"Total price:",seats:"Seat",ticketNumber:"Ticket number",totalTravelTime:/Total travel time/,flightSummary:/(Flight summary|Your option)/,flightNumber:/Flight number\: (\w+) (\d+)/,train:/Please note that you will travel by high speed train on this part of the journey/,operatedBy:/Operated by\: (.+)/};return loadHelper("klm-confirmation-skeleton.js")(e,t,o)}},"SG0e2e2eab")]);