new ReverseTemplateList([new ReverseTemplate("jinair.com-confirmation-ko",function(e){return/JIN AIR \uad6c\ub9e4\ud655\uc778\uc99d/.test(e.subject)},function(e){if(/JIN AIR \uad6c\ub9e4\ud655\uc778\uc99d/.test(e.subject)){var t="ko_KR",i={reservationId_prefix:"\uc608\uc57d\ubc88\ud638",passenger:"\uc2b9\uac1d\uc774\ub984",flightSummary:"\uc5ec\uc815",flightExit:/.*\uc5ec\uc815/,flightCurrency:/\ucd1d \uc9c0\ubd88 \uae08\uc561/,oneFlight:/(.*)\s+(\d+\/\d+)\(.*\)\s*(\d+\:\d+).*/};return loadHelper("jinair.com-confirmation-skeleton.js")(e,t,i)}},"SG927293f7")]);