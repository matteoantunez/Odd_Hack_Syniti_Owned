new ReverseTemplateList([new ReverseTemplate("lastminute.com-flight-canellation-en",function(e){return/Cancellation (?:Confirmation|request)/i.test(e.subject)||/Confirmation of refund/.test(e.subject)||/Reservation cancellation/.test(e.subject)},function(e){var t="en_US",n={reservationIdPrefix:/(?:of your reservation nr.|flight with reservation number|booking ID)/i,passenger:/Dear/};return loadHelper("lastminute.com-flight-cancellation-en-skeleton.js")(e,t,n)},"SG9b936d0c")]);