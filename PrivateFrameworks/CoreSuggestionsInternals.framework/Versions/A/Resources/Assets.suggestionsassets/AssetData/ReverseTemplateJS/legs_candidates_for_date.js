(function(){return function(r,e){var a=[],i=e.split("T")[0];return r.forEach(function(r,e){r.legs.forEach(function(o){var t=o.departurePublishedTime.split("T")[0];t!==i&&(new Date(t)-new Date(i))/1e3/3600/24!=1||(o.candidateScore=1,o.requiredCandidateScore=0,o.flightInformationIndex=e,o.flightNumber=r.flightNumber,o.carrierCode=r.carrierCode,o.carrierName=r.carrierName,o.carrierPhoneNumber=r.carrierPhoneNumber,o.operatorCarrierCode=r.operatorCarrierCode,o.operatorFlightNumber=r.operatorFlightNumber,a.push(o))})}),a&&a.length>=1?a:[]}}).call();