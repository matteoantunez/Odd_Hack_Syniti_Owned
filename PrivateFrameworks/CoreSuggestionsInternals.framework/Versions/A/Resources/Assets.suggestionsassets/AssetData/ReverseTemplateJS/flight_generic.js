(function(){return function(e,r,l,t,a,i){if(!isSplashScreenAcknowledged()&&!fromSuggestTool)return CONTINUE;e.html=e.html.replace(/<td.+?:line-through.+?<\/td/g,""),e.plain=e.plain.replace(/[\uff0f\uff1a]/g," ");var n=loadHelper("generic_common.js")(e,"flight");if(!n||n===STOP)return STOP;var o=n[0],f=(a=n[1],t=n[2],[]);if(!l){if(!(l=loadHelper("flight_references.js")(a,t,e))||0===l.length||l.length>=20)return CONTINUE;if(!(l=loadHelper("flight_dates.js")(l))||0===l.length)return CONTINUE}var g=!1;return l.forEach(function(r){var l=loadHelper("legs_for_flight_information.js")(r,f,e.senderDomain,a);if(l){var t=f[f.length-1],i=l[0];t&&i&&t.arrivalActualTime>i.departureActualTime&&(r.departureDate=modifyDate(r.departureDate,1),l=loadHelper("legs_for_flight_information.js")(r,f,e.senderDomain,a)),f=f.concat(l)}else g=!0}),g?CONTINUE:(ASSERT({sg_validate:f,sg_description:"flightLegs"}),i||(i=loadHelper("get_flight_reservation_id.js")(t,e,a,l)),loadHelper("schemas_for_legs.js")(f,i,o,e.documentType))}}).call();