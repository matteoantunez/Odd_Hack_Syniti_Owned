(function(){return function(e,t,r,a){var n,i;if(a&&e.seatTablePrefix){var s=loadHelper("tableextractor.js");for(i=0;i<e.seatTablePrefix.length&&(!n||!n.exists());i++){var l=e.seatTablePrefix[i];n=s(l.prefix,t,l.innerCapture)}return n}for(i=0;i<e.seat.length&&(!n||!n.exists());i++)n=t.getSpan().innerCapture(e.seat[i],1);if(r&&r.exists()){var f=e.buildRegExp("seatFromSeatRow",r.toString());for(i=0;i<f.length&&(!n||!n.exists());i++)n=t.getSpan().innerCapture(f[i],1)}return n.trim()}}).call();