new ReverseTemplateList([new ReverseTemplate("bestwestern.de",function(e){return/Ihre Buchung bei Best Western/.test(e.subject)||/Ihre Stornierung bei Best Western/.test(e.subject)},function(e){var n="de_DE",t={emailTitelConfirmation:/Ihre Buchung bei Best Western/,reservationId:/Buchungsnummer\:/,guestName:/Ihre pers\xf6nlichen Kundendaten/,guestEmail:/E\-Mail\:/,dates:/Anreise\/Abreise\:/,price:/Gesamtsumme\n(.+)/,hotelInfo:/Mit freundlichen Gr\xfc\xdfen/,emailTitelCancelConfirmation:/Ihre Stornierung bei Best Western/,cancelPrice:/Zimmer\:/};return loadHelper("bestwestern.de.js")(e,n,t)},"SGd281bd67")]);