new ReverseTemplateList([new ReverseTemplate("airchina-cancellation-en",function(e){return/AP Air China.*refund/.test(e.subject)},function(e){var t=Scanner.fromMessage(e);t.setLocale("en_US");var r=e.subject.match(/Air China (\w+)/i)[1],n=t.getSpan().innerCapture(/number: ([\w-]+)/i,1),a={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationStatus:"http://schema.org/ReservationCancelled",reservationFor:{"@type":"http://apple.com/FuzzyFlight"},reservationId:r,name:t.getSpan().innerCapture(/Dear ([\w ]+)/,1),reservedTicket:{"@type":"Ticket",ticketNumber:n}};if(ASSERT(r,n))return[a]},"SG25d2813e")]);