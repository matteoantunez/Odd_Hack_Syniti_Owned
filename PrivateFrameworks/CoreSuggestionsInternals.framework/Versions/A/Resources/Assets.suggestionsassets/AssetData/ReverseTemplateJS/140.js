new ReverseTemplateList([new ReverseTemplate("tap-check-in-en",function(e){return/^Check-in here - Booking Ref /.test(e.subject)},function(e){if(/^Check-in here - Booking Ref /.test(e.subject)){var r="en_GB",n={name:"Dear Mr./Mrs.",reservationId:"Your booking reference"};return n.flightDetails=new RegExp([/Check-in is now open for ($<airlineCode>\w{2})($<flightNumber>\d+), /,/departing from ($<departureAirport>.+) \(($<departureAirportCode>.+)\) /,/to ($<arrivalAirport>.+) \(($<arrivalAirportCode>.+)\), /,/on ($<departureTime>\d+\w+\d+ at \d+:\d+)\./].map(function(e){return e.source}).join("")),n.checkinUrl="Complete your Check-in",loadHelper("tap-check-in-skeleton.js")(e,r,n)}},"SG880b97e5")]);