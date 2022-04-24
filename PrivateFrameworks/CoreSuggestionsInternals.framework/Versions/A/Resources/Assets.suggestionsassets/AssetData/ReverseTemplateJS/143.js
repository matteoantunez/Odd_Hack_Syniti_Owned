new ReverseTemplateList([new ReverseTemplate("tap-e-ticket-en",function(e){return/[0-9]{2}[A-Z]{3}\s\w{3}\s\w{3}$/.test(e.subject)},function(e){if(/[0-9]{2}[A-Z]{3}\s\w{3}\s\w{3}$/.test(e.subject)&&/BOOKING REF/.test(e.plain)&&/TICKET NUMBER/.test(e.plain)){var t="en_US",r={};return r.name=/NAME:\s*(.*)/,r.reservationId=/BOOKING REF\s*:\s*AMADEUS\s*:/,r.ticketNumber=/TICKET NUMBER\s*:/,r.flightInfo=new RegExp([/\s*($<departureAirport>.+?)\s+($<airlineCode>\w{2})\s+($<flightNumber>\d+)\s+/,/\w\s+($<departureDate>.+)\s+($<departureHour>\d{2})($<departureMinute>\d{2}).+?/,/[\s\S]+?\s*($<arrivalAirport>.+?)\s+/,/ARRIVAL TIME:\s+($<arrivalHour>\d{2})($<arrivalMinute>\d{2})\s+/,/ARRIVAL DATE:\s+($<arrivalDate>.*)/].map(function(e){return e.source}).join("")),r.price=/TOTAL\s+:/,loadHelper("tap-amadeus-skeleton.js")(e,t,r)}},"SGefc1ff5c"),new ReverseTemplate("tap-e-ticket-pt",function(e){return/[0-9]{2}[A-Z]{3}\s\w{3}\s\w{3}$/.test(e.subject)},function(e){if(/[0-9]{2}[A-Z]{3}\s\w{3}\s\w{3}$/.test(e.subject)&&/CODIGO DE RESERVA/.test(e.plain)&&/N\xdaMERO DO BILHETE/.test(e.plain)){var t="pt_PT",r={};return r.name=/NOME:\s*(.*)/,r.reservationId=/CODIGO DE RESERVA\s*:\s*AMADEUS\s*:\s*/,r.ticketNumber=/N\xdaMERO DO BILHETE\s*:/,r.flightInfo=new RegExp([/\s*($<departureAirport>.+?)\s+($<airlineCode>\w{2})\s+($<flightNumber>\d+)\s+/,/\w\s+($<departureDate>.+)\s+($<departureHour>\d{2})($<departureMinute>\d{2}).+?/,/[\s\S]+?\s*($<arrivalAirport>.+?)\s+/,/HORARIO DE CHEGADA:\s+DATA DE CHEGADA:\s+/,/($<arrivalHour>\d{2})($<arrivalMinute>\d{2})\s+($<arrivalDate>.*)/].map(function(e){return e.source}).join("")),r.price=/TOTAL\s+:/,loadHelper("tap-amadeus-skeleton.js")(e,t,r)}},"SG606d7601")]);