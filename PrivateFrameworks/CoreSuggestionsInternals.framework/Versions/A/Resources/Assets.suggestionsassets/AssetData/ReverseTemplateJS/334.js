new ReverseTemplateList([new ReverseTemplate("citi_confirmation-en",function(e){return/Travel Reservation Center/.test(e.subject)},function(e){var n="en_US",r={reservationId:/Airline Reference Number:/,passangersCap:/Passenger (\d+):/,passangers:/Passenger\s\d+:\s[^\n]+/,outbound:/Outbound Flight/,inbound:/Return Flight/};return loadHelper("citi_confirmation.js")(e,n,r)},"SGd8cef64f")]);