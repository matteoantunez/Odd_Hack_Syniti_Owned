new ReverseTemplateList([new ReverseTemplate("alamo.de-confirmation-de",function(e){return/^Alamo Reservierungsnummer: \d+ Mietwagenbuchung\./.test(e.subject)||/^Alamo.de -Erg\xe4nzungder Reservierung: \d+/.test(e.subject)||/^Alamo.de - Erg\xe4nzung der Reservierung:/.test(e.subject)},function(e){if(/^Alamo Reservierungsnummer: \d+ Mietwagenbuchung\./.test(e.subject)||/^Alamo.de -Erg\xe4nzungder Reservierung: \d+/.test(e.subject)||/^Alamo.de - Erg\xe4nzung der Reservierung:/.test(e.subject)){var n="de_DE",r={reservationId:/Reservierungsnummer (\d+)\s+/,name:"Fahrer",email:"Email",telephone:"Telefon:",pickup:"Zusammenfassung",pickup_inner:"Anmietung",pickup_name:/Anmietung\s{4}(.*?)\s{4}/,dropoff:"Zusammenfassung",dropoff_inner:"Abgabe",dropoff_name:/Abgabe:\s{4}(.*?)\s{4}/,brand:/CAR (.*?) o.\xe4./,totalPrice:"Gesamtbetrag",modifyReservationUrl:"F\xfcr \xc4nderungen oder Stornierung der Buchung klicken Sie bitte",cancelReservationUrl:"F\xfcr \xc4nderungen oder Stornierung der Buchung klicken Sie bitte"};return loadHelper("alamo.com-skeleton.js")(e,n,r)}},"SG860f1ee1")]);