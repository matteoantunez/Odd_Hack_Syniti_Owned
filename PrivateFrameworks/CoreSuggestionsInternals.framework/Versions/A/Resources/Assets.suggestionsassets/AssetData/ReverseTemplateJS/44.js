new ReverseTemplateList([new ReverseTemplate("ones-confirmation-ja",function(e){return/\[\u30ef\u30f3\u30ba\u30ec\u30f3\u30bf\u30ab\u30fc\]\u4e88\u7d04\u5185\u5bb9\u78ba\u8a8d/.test(e.subject)},function(e){if(!/\[\u30ef\u30f3\u30ba\u30ec\u30f3\u30bf\u30ab\u30fc\]\u4e88\u7d04\u5185\u5bb9\u78ba\u8a8d/.test(e.subject))return CONTINUE;var r="ja_JP",s={underPersonNameRegExp:/\u304a\u540d\u524d\uff08.+\uff09.(.+)\s*\u69d8/,carReservationIdRegExp:/\u4e88\u7d04No.\s*([A-Z]\d+)/,carBrandRegExp:/\u8eca\u7a2e.\s*(.+)/,pickUpDateTimePrefix:/\u51fa\u767a\u65e5\u6642.\s*(\d{4}.\d{1,2}.\d{1,2}.\s*\d{1,2}.\d{1,2}.)/,dropOffDateTimePrefix:/\u8fd4\u5374\u65e5\u6642.\s*(\d{4}.\d{1,2}.\d{1,2}.\s*\d{1,2}.\d{1,2}.)/,pickUpNameRegExp:/\u9078\u629e\u5e97\u8217.\s*(.+)/,pricePrefixRegExp:/\u7a0e\u8fbc\u5c0f\u8a08.\s*([\d,.]+)\s*(\D)/,modifyReservationUrl:""};return loadHelper("ones-confirmation-skeleton.js")(e,r,s)},"SG82bb477d")]);