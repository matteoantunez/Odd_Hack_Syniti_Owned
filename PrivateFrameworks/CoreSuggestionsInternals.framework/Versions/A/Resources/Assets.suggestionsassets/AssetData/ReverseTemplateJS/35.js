new ReverseTemplateList([new ReverseTemplate("hertz.com-confirmation-ja",function(e){return/\u3054\u4e88\u7d04\u5185\u5bb9 .+/.test(e.subject)},function(e){if(!/\u3054\u4e88\u7d04\u5185\u5bb9 .+/.test(e.subject))return CONTINUE;var i="en_US",r={customerNamePrefix:/\u3054\u4e88\u7d04\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059/,reservationIdPrefix:/\u3054\u4e88\u7d04\u756a\u53f7\uff1a/,modifyReservationUrlPrefix:/\u4e88\u7d04\u306e\u5909\u66f4\u30fb\u30ad\u30e3\u30f3\u30bb\u30eb/,viewModifyReservationUrlPrefix:"View/Modify/Cancel",beginCheckInUrlPrefix:"\u30aa\u30f3\u30e9\u30a4\u30f3\u30c1\u30a7\u30c3\u30af\u30a4\u30f3",onlineCheckInUrlPrefix:/On-?line Check-In/,pickupTimePrefix:"\u501f\u308a\u51fa\u3057\u6642\u9593",alternatePickupTimePrefix:"Pick Up time",pickupAndReturnLocationPrefix:/\u501f\u308a\u51fa\u3057\u30fb\u8fd4\u5374\u55b6\u696d\u6240/,pickupLocationPrefix:/\u8fd4\u5374\u5834\u6240/,returnLocationPrefix:"\u4f4f\u6240",addressPrefix:"\u4f4f\u6240",yourVehiclePrefix:"Your Vehicle",totalApproximateChargePrefix:/\u6982\u7b97\u5408\u8a08\u984d/,price:/\u6982\u7b97\u5408\u8a08\u984d/,locationTypePrefix:"\u8eca\u7a2e\u30bf\u30a4\u30d7",discountsPrefix:"\u5272\u5f15",phoneNumberPrefix:"\u96fb\u8a71\u756a\u53f7:",approximateChargePrefix:/\u6982\u7b97\u5408\u8a08\u984d/};return r.isCancelled=/^Hertz Reservation Cancellation/.test(e.subject),loadHelper("hertz.com-confirmation-skeleton.js")(e,i,r)},"SG2b82e6de")]);