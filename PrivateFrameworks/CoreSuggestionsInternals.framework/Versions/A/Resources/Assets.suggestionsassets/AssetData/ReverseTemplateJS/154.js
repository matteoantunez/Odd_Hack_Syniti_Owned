new ReverseTemplateList([new ReverseTemplate("novotelningaloo.com.au",function(e){return/Confirmation/.test(e.subject)},function(e){var n="en_AU",t={emailTitel:/Confirmation/,reservationName:/Guest Name\s+(.+)/,reservationId:/Confirmation\s\#\s(.+)/,checkInDate:/Arriving\s+(.+)/,checkOutDate:/Departing\s+(.+)/,checkInTimes:/Check-in is from (.+)\, check-out is required by (.+)\./,rate:/Rate \(incl. of GST\)\s+ (.+) per night/,nights:/Night\(s\)\s+(.+)/,phoneCapture:/T\s+(.*)/,confirmation:/ACCOMMODATION CONFIRMATION/,cancellation:/ACCOMMODATION CANCELLED/};return loadHelper("novotelningaloo.com.au.js")(e,n,t)},"SGd2de862f")]);