new ReverseTemplateList([new ReverseTemplate("lufthansa.com-confirmation-de",function(e){return/Reise-Informationen f\xfcr Ihren Lufthansa Flug/.test(e.subject)},function(e){var n={},t="de_DE";return n.reservationId=/BUCHUNGSCODE/,n.service=/Mein Service/,loadHelper("lufthansa.com-confirmation-alt.js")(e,t,n)},"SG02ed261e")]);