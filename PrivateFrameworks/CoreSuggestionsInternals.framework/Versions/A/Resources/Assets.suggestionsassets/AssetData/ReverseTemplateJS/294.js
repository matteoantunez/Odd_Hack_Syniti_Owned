new ReverseTemplateList([new ReverseTemplate("rakuten-hotel-cancellation-ja",function(e){return/\u30ad\u30e3\u30f3\u30bb\u30eb\u78ba\u8a8d\u30e1\u30fc\u30eb/.test(e.subject)},function(e){var t="ja_JP",n={emailTitelConfirmation:/encoding error on title/,reservationId:/\u4e88\u7d04\u756a\u53f7/,guestName:/\u5bbf\u6cca\u8005\u6c0f\u540d/,price:/\u7dcf\u5408\u8a08/,checkInDate:/\u30c1\u30a7\u30c3\u30af\u30a4\u30f3\u65e5\u6642/,checkOutDate:/\u30c1\u30a7\u30c3\u30af\u30a2\u30a6\u30c8\u65e5/,hotelName:/\u5bbf\u6cca\u65bd\u8a2d\u540d/,hotelPhone:/\u5bbf\u6cca\u65bd\u8a2d\u96fb\u8a71\u756a\u53f7/,hotelAddress:/\u5bbf\u6cca\u65bd\u8a2d\u4f4f\u6240/,emailTitelCancelConfirmation:/\u30ad\u30e3\u30f3\u30bb\u30eb\u78ba\u8a8d\u30e1\u30fc\u30eb/};return loadHelper("rakuten-hotel-cancellation-skeleton.js")(e,t,n)},"SGe47a0f07")]);