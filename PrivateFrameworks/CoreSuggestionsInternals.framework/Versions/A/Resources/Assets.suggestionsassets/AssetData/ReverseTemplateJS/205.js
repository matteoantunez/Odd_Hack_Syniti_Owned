new ReverseTemplateList([new ReverseTemplate("wyn.com-de",function(e){return/Confirmed Reservation|Reservation Modification/.test(e.subject)||/Reservation Cancellation/.test(e.subject)},function(e){var n="de_DE",i={emailTitelConfirmation:/Confirmed Reservation|Reservation Modification/,reservationId:/Best\xe4tigungsnummer\: (.+)/,checkInDate:/Einchecken\:/,checkOutDate:/Auschecken\:/,guestName:/Name\: (.+)/,price:/Gesamtpreis (?:f\xfcr|des) Aufenthalt/,priceVersion1:/Stornierungsbedingungen\:/,priceVersion2:/Informationen zu den G\xe4sten/,emailTitelCancelConfirmation:/Reservation Cancellation/};return loadHelper("wyn.com.js")(e,n,i)},"SG3158f776"),new ReverseTemplate("wyn.com-en",function(e){return/Confirmed Reservation|Reservation Modification/.test(e.subject)||/Reservation Cancellation/.test(e.subject)},function(e){var n="en_US",i={emailTitelConfirmation:/Confirmed Reservation|Reservation Modification/,reservationId:/Confirmation Number\: (.+)/,checkInDate:/Check in\:/,checkOutDate:/Check Out\:/,guestName:/Name\: (.+)/,priceVersion1:/Cancellation Policy\:/,priceVersion2:/Guest Information/,phone:"Phone",emailTitelCancelConfirmation:/Reservation Cancellation/};return loadHelper("wyn.com.js")(e,n,i)},"SG9d74b390")]);