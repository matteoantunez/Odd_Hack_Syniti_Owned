(function(){return function(e,t,n){if(!e||!t||!n)return CONTINUE;var a,r,i,c,s,d,g,o,l,p,h,D,u=Scanner.fromMessage(e);u.setLocale(t),""===(a=u.getSpan().nextText(n.reservedFor).nextAnyTag("td").tagContents()).toString()&&(a=a.nextAnyTag("td").tagContents()),a=a.innerCapture(/(.*)\s+\d/,1).trim(),r=(i=u.getSpan().innerCapture(regExpFormatted(/\s\1 (\d+)/,n.reservationId),1)).parentAnyTag("table");var S,m=u.getSpan().next(n.check).parentAnyTag("table");do{if(""!==(S=m.allInnerTagsFiltered("td5")[0])&&S!==undefined){p=S;break}m=m.previousAnyTag("table")}while(m.exists());if(valid(r)){var v=r.getTagNumber();if((r=r.allInnerTagsFiltered("td"+v)).length>=2)if(g=u.getDateDD(r[1].innerDate()),valid(g)&&"fr_FR"!==t)l=u.getDetachedSpan(g.endIso8601),o=u.getDetachedSpan(g.iso8601);else if(r[1].innerText("/").exists()){var T,k,x=r[1].innerCapture(/($<checkInDate>\d{4}\/\w+\/\d+).+($<checkOutDate>\d{4}\/\w+\/\d+)/);x&&x.$checkInDate&&x.$checkOutDate?((T=x.$checkInDate.toString().split("/")).length>=3&&(o=u.getDetachedSpan(T[1]+"/"+T[2]+"/"+T[3]).innerDate()),(k=x.$checkOutDate.toString().split("/")).length>=3&&(l=u.getDetachedSpan(k[1]+"/"+k[2]+"/"+k[3]).innerDate())):(x=r[1].innerCapture(/($<checkInDate>\d+\/\w+\/\d{4}).+($<checkOutDate>\d+\/\w+\/\d{4})/))&&x.$checkInDate&&x.$checkOutDate&&(o=u.getDetachedSpan(x.$checkInDate.toString().replace("/"," ")).innerDate(),l=u.getDetachedSpan(x.$checkOutDate.toString().replace("/"," ")).innerDate())}else{var f=r[1].toString().replace(/\,/g,"").split("-");o=u.getDetachedSpan(f[0]).innerDate(),l=u.getDetachedSpan(f[1]).innerDate()}}if("ja_JP"===t){for(var $=u.getSpan().next("\u30db\u30c6\u30eb\u306e\u8a73\u7d30\u3092\u8868\u793a\u3059\u308b"),A=$.allInnerAbsoluteDates();!$.isNullSpan_&&0===A.length;)A=($=$.previousAnyTag("td")).allInnerAbsoluteDates();var C=A[0].innerCapture(/($<first>[\d\,\-\\\/ ]+)\s-\s($<second>[\d\,\-\\\/ ]+)/);l=C?C.$second:null,o=C?C.$first:null}D=(r=u.getSpan().next(n.hotelDetails).parentAnyTag("td").tagContents()).innerCapture(regExpFormatted(/\1.*?>\s+(.*?)[<|\n]/,n.hotelDetails),1).trim(),r.innerAddress().getLength()>=D.getLength()&&(D=r.innerAddress()),h=r.innerCapture(regExpFormatted(/\b\1 ([-\d\(\) ]+),/,n.telephone),1),d=(d=u.getSpan().next(n.checkin).next(n.checkinTime).parentAnyTag("td").innerCapture(regExpFormatted(/(\1\s*.*)/,n.checkinTime),1)).innerDate().exists()?d.innerDate():d,valid(o,d)&&(o=combineDateAndTime(o,d));var I="Confirmed";return n.cancelled.test(e.plain)&&(I="Cancelled"),e.to,ASSERT(D,o)?[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:a},checkinTime:o,checkoutTime:l,modifyReservationUrl:c,cancelReservationUrl:s,reservationStatus:"http://schema.org/Reservation"+I,reservationId:i,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:p,telephone:h,address:D}}]:void 0}}).call();