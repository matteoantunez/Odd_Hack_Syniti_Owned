new ReverseTemplateList([new ReverseTemplate("interpark-ticket-cancellation-kr",function(e){return/(?:\[\uc778\ud130\ud30c\ud06c \ud2f0\ucf13\] )?\uc608\ub9e4\ucde8\uc18c \uba54\uc77c\uc785\ub2c8\ub2e4\./.test(e.subject)},function(e){if(!/(?:\[\uc778\ud130\ud30c\ud06c \ud2f0\ucf13\] )?\uc608\ub9e4\ucde8\uc18c \uba54\uc77c\uc785\ub2c8\ub2e4\./.test(e.subject))return CONTINUE;var t="ko_KR",r={isConfirmation:!1,personUnderNameSuffix:"\uace0\uac1d\ub2d8! \uc548\ub155\ud558\uc138\uc694?",eventDetailsBlockPrefix:"\ud558\uc2e0 \ub0b4\uc5ed\uc774 \uc544\ub798\uc640 \uac19\uc774 \uc815\uc0c1\uc801\uc73c\ub85c \ucde8\uc18c \ub418\uc5c8\uc2b5\ub2c8\ub2e4.",ticketNumberHeader:"\uc608\uc57d\ubc88\ud638"};return loadHelper("interpark-ticket-skeleton.js")(e,t,r)},"SG711f69dd"),new ReverseTemplate("interpark-ticket-confirmation-kr",function(e){return/(?:\[\uc778\ud130\ud30c\ud06c \ud2f0\ucf13\] )?\uc608\ub9e4\ud655\uc778 \uba54\uc77c\uc785\ub2c8\ub2e4\./.test(e.subject)},function(e){if(!/(?:\[\uc778\ud130\ud30c\ud06c \ud2f0\ucf13\] )?\uc608\ub9e4\ud655\uc778 \uba54\uc77c\uc785\ub2c8\ub2e4\./.test(e.subject))return CONTINUE;var t="ko_KR",r={isConfirmation:!0,personUnderNameSuffix:"\uace0\uac1d\ub2d8! \uc548\ub155\ud558\uc138\uc694?",eventDetailsBlockPrefix:"\uc544\ub798 \uc608\ub9e4\ub0b4\uc5ed\uc744 \ud655\uc778\ud574 \uc8fc\uc138\uc694.",ticketNumberHeader:"\uc608\uc57d\ubc88\ud638"};return loadHelper("interpark-ticket-skeleton.js")(e,t,r)},"SGc5909cc0")]);