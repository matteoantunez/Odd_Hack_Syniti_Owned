new ReverseTemplateList([new ReverseTemplate("ctrip.com-car-confirmation-zh",function(e){return/\u643a\u7a0b\u7528\u8f66\u8ba2\u5355 - \u8ba2\u5355\u53f7\u7801/.test(e.subject)},function(e){if(/\u643a\u7a0b\u7528\u8f66\u8ba2\u5355 - \u8ba2\u5355\u53f7\u7801/.test(e.subject)){var r="zh_Hans_CN",t={reservationId:"Confirmation No",supplier:"Car Suppiler",name:"driver`s name",car:"\u8f66\u578b\u4fe1\u606f",time:"\u5f53\u5730\u65f6\u95f4",city:"\u57ce\u5e02",address:"\u95e8\u724c\u53f7",telephone:"\u67dc\u53f0\u7535\u8bdd"};return loadHelper("ctrip-car-confirmation-skeleton.js")(e,r,t)}},"SG02b4a594")]);