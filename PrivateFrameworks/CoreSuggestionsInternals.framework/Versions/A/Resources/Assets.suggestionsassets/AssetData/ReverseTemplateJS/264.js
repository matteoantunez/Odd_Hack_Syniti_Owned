new ReverseTemplateList([new ReverseTemplate("interpark-hotel-confirmation",function(e){return/^\[\uc778\ud130\ud30c\ud06c\ud22c\uc5b4\] \uc219\ubc15 \uc608\uc57d\uc774 (?:\uc811\uc218|\ucde8\uc18c)\ub418\uc5c8\uc2b5\ub2c8\ub2e4/.test(e.subject)||/^\[\uc778\ud130\ud30c\ud06c\ud22c\uc5b4\] \uc219\ubc15 \uac1d\uc2e4\uc608\uc57d\ubc88\ud638\uac00 \ubc1c\ud589\ub418\uc5c8\uc2b5\ub2c8\ub2e4/.test(e.subject)||/\uc608\uc57d\uc2e0\uccad\uc774 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4/.test(e.subject)},function(e){if(/^\[\uc778\ud130\ud30c\ud06c\ud22c\uc5b4\] \uc219\ubc15 \uc608\uc57d\uc774 (?:\uc811\uc218|\ucde8\uc18c)\ub418\uc5c8\uc2b5\ub2c8\ub2e4/.test(e.subject)||/^\[\uc778\ud130\ud30c\ud06c\ud22c\uc5b4\] \uc219\ubc15 \uac1d\uc2e4\uc608\uc57d\ubc88\ud638\uac00 \ubc1c\ud589\ub418\uc5c8\uc2b5\ub2c8\ub2e4/.test(e.subject)||/\uc608\uc57d\uc2e0\uccad\uc774 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4/.test(e.subject)&&/\ud638\ud154\uba85/.test(e.html)&&!/\uc608\uc57d\ud558\uc2e0 \ud56d\uacf5/.test(e.html)){var t="ko_KR",n={};return n.guestName=/\n(.*) \uace0\uac1d\ub2d8!/,n.confirmation=/(T\d{10})/,n.dates=/($<checkin>\d{4}\.\d{2}.\d{2})\s\~\s($<checkout>\d{4}\.\d{2}.\d{2})/,n.times=/\uccb4\ud06c\uc778 ($<checkin>.*)\ubd80\ud130 \/ \uccb4\ud06c\uc544\uc6c3 ($<checkout>.*)\uae4c\uc9c0/,n.isCancelled=/\ucde8\uc18c/,loadHelper("interpark-hotel-skeleton.js")(e,t,n)}},"SGbc4a6bb6"),new ReverseTemplate("interpark-ticket-cancellation-kr",function(e){return/(?:\[\uc778\ud130\ud30c\ud06c \ud2f0\ucf13\] )?\uc608\ub9e4\ucde8\uc18c \uba54\uc77c\uc785\ub2c8\ub2e4\./.test(e.subject)},function(e){if(!/(?:\[\uc778\ud130\ud30c\ud06c \ud2f0\ucf13\] )?\uc608\ub9e4\ucde8\uc18c \uba54\uc77c\uc785\ub2c8\ub2e4\./.test(e.subject))return CONTINUE;var t="ko_KR",n={isConfirmation:!1,personUnderNameSuffix:"\uace0\uac1d\ub2d8! \uc548\ub155\ud558\uc138\uc694?",eventDetailsBlockPrefix:"\ud558\uc2e0 \ub0b4\uc5ed\uc774 \uc544\ub798\uc640 \uac19\uc774 \uc815\uc0c1\uc801\uc73c\ub85c \ucde8\uc18c \ub418\uc5c8\uc2b5\ub2c8\ub2e4.",ticketNumberHeader:"\uc608\uc57d\ubc88\ud638"};return loadHelper("interpark-ticket-skeleton.js")(e,t,n)},"SG711f69dd"),new ReverseTemplate("interpark-ticket-confirmation-kr",function(e){return/(?:\[\uc778\ud130\ud30c\ud06c \ud2f0\ucf13\] )?\uc608\ub9e4\ud655\uc778 \uba54\uc77c\uc785\ub2c8\ub2e4\./.test(e.subject)},function(e){if(!/(?:\[\uc778\ud130\ud30c\ud06c \ud2f0\ucf13\] )?\uc608\ub9e4\ud655\uc778 \uba54\uc77c\uc785\ub2c8\ub2e4\./.test(e.subject))return CONTINUE;var t="ko_KR",n={isConfirmation:!0,personUnderNameSuffix:"\uace0\uac1d\ub2d8! \uc548\ub155\ud558\uc138\uc694?",eventDetailsBlockPrefix:"\uc544\ub798 \uc608\ub9e4\ub0b4\uc5ed\uc744 \ud655\uc778\ud574 \uc8fc\uc138\uc694.",ticketNumberHeader:"\uc608\uc57d\ubc88\ud638"};return loadHelper("interpark-ticket-skeleton.js")(e,t,n)},"SGc5909cc0")]);