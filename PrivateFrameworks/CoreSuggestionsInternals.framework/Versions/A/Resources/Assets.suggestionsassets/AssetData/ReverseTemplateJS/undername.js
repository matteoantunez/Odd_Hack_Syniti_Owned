(function(){return function(e,r,n){for(var t,a=loadHelper("clear_if_contains_tags.js"),i=0;i<r.underName.length&&(!t||!t.exists());i++)t=n.getSpan().innerCapture(r.underName[i],1).trim();if(!t.exists()&&void 0!==e){var c=e.match(/(.+?)<.+>/);t=(c=(c=c?c[1]:e).replace(/"/g,"")).trim()}return a(n,t)}}).call();