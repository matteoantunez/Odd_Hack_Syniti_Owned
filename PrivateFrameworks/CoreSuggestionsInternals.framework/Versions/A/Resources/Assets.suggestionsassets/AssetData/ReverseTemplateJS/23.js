new ReverseTemplateList([new ReverseTemplate("cartrawler-confirmation-it",function(e){return/La tua conferma di prenotazione noleggio auto \u2013 .+/.test(e.subject)},function(e){if(!/La tua conferma di prenotazione noleggio auto \u2013 .+/.test(e.subject))return CONTINUE;var r="it_IT",n={reservationIdPrefix:"Numero di riferimento della prenotazione:",underPersonNameRegExp:/Gentile (.+?),/};return loadHelper("cartrawler-confirmation-skeleton.js")(e,r,n)},"SG257991cd"),new ReverseTemplate("cartrawler-confirmation-kr",function(e){return/\ucc28\ub7c9 \ub300\uc5ec \uc608\uc57d \ud655\uc778. \ucc38\uc870\ubc88\ud638.+/.test(e.subject)},function(e){if(!/\ucc28\ub7c9 \ub300\uc5ec \uc608\uc57d \ud655\uc778. \ucc38\uc870\ubc88\ud638.+/.test(e.subject))return CONTINUE;var r="ko_KR",n={reservationIdPrefix:"\uc608\uc57d \ucc38\uc870 \ubc88\ud638:",underPersonNameRegExp:/\n(.+?),\n/,monthMap:{"1\uc6d4":"Jan","2\uc6d4":"Feb","3\uc6d4":"Mar","4\uc6d4":"Apr","5\uc6d4":"May","6\uc6d4":"Jun","7\uc6d4":"Jul","8\uc6d4":"Aug","9\uc6d4":"Sep","10\uc6d4":"Oct","11\uc6d4":"Nov","12\uc6d4":"Dec"}};return loadHelper("cartrawler-confirmation-skeleton.js")(e,r,n)},"SGcb8f3a14"),new ReverseTemplate("cartrawler-confirmation-nl",function(e){return/Uw boekingsbevestiging voor autohuur \u2013 ref.+/.test(e.subject)},function(e){if(!/Uw boekingsbevestiging voor autohuur \u2013 ref.+/.test(e.subject))return CONTINUE;var r="nl_NL",n={reservationIdPrefix:"Boekingsnummer:",underPersonNameRegExp:/Beste (.+?),/};return loadHelper("cartrawler-confirmation-skeleton.js")(e,r,n)},"SGc14dca97")]);