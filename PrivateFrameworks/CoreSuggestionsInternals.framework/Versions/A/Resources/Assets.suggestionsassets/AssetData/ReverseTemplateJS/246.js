new ReverseTemplateList([new ReverseTemplate("expediamail.com-flight-cancellation-en",function(e){return/^Your flight itinerary .*? cancell?ed$/.test(e.subject)||/\(Itin(?:erary)?# \d+\)$/.test(e.subject)||/Expedia Flight Cancellation Confirmation/.test(e.subject)||/Your flight cancel details/.test(e.subject)},function(e){var t="en_US",i={};if(/Expedia Flight Cancellation Confirmation/.test(e.subject))return i.location=/(?:One Way to|Round Trip to)/,i.dep="- Departure",i.ari="- Return",i.reservationId="Expedia Itinerary Number:",loadHelper("expediamail.com-flight-cancellation-alt-en.js")(e,t,i)},"SGcd677edc")]);