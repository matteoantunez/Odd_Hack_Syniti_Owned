(function(){function e(e,t,n,o){this.IATA=e,this.ICAO=t,this.names=n,this.domains=o}return e.prototype.equals=function(e){return this.IATA===e.IATA&&this.ICAO===e.ICAO},e.prototype.matchesReference=function(e){return e=e.toLowerCase(),this.IATA.toLowerCase()===e||this.ICAO.toLowerCase()===e||this.names.some(function(t){return t.toLowerCase()===e})||this.domains&&this.domains.some(function(t){return t.toLowerCase()===e})},e.airlineFromReference=function(t,n){var o;return(n||loadHelper("airlines.js")).some(function(n){if((n=new e(n.IATA,n.ICAO,n.names,n.domains)).matchesReference(t))return o=n,!0}),o},e}).call();