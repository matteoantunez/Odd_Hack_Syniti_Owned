new ReverseTemplateList([new ReverseTemplate("jalan.net-en",function(e){return/Confirmation$/.test(e.subject)||/Cancellation$/.test(e.subject)},function(e){if(/Confirmation$/.test(e.subject)||/Cancellation$/.test(e.subject)){var t="en_US",n={};return n.reservationCancelled=/Cancellation$/,n.confirmation=/Confirmation$/,n.reservationIdPrefix="Reservation number",n.hotelNamePrefix="Hotel",n.hotelPhonePrefix="Overseas call",n.hotelAddressRegExp=/Address:\s*(.+)/,n.checkInDateTimePrefix="Check-in date and time",n.stayLengthPrefix="Night(s)",n.stayLengthSuffix="night(s)",n.priceRegExp=/(?:Total charge)(?::|\uff1a)([^\uff08\(\n]+)/,n.underPersonNamePrefix="Guest Name(Representative)",n.underPersonNameSuffix="",n.checkOutTime="Check-Out Time:",loadHelper("jalan.net-skeleton.js")(e,t,n)}},"SG0ed7722d"),new ReverseTemplate("jalan.net-html-jp",function(e){return/(\u4e88\u7d04\u53d6\u6d88|\u4e88\u7d04\u5909\u66f4|\u4e88\u7d04\u78ba\u8a8d|\u4e88\u7d04\u5185\u5bb9\u8ee2\u9001)/.test(e.subject)},function(e){if(/(\u4e88\u7d04\u53d6\u6d88|\u4e88\u7d04\u5909\u66f4|\u4e88\u7d04\u78ba\u8a8d|\u4e88\u7d04\u5185\u5bb9\u8ee2\u9001)/.test(e.subject)&&/\u30c6\u30ad\u30b9\u30c8\u30e1\u30fc\u30eb\uff08\u6587\u5b57\u3060\u3051\u306e\u30e1\u30fc\u30eb\uff09\u3078\u5909\u66f4\u5e0c\u671b\u306e\u65b9\u306f/.test(e.plain)){var t="ja_JP",n={};return n.reservationCancelled=/\u4e88\u7d04\u53d6\u6d88/,n.confirmation=/(\u4e88\u7d04\u78ba\u8a8d|\u4e88\u7d04\u5909\u66f4)/,n.reservationIdPrefix="\u4e88\u7d04\u756a\u53f7",n.hotelNamePrefix="\u5bbf\u540d",n.hotelPhonePrefix="\u96fb\u8a71\u756a\u53f7",n.hotelAddressPrefix="\u6240\u5728\u5730",n.checkInDateTimePrefix="\u30c1\u30a7\u30c3\u30af\u30a4\u30f3\u65e5\u6642",n.stayLengthPrefix="\u5bbf\u6cca\u65e5\u6570",n.pricePrefix="\u652f\u6255\u6599\u91d1",n.underPersonNamePrefix="\u5bbf\u6cca\u4ee3\u8868\u8005\u6c0f\u540d",n.underPersonNameSuffix="\u69d8",n.checkOutTimePrefix="\u30c1\u30a7\u30c3\u30af\u30a2\u30a6\u30c8\u6642\u9593",loadHelper("jalan.net-html-skeleton.js")(e,t,n)}},"SG5f2d1323"),new ReverseTemplate("jalan.net-ko",function(e){return/(\uc608\uc57d \ucde8\uc18c|\uc608\uc57d \ud655\uc778)/.test(e.subject)},function(e){if(/(\uc608\uc57d \ucde8\uc18c|\uc608\uc57d \ud655\uc778)/.test(e.subject)){var t="ko_KR",n={};return n.reservationCancelled=/\uc608\uc57d \ucde8\uc18c/,n.confirmation=/\uc608\uc57d \ud655\uc778/,n.reservationIdPrefix="\uc608\uc57d\ubc88\ud638",n.hotelNamePrefix="\uc219\ubc15\uc2dc\uc124\uba85",n.hotelPhonePrefix="\uad6d\uc81c \uc804\ud654",n.hotelAddressRegExp=/\uc18c\uc7ac\uc9c0:(.+)/,n.checkInDateTimePrefix="\uccb4\ud06c\uc778 \uc77c\uc2dc",n.stayLengthPrefix="\uc219\ubc15 \uc77c\uc218",n.stayLengthSuffix="\ubc15",n.priceRegExp=/(?:\uc9c0\ubd88\uae08\uc561)(?::|\uff1a)([^\uff08\(\n]+)/,n.underPersonNamePrefix="\uc219\ubc15 \ub300\ud45c\uc790\uba85",n.underPersonNameSuffix="",n.checkOutTime="\uccb4\ud06c\uc544\uc6c3 \uc2dc\uac04:",loadHelper("jalan.net-skeleton.js")(e,t,n)}},"SGfcb507f2")]);