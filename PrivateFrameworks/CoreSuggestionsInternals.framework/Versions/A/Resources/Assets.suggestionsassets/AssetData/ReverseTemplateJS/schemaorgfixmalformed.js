(function(){return function(e,t,r){var a,o=loadHelper("helper_vocabulary.js");if(/booking\.lufthansa.com/.test(t.from)&&e.reservationFor.departureTime&&!/\d{4}-\d{2}-\d{2}/.test(e.reservationFor.departureTime))return CONTINUE;if(/lufthansa.com/.test(t.from)&&e.reservationFor.boardingTime&&e.reservationFor.departureTime&&/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\+\d{2}:\d{2}/.exec(e.reservationFor.boardingTime)&&/\d{4}-\d{2}-\d{2}/.exec(e.reservationFor.departureTime)&&(e.reservationFor.departureTime=e.reservationFor.boardingTime),/mail\.volotea\.com/i.test(t.from)&&Array.isArray(e.potentialAction)&&(e.potentialAction=null),/lastminute.com/.test(t.from)&&Array.isArray(e.reservationFor))return CONTINUE;if(/easyjet.com/.test(t.from)&&e.reservationFor){var n=e.reservationFor.airline.iataCode;if(3===n.length){var i=loadHelper("airline.js"),s=loadHelper("airlines.js");e.reservationFor.airline.iataCode=i.airlineFromReference(n,s).IATA}}if(/atrapalo.com/.test(t.from)&&(/\//.test(e.checkinDate)||/\//.test(e.checkoutDate))&&((R=Scanner.fromMessage(t)).setLocale(r),e.checkinDate=unSpanDate_(R.getDetachedSpan(e.checkinDate).innerDate()),e.checkoutDate=unSpanDate_(R.getDetachedSpan(e.checkoutDate).innerDate())),/hotel\.de/.test(t.from)&&e.reservationFor&&e.lodgingUnitType&&e.lodgingUnitType instanceof Array&&(e.lodgingUnitType=null),/vueling.com/.test(t.from)&&!e.reservationFor)return CONTINUE;if(/govoyages.com/.test(t.from)&&!e.reservationFor)return CONTINUE;if(/noti.swiss.com/.test(t.from)&&(e.potentialAction&&delete e.potentialAction,e.reservationFor&&e.reservationFor.departureTime&&(e.reservationFor.departureTime=/^\d{4}-\d{2}-\d{2}T\d{1,2}\:\d{2}$/.test(e.reservationFor.departureTime)?e.reservationFor.departureTime.concat(":00"):e.reservationFor.departureTime),/Cancellation Confirmation|Confirmaci\xf3n de cancelaci\xf3n/.test(t.subject)&&(delete e.reservationFor.arrivalTime,e.reservationStatus="http://schema.org/ReservationCancelled")),/hopper.com/.test(t.from)&&e.reservationFor&&((R=Scanner.fromMessage(t)).setLocale(r),e.checkinDate&&e.checkoutDate&&(e.checkinDate=unSpanDate_(R.getDetachedSpan(e.checkinDate).innerDate()),e.checkoutDate=unSpanDate_(R.getDetachedSpan(e.checkoutDate).innerDate())),e.reservationNumber&&e.reservationNumber instanceof Array&&(e.reservationNumber=e.reservationNumber[0])),/notifications\.swiss\.com/i.test(t.from)&&Array.isArray(e.potentialAction)&&(e.potentialAction=null),/hrs\.de/.test(t.from)&&"de_DE"===r){if((R=Scanner.fromMessage(t)).setLocale(r),/^T\d+/.exec(e.checkinDate)){var d=R.getSpan().next(/Anreise \/ Abreise/).nextDate();if(d&&/-/.exec(d)){var c=unSpanDate_(d.split(/-/)[0]),m=unSpanDate_(d.split(/-/)[1]);e.checkinDate=unSpanDate_(R.getDetachedSpan(c).innerDate()),e.checkoutDate=unSpanDate_(R.getDetachedSpan(m).innerDate())}}if(/\d+T00.+/.exec(e.checkinDate)){var l=R.getSpan().next(/Fr\xfchester Check-In/).nextDate();e.checkinDate=combineDateAndTime(e.checkinDate,l)}}if(/ryanair.com/.test(t.from)&&((R=Scanner.fromMessage(t)).setLocale(r),!e.reservationFor.arrivalAirport.iataCode.length)){var p=new RegExp("\\("+e.reservationFor.departureAirport.iataCode+"\\) - \\(([A-Z]{3})\\)"),f=R.getSpan().next(p).innerCapture(p,1);e.reservationFor.arrivalAirport.iataCode=f}if(/edreams\.\w{2}/.test(t.from)&&!e.reservationFor)return CONTINUE;if(/koreanair.co.kr/.test(t.from)&&Array.isArray(e.reservationFor.departureTime))return CONTINUE;if(/flyasiana.com/.test(t.from)&&/\/.+?\//.test(e.reservationFor))return CONTINUE;if(/aircanada.ca/.test(t.from)&&/\+00:00/.test(e.reservationFor.departureTime))return CONTINUE;if(/edreams.it/i.test(t.from)&&!e.reservationFor)return CONTINUE;if(/stubhub.com/i.test(t.from)){if(!e.reservationNumber||""===e.reservationNumber)return CONTINUE;e.venueSeat&&Array.isArray(e.venueSeat)&&(e.venueSeat=e.venueSeat.join(","))}(/seatme\.yelp\.com/i.test(t.from)&&(e.startTime=/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|[-\+]\d{2}))$/.test(e.startTime)?e.startTime.concat(":00"):e.startTime,delete e.modifiedTime),/ugcmailing.fr/i.test(t.from)&&(e.reservationFor.name&&(e.reservationFor.movie={name:e.reservationFor.name,"@type":"http://schema.org/Movie"},delete e.reservationFor.name),e.reservationFor["@type"]&&"http://schema.org/Event"===e.reservationFor["@type"]&&(e.reservationFor["@type"]="http://schema.org/MovieShowing"),(R=Scanner.fromMessage(t)).setLocale("fr_FR"),e.reservationFor.startDate&&/\d{1,2}\/\d{1,2}\/\d{4}\s\xe0\s\d{1,2}\:\d{2}/.test(R.getSpan().firstDate())&&(e.reservationFor.startDate=combineDateAndTime(R.getSpan().firstDate()))),/universe\.com/i.test(t.from))&&((u=e.modifiedTime&&/\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}\:\d{2}\s\w+/.test(e.modifiedTime)?/(\d{4}\-\d{2}\-\d{2})\s(\d{2}\:\d{2}\:\d{2})\s(\w+)/.exec(e.modifiedTime):null)[3]="UTC"===u[3]?"Z":u[3],e.modifiedTime=u?u[1].concat("T",u[2],u[3]):e.modifiedTime);if(/no-reply\@misiedo\.com/.test(t.from)){var u=/\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}\:\d{2}\s\+\d+/.test(e.startTime)?/(\d{4}\-\d{2}\-\d{2})\s(\d{2}\:\d{2}\:\d{2}\s\+\d+)/.exec(e.startTime):null;e.startTime=u?u[1].concat("T",u[2]):e.startTime}if(/ticketea\.com/i.test(t.from)){if(e.modifiedTime){u=/\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}\:\d{2}/.test(e.modifiedTime)?/(\d{4}\-\d{2}\-\d{2})\s(\d{2}\:\d{2}\:\d{2})/.exec(e.modifiedTime):null;e.modifiedTime=u?u[1].concat("T",u[2]):e.modifiedTime}e.price=!1===/,/.test(e.price)&&"EUR"===e.priceCurrency?null:e.price,e.priceCurrency=null===e.price?null:e.priceCurrency}if(/tiqets\.com/i.test(t.from)){if(e.modifiedTime){u=/\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}\:\d{2}(?:\.\d+)?/.test(e.modifiedTime)?/(\d{4}\-\d{2}\-\d{2})\s(\d{2}\:\d{2}\:\d{2}(?:\.\d+)?)/.exec(e.modifiedTime):null;e.modifiedTime=u?u[1].concat("T",u[2]):e.modifiedTime}if(e.bookingTime)u=/\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}\:\d{2}(?:\.\d+)?/.test(e.bookingTime)?delete e.bookingTime:null}if(/getyourguide\.com/.test(t.from)&&e.reservationFor&&!e.reservationFor.location){if(!e.reservationFor.startDate)(R=Scanner.fromMessage(t)).setLocale(r),e.reservationFor.startDate=R.getDetachedSpan(t.plain.replace(/\./g,"/")).firstDate();var v="ko_KR"===r?/\ubaa8\uc784 \uc7a5\uc18c \uc8fc\uc18c/:"zh_Hans_CN"===r?/(?:\u96c6\u5408\u9ede\u5730\u5740|\u96c6\u5408\u70b9\u5730\u5740)/:"ja_JP"===r?/\u96c6\u5408\u5834\u6240\u306e\u4f4f\u6240/:"en_US"===r?/Meeting point address/:"nl_NL"===r?/Adres trefpunt/:"es_ES"===r?/Direcci\xf3n del punto de encuentro/:"it_IT"===r?/Indirizzo del punto d'incontro/:"fr_FR"===r?/Adresse du point de rencontre/:"de_DE"===r?/Adresse des Treffpunktes/:null,g="ko_KR"===r?/\uc138\ubd80 \uc815\ubcf4/:"zh_Hans_CN"===r?/(?:\u8a73\u60c5|\u8be6\u60c5)/:"ja_JP"===r?/\u8a73\u7d30/:"en_US"===r?/Details/:"nl_NL"===r?/Gegevens/:"es_ES"===r?/Detalles/:"it_IT"===r?/Dettagli/:"fr_FR"===r?/D\xe9tails/:"de_DE"===r?/Details/:null,T=regExpFormatted(/\1\2?(\3)\4\5/i,v,o.monochrome.tablePassLight,o.common.nonCJKWithSpecialCharsGreedy,o.monochrome.tablePassLightLink,g).test(t.plain)?regExpFormatted(/\1\2?(\3)\4\5/i,v,o.monochrome.tablePassLight,o.common.nonCJKWithSpecialCharsGreedy,o.monochrome.tablePassLightLink,g).exec(t.plain):null;e.reservationFor.address=T&&T[1]?T[1]:null}if(/entradas.com/i.test(t.from)){e.reservationFor.location&&"MovieTheater"===e.reservationFor.location["@type"]&&(e.reservationFor.location["@type"]="Place"),delete e.bookingTime;u=/\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}\:\d{2}/.test(e.reservationFor.startDate)?/(\d{4}\-\d{2}\-\d{2})\s(\d{2}\:\d{2}\:\d{2})/.exec(e.reservationFor.startDate):null;if(e.reservationFor.startDate=u?u[1].concat("T",u[2]):e.reservationFor.startDate,!1===/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|[-\+]\d{2}:?\d{2})?)?$/.test(e.reservationFor.startDate))(R=Scanner.fromMessage(t)).setLocale(r),e.reservationFor.startDate=e.reservationFor.startDate&&t.plain?R.getDetachedSpan(t.plain.replace(/\/\//," ")).firstDate():e.reservationFor.startDate;e.reservationFor.name=e.reservationFor.name?e.reservationFor.name.replace(/\|/g,","):null,e.reservedTicket&&(e.reservedTicket.ticketedSeat=e.reservedTicket.ticketedSeat?e.reservedTicket.ticketedSeat.replace(/\|/g,"/"):null),e.price=!0===/\d{1,}\.\d{3,}/.test(e.price)?/(\d{1,}\.\d{2})/.exec(e.price)[1]:e.price}if(/reservations.rentalcars.com/i.test(t.from)&&(R=Scanner.fromMessage(t),/^\{.+\}$/.test(e.dropoffLocation.name)||/^\{.+\}$/.test(e.pickupLocation.name)))return CONTINUE;if(/customerservice\@ticketone\.it/.test(t.from)&&e.reservationFor.startDate&&/\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}\:\d{2}/.test(e.reservationFor.startDate)){u=/(\d{4}\-\d{2}\-\d{2})\s(\d{2}\:\d{2}\:\d{2})/.exec(e.reservationFor.startDate);e.reservationFor.startDate=u[1].concat("T",u[2])}if(/noreply@despegar.com/i.test(t.from)||/VentasMX@despegar.com/i.test(t.from)){(R=Scanner.fromMessage(t)).setLocale("es_ES");l=R.getSpan().next(/Entrada/).nextDate();var h=R.getSpan().next(/Salida/).nextDate();e.checkinDate=unSpanDate_(l),e.checkoutDate=unSpanDate_(h)}if(/hotel@trans.priceline.com/i.test(t.from)){(R=Scanner.fromMessage(t)).setLocale("en_US");var D=R.getSpan().next(/Check-in/i).nextDate().parentAnyTag("td").innerCapture(/(\d{2}:\d{2} [AP]M)/,1),F=R.getSpan().next(/Check-out/i).nextDate().parentAnyTag("td").innerCapture(/(\d{2}:\d{2} [AP]M)/,1);e.checkinDate=combineDateAndTime(e.checkinDate,D),e.checkoutDate=combineDateAndTime(e.checkoutDate,F),e.modifiedTime=null}if(/booking@singaporeair\.com\.sg/i.test(t.from)&&/^cancell?ation/i.test(t.subject)&&(e.reservationStatus="http://schema.org/Cancelled"),/documents@yourbooking\.qantas\.com\.au/i.test(t.from)&&((R=Scanner.fromMessage(t)).setLocale("en_US"),e.reservationFor&&(/\+/.test(e.reservationFor.departureTime)||/\+/.test(e.reservationFor.arrivalTime))&&(e.reservationFor.departureTime=R.getDetachedSpan(/(.+?)T/.exec(e.reservationFor.departureTime)[1]+" "+/T(.+?)[+-]/.exec(e.reservationFor.departureTime)[1]).innerDate(),e.reservationFor.arrivalTime=R.getDetachedSpan(/(.+?)T/.exec(e.reservationFor.arrivalTime)[1]+" "+/T(.+?)[+-]/.exec(e.reservationFor.arrivalTime)[1]).innerDate()),e.reservationFor&&e.reservationFor.flightNumber&&(e.reservationFor.flightNumber.length>4&&(e.reservationFor.iataCode=/([A-Z\d]{2})/.exec(e.reservationFor.flightNumber)[1]),e.reservationFor.flightNumber=/([\d]+)/.exec(e.reservationFor.flightNumber)[1])),/(?:notification|contact)@thefork\.com/i.test(t.from)&&((R=Scanner.fromMessage(t)).setLocale("en_US"),e.startTime&&(e.startTime=R.getSpan().firstDate())),/(?:contatto|notification)@thefork\.it/i.test(t.from)&&((R=Scanner.fromMessage(t)).setLocale("it_IT"),e.startTime&&(e.startTime=R.getSpan().firstDate()),e.reservationFor.telephone=R.getSpan().next("Ristorante").nextTag("td6").nextTag("td6").innerPhoneNumber()),/reservas@restaurantes\.com/i.test(t.from)){if(e.reservationFor.telephone=/\+\d{2}\+\d{2}/.test(e.reservationFor.telephone)?e.reservationFor.telephone.substring(3):e.reservationFor.telephone,""===e.startTime){(R=Scanner.fromMessage(t)).setLocale("es_ES");var S=R.getSpan().allDates();e.startTime=combineDateAndTime(S[0],S[1])}e.reservationFor["@type"]="http://schema.org/FoodEstablishment"}if(/reserveringen@email\.couverts\.nl/i.test(t.from)&&""===e.startTime.split(/T/)[0]){(R=Scanner.fromMessage(t)).setLocale("nl_NL");S=R.getSpan().allDates();e.startTime=combineDateAndTime(S[0],S[1])}if(/bordkarte@lufthansa.com/i.test(t.from)){(R=Scanner.fromMessage(t)).setLocale("de_DE");var x=R.getSpan().next(/Flugdetails/i).nextTag("td4").nextTag("td4").innerCapture(/(\d{1,2}:\d{1,2})/,1);e.reservationFor.departureTime=combineDateAndTime(e.reservationFor.departureTime,x)}if(/cheapoair@cheapoair\.com/i.test(t.from)&&e.reservationFor&&"0000000000"===e.reservationFor.telephone&&delete e.reservationFor.telephone,/reservations@marriott-res\.com/i.test(t.from)&&e.reservationNumber&&/\d{8,12}/.test(e.reservationNumber)&&(e.reservationNumber=/\d{8,12}/.exec(e.reservationNumber)[0]),/reservations@ac-hotels-res\.com/i.test(t.from)&&e.reservationNumber&&/\d{8,12}/.test(e.reservationNumber)&&(e.reservationNumber=/\d{8,12}/.exec(e.reservationNumber)[0]),/reservations@ritzcarlton-res\.com/i.test(t.from)&&e.reservationNumber&&/\d{8,12}/.test(e.reservationNumber)&&(e.reservationNumber=/\d{8,12}/.exec(e.reservationNumber)[0]),/reservations@fairfieldinn-res\.com/i.test(t.from)&&e.reservationNumber&&/\d{8,12}/.test(e.reservationNumber)&&(e.reservationNumber=/\d{8,12}/.exec(e.reservationNumber)[0]),/reservations@residenceinn-res\.com/i.test(t.from)&&e.reservationNumber&&/\d{8,12}/.test(e.reservationNumber)&&(e.reservationNumber=/\d{8,12}/.exec(e.reservationNumber)[0]),/confirmation@etix\.com/i.test(t.from)&&e.reservationFor.location.address){e.reservationFor.location.address=undefined,(R=Scanner.fromMessage(t)).setLocale(r);var k=loadHelper("vocab.js")(r),b=loadHelper("undername.js")(t.to,k,R),C=loadHelper("name.js")(t.subject,k,R,t).trim(),A=loadHelper("place.js")(k,R,C,t.subject,null,"tickets"),y=loadHelper("address.js")(k,R,t,C,b,A);loadHelper("isVirtual.js")(C,A,y,k,R)&&(e.reservationFor.location={"@type":"http://schema.org/VirtualLocation",url:loadHelper("streamLink.js")(R,k,t)})}if(/ticketmaster\./i.test(t.from)){(R=Scanner.fromMessage(t)).setLocale(r);k=loadHelper("vocab.js")(r);loadHelper("schemaorgFixMalformedVirtual.js")(t,R,k,e)&&(e.reservationFor.location={"@type":"http://schema.org/VirtualLocation",url:loadHelper("streamLink.js")(R,k,t)})}/nextable\.net/.test(t.from)&&(e.modifiedTime=!1===/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|[-\+]\d{2}:?\d{2})?)?$/.test(e.modifiedTime)?null:e.modifiedTime,(R=Scanner.fromMessage(t)).setLocale(r),(a=R.getDetachedSpan(t.plain).allDates())[0]=a?R.getDateDD(a[0]).iso8601:a[0],a[1]=a&&2===a.length?/\d{4}\-\d{2}\-\d{2}(T\d{2}\:\d{2}\:\d{2})/.exec(R.getDateDD(a[1]).iso8601)[1]:a[1],e.startTime=a&&a[1]?a[0].concat(a[1]):e.startTime);if(/cheapoair@cheapoair\.com/i.test(t.from)&&/Flight(\sBooking)?\sDetails/.test(t.plain)&&(N=(R=Scanner.fromMessage(t)).getSpan().nextText("Airline Confirmation").parentAnyTag("td").innerCapture(/[A-Z0-9]{4,}/),j=null===(L=R.getSpan().nextText("CheapOair Booking:").parentAnyTag("td").innerCapture(/\d{6,}/))?R.getSpan().nextText("Booking #:").nextAnyTag("td").tagContents():L[0],e.reservationFor.departureAirport&&(e.reservationNumber=null!==N?N[0]:j)),/cheapoair@cheapoair\.com/i.test(t.from)&&/Car(\sBooking)?\sDetails/.test(t.plain)&&(N=(R=Scanner.fromMessage(t)).getSpan().nextText("Car Confirmation").parentAnyTag("td").innerCapture(/[A-Z0-9]{4,}/),j=null===(L=R.getSpan().nextText("CheapOair Booking:").parentAnyTag("td").innerCapture(/\d{6,}/))?R.getSpan().nextText("Booking #:").nextAnyTag("td").tagContents():L[0],e.pickupLocation&&(e.reservationNumber=null!==N?N[0]:j)),/cheapoair@cheapoair\.com/i.test(t.from)&&/Hotel(\sBooking)?\sDetails/.test(t.plain)&&(null===(N=(R=Scanner.fromMessage(t)).getSpan().nextText("Check-In Confirmation").parentAnyTag("td").innerCapture(/[A-Z0-9-]{6,}/))&&(N=R.getSpan().nextText("Hotel Confirmation").parentAnyTag("td").innerCapture(/[A-Z0-9-]{6,}/)),j=null===(L=R.getSpan().nextText("CheapOair Booking:").parentAnyTag("td").innerCapture(/\d{6,}/))?R.getSpan().nextText("Booking #:").nextAnyTag("td").tagContents():L[0],e.checkinDate&&(e.reservationNumber=null!==N?N[0]:j)),/cheapoair@cheapoair\.com/i.test(t.from)&&/Flight(\sBooking)?\sDetails/.test(t.plain)){var N=(R=Scanner.fromMessage(t)).getSpan().nextText("Airline Confirmation").parentAnyTag("td").innerCapture(/[A-Z0-9]{4,}/),j=null===(L=R.getSpan().nextText("CheapOair Booking:").parentAnyTag("td").innerCapture(/\d{6,}/))?R.getSpan().nextText("Booking #:").nextAnyTag("td").tagContents():L[0];e.reservationFor.departureAirport&&(e.reservationNumber=null!==N?N[0]:j)}if(/cheapoair@cheapoair\.com/i.test(t.from)&&/Car(\sBooking)?\sDetails/.test(t.plain)){N=(R=Scanner.fromMessage(t)).getSpan().nextText("Car Confirmation").parentAnyTag("td").innerCapture(/[A-Z0-9]{4,}/),j=null===(L=R.getSpan().nextText("CheapOair Booking:").parentAnyTag("td").innerCapture(/\d{6,}/))?R.getSpan().nextText("Booking #:").nextAnyTag("td").tagContents():L[0];e.pickupLocation&&(e.reservationNumber=null!==N?N[0]:j)}if(/cheapoair@cheapoair\.com/i.test(t.from)&&/Hotel(\sBooking)?\sDetails/.test(t.plain)){null===(N=(R=Scanner.fromMessage(t)).getSpan().nextText("Check-In Confirmation").parentAnyTag("td").innerCapture(/[A-Z0-9-]{6,}/))&&(N=R.getSpan().nextText("Hotel Confirmation").parentAnyTag("td").innerCapture(/[A-Z0-9-]{6,}/));j=null===(L=R.getSpan().nextText("CheapOair Booking:").parentAnyTag("td").innerCapture(/\d{6,}/))?R.getSpan().nextText("Booking #:").nextAnyTag("td").tagContents():L[0];e.checkinDate&&(e.reservationNumber=null!==N?N[0]:j)}if(/cheapoair@cheapoair\.com/i.test(t.from)&&/Detalles de reserva del vuelo/.test(t.plain)){var L;N=(R=Scanner.fromMessage(t)).getSpan().nextText("Confirmaci\xf3n de la aerol\xednea:").parentAnyTag("td").innerCapture(/[A-Z0-9]{4,}/),j=null===(L=R.getSpan().nextText("N\xfamero de reserva").parentAnyTag("td").innerCapture(/\d{6,}/))?R.getSpan().nextText("Reservaci\xf3n #:").nextAnyTag("td").tagContents():L[0];e.reservationFor.departureAirport&&(e.reservationNumber=null!==N?N[0]:j)}if(/cheapoair@cheapoair\.com/i.test(t.from)&&e.modifiedTime&&(e.modifiedTime=""),/roomservice@hotel\.com\.au/i.test(t.from)&&!e.checkinDate)return CONTINUE;if(/customer\.service@booking\.com/i.test(t.from)&&!e.checkinDate)return CONTINUE;if(/noreply\.hotels@opodo.(?:com|fr|it|de|nl|co\.uk)/i.test(t.from)&&!e.checkinDate)return CONTINUE;if(/orders@eventbrite\.com/i.test(t.from)&&(e.reservationFor&&e.reservationFor.name&&(e.reservationFor.name=e.reservationFor.name.replace(/&#39;/,"'")),e.reservationFor.location&&(e.reservationFor.location.name=e.reservationFor&&e.reservationFor.location&&e.reservationFor.location.name&&/\s\|\s/.test(e.reservationFor.location.name)?e.reservationFor.location.name.replace(/\s\|\s/g," / "):e.reservationFor.location.name,e.reservationFor.location.address.streetAddress=e.reservationFor&&e.reservationFor.location&&e.reservationFor.location.address&&e.reservationFor.location.address.streetAddress&&/\s\|\s/.test(e.reservationFor.location.address.streetAddress)?e.reservationFor.location.address.streetAddress.replace(/\s\|\s/g," / "):e.reservationFor.location.address.streetAddress)),/order\.eventbrite\.com/i.test(t.from)){(R=Scanner.fromMessage(t)).setLocale(r);k=loadHelper("vocab.js")(r);loadHelper("schemaorgFixMalformedVirtual.js")(t,R,k,e)&&(e.reservationFor.location={"@type":"http://schema.org/VirtualLocation",url:loadHelper("streamLink.js")(R,k,t)})}if(/goldstar.com/i.test(t.from)){if(k=loadHelper("vocab.js")(r),(R=Scanner.fromMessage(t)).setLocale(r),loadHelper("bail.js")(k,R))return CONTINUE;if(e.reservationFor.name&&e.reservationFor.startDate){var H=new Date(e.reservationFor.startDate),M=(S=R.getSpan().allAbsoluteDates()).some(function(e){return H.isSameDay(new Date(e.toString()))});if(S.length>0&&!M)return CONTINUE}}if(/donotreply@showclix.com/.test(t.from)){e.reservationFor&&e.reservationFor.offers&&delete e.reservationFor.offers,(R=Scanner.fromMessage(t)).setLocale(r);k=loadHelper("vocab.js")(r),C=loadHelper("name.js")(t.subject,k,R,t).trim(),A=loadHelper("place.js")(k,R,C,t.subject,null,"tickets"),y=loadHelper("address.js")(k,R,t,C,null,A);loadHelper("isVirtual.js")(C,A,y,k,R)&&(e.reservationFor.location={"@type":"http://schema.org/VirtualLocation",url:loadHelper("streamLink.js")(R,k,t)})}if(/comunicacaovoegol\@voegol\.com\.br/i.test(t.from)&&e&&e.modifiedTime&&delete e.modifiedTime,/fnactickets\.com/i.test(t.from)){delete e.bookingDate;var _=e&&e.reservationFor&&e.reservationFor.startDate&&/(\d{4}\-)(\d{1,2})(\-\d{2}T\d{2}\:\d{2}\:\d{2}\+)\d(\d{2}\:\d{2})/.test(e.reservationFor.startDate)?/(\d{4}\-)(\d{1,2})(\-\d{2})(T\d{2}\:\d{2}\:\d{2}\+)\d(\d{2}\:\d{2})/.exec(e.reservationFor.startDate):null;_&&(_[2]=/^\d{1}$/.test(_[2])?"0".concat(_[2]):_[2],_[3]=/^-\d{1}$/.test(_[3])?"0".concat(_[3]):_[3],e.reservationFor.startDate=_[1].concat(_[2],_[3],_[4],_[5]))}if(/confirmation\@fnacspectacles\.com|serviceclients@fnacspectacles.com/i.test(t.from)){if(e.reservationFor&&e.reservationFor.performer&&e.reservationFor.performer.name&&Array.isArray(e.reservationFor.performer.name)&&(e.reservationFor.performer.name=e.reservationFor.performer.name.join(", ")),e.bookingDate)u=/\d{4}\-\d{1}\-\d{1,2}T\d{2}\:\d{2}\:\d{2}\+\d{2,3}\:\d{2}/.test(e.bookingDate)?delete e.bookingDate:null;if(e.reservationFor.startDate)(u=/\d{4}\-\d{1}\-\d{1,2}T\d{2}\:\d{2}\:\d{2}\+\d{2,3}\:\d{2}/.test(e.reservationFor.startDate)?/(\d{4})\-(\d{1})\-(\d{1,2})(T\d{2}\:\d{2}\:\d{2})\+(\d{2,3})(\:\d{2})/.exec(e.reservationFor.startDate):null)&&(u[2]=1===u[2].length?"0".concat(u[2]):u[2],u[3]=1===u[3].length?"0".concat(u[3]):u[3],u[5]=2!==u[5].length&&"0"===u[5][0]?u[5][1].concat(u[5][2]):u[5],e.reservationFor.startDate=u[2]&&u[3]&&u[5]?u[1].concat("-",u[2],"-",u[3],u[4],"+",u[5],u[6]):e.reservationFor.startDate)}if(/(?:mail\.hotele?s|email\.carlsonhotels|goibibo|(?:ac-hotels|autographcollectionhotels|courtyard|editionhotels|fairfieldinn|(?:jw)?marriott|renaissancehotels|residenceinn|ritzcarlton|springhillsuites|towneplace|vacationclub)-res)\.com/i.test(t.from)){if((k=loadHelper("vocab.js")(r))&&(null===e.checkinDate||""===e.checkinDate||null===e.checkoutDate||""===e.checkoutDate||/00:00:00/.test(e.checkinDate)||/00:00:00/.test(e.checkoutDate))){var E=loadHelper("schemaorgHotelTimeHelper.js")(t,r);e.checkinDate=E[0],e.checkoutDate=E[1]}e.reservationId&&(e.reservationId=e.reservationId.replace(/.+:\s*(\d+[a-z]{2}\d+|\d+-\d+\/[a-zA-Z\d]+|[\d.]{12,}|[A-Z\d:]{4,}|[A-Z\d-]{6,}|[A-Z\d-\s]{15,}|\d{2,})/,"$1"))}if(/res@laterooms\.com/i.test(t.from)){var U=function(e){var t=/(\d{4}\-\d{2}\-\d{2}T(?:\d{2}:?){3})\.\d+\w?(\+\d+:\d+)?/;if(t.test(e)){var r=e.match(t);return e=e.replace(t,2===r.length?"$1":"$1$2")}};e.checkinDate=U(e.checkinDate),e.checkoutDate=U(e.checkoutDate),e.modifiedTime=null,(R=Scanner.fromMessage(t)).setLocale("en_US");var O=/Check in.{50,90}\[\/td3\]/;if((V=R.getSpan()).next(O).exists()){var I=V.next(O).nextDate(),P=(l=V.next(O).nextAnyTag("td").nextAnyTag("td").innerDate(),combineDateAndTime(I,l));e.checkinDate=P}var Z=/Check out.{50,90}\[\/td3\]/;if(V.next(Z).exists()){var B=V.next(Z).nextDate(),$=(h=V.next(Z).nextAnyTag("td").nextAnyTag("td").innerDate(),combineDateAndTime(B,h));e.checkoutDate=$}}if(/confirmation@trx\.fandangopurchase\.com/.test(t.from)&&/Purchase Confirmation/.test(t.subject)&&!e.reservationFor)return CONTINUE;if(/atrapalo\-no\-reply@atrapalo\.com/.test(t.from)&&(e.modifiedTime=!1===/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|[-\+]\d{2}:?\d{2})?)?$/.test(e.modifiedTime)?null:e.modifiedTime),/email\.zomatobook\.com/.test(t.from)){var R;e.modifiedTime=!1===/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|[-\+]\d{2}:?\d{2})?)?$/.test(e.modifiedTime)?null:e.modifiedTime,(R=Scanner.fromMessage(t)).setLocale(r);u=e.startTime&&t.plain?R.getDetachedSpan(t.plain).firstDate():null;e.startTime=u?R.getDateDD(u).iso8601:e.startTime}/noreply\@exploretock\.com/.test(t.from)&&((R=Scanner.fromMessage(t)).setLocale(r),e.startTime=e.modifiedTime?R.getDetachedSpan(e.modifiedTime).firstDate():e.startTime,delete e.modifiedTime,"N/A"===e.reservationFor.telephone&&delete e.reservationFor.telephone);if(/movies\.fandango\.com/.test(t.from)&&/A \W\d{1,4}\W\d{2} credit will be added to your Fandango account\./.test(t.plain)&&(e.reservationStatus="http://schema.org/ReservationCancelled"),/confirmation@trx\.fandango\.com/.test(t.from)&&/Purchase Confirmation/.test(t.subject)&&e.reservationFor.location&&Array.isArray(e.reservationFor.location)&&(e.reservationFor.location=e.reservationFor.location[0]),/confirmation@trx\.fandangopurchase\.com/.test(t.from)&&/Refund Confirmation/.test(t.subject)&&(e.reservationStatus="http://schema.org/ReservationCancelled"),/confirmation@movies\.fandango\.com/.test(t.from)||/confirmation@trx\.fandangopurchase\.com/.test(t.from)&&/Refund Confirmation/.test(t.subject)){if(!e.reservationFor)return CONTINUE;(R=Scanner.fromMessage(t)).setLocale("en_US");var w=R.getSpan();e.reservationFor.name instanceof Array&&(e.reservationFor.name=null);var z=w.allDates()[0];x=w.allDates()[1];/\w+,\s\w+\s\d+,\s\d+/.test(z.toString())||(z=w.allDates()[1],x=w.allDates()[2]),e.reservationFor.startDate=combineDateAndTime(z,x).toString()}if(/@bookmyshow\.email/.test(t.from)&&/Your Tickets/.test(t.subject)&&!e.reservationFor)return CONTINUE;if(/mail.travel.rakuten.co.jp/.test(t.from)&&/.\u697d\u5929\u30c8\u30e9\u30d9\u30eb.\u4e88\u7d04\u5b8c\u4e86\u30e1\u30fc\u30eb \(\u30c1\u30a7\u30c3\u30af\u30a4\u30f3\u65e5.\d{2}\/\d{2}\)/.test(t.subject)&&e.checkinDate&&e.checkinDate.indexOf("T")>-1&&e.checkinDate.indexOf("+")>-1){var q=(x=e.checkinDate.split("T")[1]).split("+")[1];/00:00:00/.test(x)&&((R=Scanner.fromMessage(t)).setLocale(r),(x=loadHelper("starttime.js")(loadHelper("vocab.js")(r),R,t)).exists()&&(x=R.getDateDD(x).iso8601+"+"+q,e.checkinDate=x))}if((/@sixt\.com/.test(t.from)||/@sixt.it/.test(t.from))&&(null===e.pickupTime||""===e.pickupTime))return CONTINUE;if(/@e\.avis\.com/.test(t.from)&&/ReservationConfirmed/.test(e.reservationStatus)&&/your reservation has been canceled/.test(t.subject)&&(e.reservationStatus="http://schema.org/ReservationCancelled"),/@hertz\.com/.test(t.from)&&(e.priceCurrency&&/^\$/.test(e.priceCurrency)&&delete e.priceCurrency,e.reservationFor&&e.reservationFor.model&&/^\$/.test(e.reservationFor.model)&&delete e.reservationFor.model),/(?:nationalcar|goalamo).com/i.test(t.from)){k=loadHelper("vocab.js")(r),(R=Scanner.fromMessage(t)).setLocale(r);var V=R.getSpan(),J=R.getSpan().allDates();if(0===J.length)return STOP;var K=loadHelper("getCandidates.js"),W=K([k.pickUpDateTimeCapture,k.pickUpBlockPrefix,k.pickUpDateTimePrefix,k.pickUpDatePrefix,k.pickUpTimePrefix],V,function(e,t){var r=e.innerCapture(t);if(r&&2===r.length)r=r[1];else{if(!r||3!==r.length)return J.filter(function(t){return t.getStart()>=e.getEnd()});r=R.getDetachedSpan(r.$date+" "+r.$time)}return[r]},function(e){var t=R.getDateDD(e);return/[\d\uff10-\uff19]{1,2}/i.test(e.toString())&&t&&t.is(["Date","DateTime","DateDuration"])}),G=K([k.dropOffDateTimeCapture,k.dropOffBlockPrefix,k.dropOffDateTimePrefix,k.dropOffDatePrefix,k.dropOffTimePrefix],V,function(e,t){var r=e.innerCapture(t);if(r&&2===r.length)r=r[1];else{if(!r||3!==r.length)return J.filter(function(t){if(t.getStart()<e.getEnd())return!1;var r=R.getDateDD(t);return dateTimeSpanToEpoch(r&&r.is(["DateDuration"])?r.endIso8601:r.iso8601)>dateTimeSpanToEpoch(W)});r=R.getDetachedSpan(r.$date+" "+r.$time)}return[r]},function(e){var t=R.getDateDD(e);return/[\d\uff10-\uff19]{1,2}/i.test(e.toString().trim())&&t&&t.is(["Date","DateTime"])},function(e){var t=R.getDateDD(e);return t&&t.is(["DateDuration"])?R.getDetachedSpan(t.endIso8601):e});e.pickupTime=W,e.dropoffTime=G}if(/noreply@DineTime\.com/i.test(t.from)&&/Reservation Cancell?ation/.test(t.subject)&&((R=Scanner.fromMessage(t)).setLocale(r),e.startTime=R.getSpan().next(/You have successfully cancell?ed/).nextDate()),/chope\.co/.test(t.from)&&e.reservationFor.address.streetAddress&&(e.reservationFor.address.streetAddress=e.reservationFor.address.streetAddress.replace(/,?<br>/g,", ")),/oyorooms\.com/.test(t.from)&&(/content=\"{&quot;id&quot;=&gt;\d{1},/.test(t.html)&&(e.reservationFor.address.addressLocality=/&quot;name&quot;=&gt;&quot;(.+)&quot;, &quot;created_at/.exec(t.html)[1]),e.underName.name=/Dear (.+),/.exec(t.plain)[1],e.underName.email=null),/mail\.hotele?s\.com/.test(t.from)&&/main\-guest\-full\-name room\-0/.test(t.html)&&(e.underName.name=/<span class="main\-guest\-full\-name room\-0">(.+)<\/span>(?:,|\uff0c|\s\u69d8\u3001)\s*<span class="num\-of\-adults/.exec(t.html)[1]),/mrandmrssmith\.com/.test(t.from)){E=loadHelper("schemaorgHotelTimeHelper.js")(t,r);e.checkinDate=E[0],e.checkoutDate=E[1]}if(/melia\.com/i.test(t.from)){R=Scanner.fromMessage(t),k=loadHelper("vocab.js")(r);E=loadHelper("schemaorgHotelTimeHelper.js")(t,r,R,k);e.checkinDate=E[0],e.checkoutDate=E[1],e.reservationFor.name=loadHelper("hotelname.js")(k,R,t)}if(/millenniumhotels\.com/i.test(t.from)){E=loadHelper("schemaorgHotelTimeHelper.js")(t,r);e.checkinDate=E[0],e.checkoutDate=E[1]}if(/confirmation@francebillet\.com/i.test(t.from)&&(delete e.bookingDate,/(\d{4}-)(\d{1})(-\d{2}T\d{2}\:\d{2}\:\d{2}\+)(\d{3})(\:\d{2})/.test(e.reservationFor.startDate))){var Y=/(\d{4}-)(\d{1})(-\d{2}T\d{2}\:\d{2}\:\d{2}\+)(\d{2})(\d{1})(\:\d{2})/.exec(e.reservationFor.startDate);e.reservationFor.startDate=Y[1].concat("0",Y[2],Y[3],Y[4],Y[6])}return e}}).call();