(function(){return function(r,e,t,i){var a=[],n=i.scanner_;n.getSpan().allDates().forEach(function(r){var e=unSpanDate_(r);if(e.indexOf("T")>-1){var t=e.split("T")[1];a.push(t)}});var d=250;i.previous(new RegExp("[\\s\\S]{0,"+d+"}")).toString(),i.next(new RegExp("[\\s\\S]{0,"+d+"}")).toString();var o=[];n.getSpan().withInterval(i.getStart()-400,i.getEnd()+400).allDates().forEach(function(r){var e=unSpanDate_(r);if(e.indexOf("T")>-1){var t=e.split("T")[1];o.push(t)}}),r.forEach(function(d,c){d.departurePublishedTime.split("T")[0]===e&&(r[c].candidateScore+=1),a.forEach(function(e){e&&(d.departurePublishedTime.indexOf(e)>-1||d.arrivalPublishedTime.indexOf(e)>-1)&&(r[c].candidateScore+=3)}),a.forEach(function(e){var t=int(e.split(":")[0]),i=e.replace(/^(\d{2})/,t<12?t+12:t);e&&t<12&&(d.departurePublishedTime.indexOf(i)>-1||d.arrivalPublishedTime.indexOf(i)>-1)&&(r[c].requiredCandidateScore+=2,r[c].candidateScore+=2)});var p=new RegExp(regExpFormatted(/\1[\s\S]{0,400}\2/,d.departureAirport.code,d.arrivalAirport.code)),u=n.getSpan().withInterval(i.getStart()-650,i.getEnd()+650),l=u.toString().match(/[\s\(]([A-Z]{3})[\s\)]/g),f=u.next(p).exists();if(l&&l.forEach(function(e){var t=e.match(/[A-Z]{3}/)[0];t!==d.arrivalAirport.code&&t!==d.departureAirport.code||!f||(r[c].requiredCandidateScore+=1.1,r[c].candidateScore+=1.1)}),t.forEach(function(e){e.departureAirport.code===d.arrivalAirport.code&&f&&(r[c].requiredCandidateScore+=1,r[c].candidateScore+=1),e.arrivalAirport.code===d.departureAirport.code&&f&&(r[c].requiredCandidateScore+=1,r[c].candidateScore+=1)}),o.forEach(function(e){e&&(d.departurePublishedTime.indexOf(e)>-1||d.arrivalPublishedTime.indexOf(e)>-1)&&(r[c].candidateScore+=1,r[c].requiredCandidateScore+=1)}),d.departureAirport.name&&d.arrivalAirport.name){var s="(?:",S=/[^A-Za-z\xc0-\xff']/,v=function(r){return!/airport|international|intl?/i.test(r)},h=function(r,e,t){s+=r,e!==t.length-1&&(s+="|")};d.departureAirport.name.split(S).filter(v).forEach(h),s+=")[\\s\\S]{0,400}(?:",d.arrivalAirport.name.split(S).filter(v).forEach(h),s+=")";var A=new RegExp(s);u.toString().match(A)&&(r[c].requiredCandidateScore+=.5,r[c].candidateScore+=.5)}d.arrivalAirport.district||"New York"!=d.arrivalAirport.city||(d.arrivalAirport.district="NYC");var g=new RegExp(regExpFormatted(/(?:\1|\2)[\s\S]{0,400}(?:\3|\4)/i,d.departureAirport.city,d.departureAirport.district,d.arrivalAirport.city,d.arrivalAirport.district));if(u.toString().match(g)&&(r[c].requiredCandidateScore+=.5,r[c].candidateScore+=.5),t&&t.length>=1){var m=t[t.length-1];m.arrivalAirport.code===d.departureAirport.code&&(r[c].candidateScore+=1.5),m.arrivalAirport.city===d.departureAirport.city&&(r[c].candidateScore+=1),m.arrivalAirport.state===d.departureAirport.state&&(r[c].candidateScore+=.5)}a.forEach(function(e){var t=e.split(":"),i=60*int(t[0])+int(t[1]),a=d.departurePublishedTime.split("T")[1].split(":"),n=60*int(a[0])+int(a[1]);e&&Math.abs(i-n)<=5&&(r[c].candidateScore+=.25)})});var c=(r=r.sort(function(r,e){return e.candidateScore-r.candidateScore}))[0].flightInformationIndex;return r=r.filter(function(r){return r.flightInformationIndex===c})}}).call();