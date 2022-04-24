(function(){function e(){this.UseCaseClassifierModeEnum=loadHelper("enums.js").UseCaseClassifierModeEnum,this.regex_shunts=loadHelper("document_classifier_regex_shunts.js"),this.locale_domain_overrides=loadHelper("document_classifier_locale_domain_overrides.js"),this.locale_domain_body_overrides=loadHelper("document_classifier_locale_domain_body_overrides.js"),this.locale_domain_variants_overrides=loadHelper("document_classifier_locale_domain_variants_overrides.js"),this.locale_family_model=loadHelper("document_classifier_model_locale_family.js"),this.model=null,this.infer_locale_family=function(e,s,t,r){return e?this.core_locale_family_inference(t,r):/\.(?:cn|jp|kr)\/|\/j[ap](?:[_-]jp)?\/|\/zh(?:[_-](CN|TW))?\/|\/k[or](?:[_-]kr)?\//i.test(s)?"cjk":"non_cjk"},this.core_locale_family_inference=function(e,s){for(var t=0,r=0;r<e.length;r++)t+=s.w[r]*e[r];return t>0?s["+"]:s["-"]},this.domain_splitter=function(e,s){var t=e.split("."),r=[];if(t.length>1)if(t.length>2){var n=2;["co","com","net","au"].indexOf(t[t.length-2])>=0?(r.push("T"+s[0].toUpperCase()+"_"+t[t.length-2]+"."+t[t.length-1]),n=3):r.push("T"+s[0].toUpperCase()+"_"+t[t.length-1]);for(var a=t.slice(0,-n),o=0;o<a.length;o++)r.push("S_"+a[o])}else r.push("T"+s[0].toUpperCase()+"_"+t[t.length-1]);return r},this.html_entities_convert=function(e){var s={oacute:"\xf3",uacute:"\xfa",amp:"&",uuml:"\xfc",nbsp:"\xa0",ocirc:"\xf4",eacute:"\xe9",iacute:"\xed",aacute:"\xe1",ntilde:"\xf1",ndash:"\u2013",auml:"\xe4",ouml:"\xf6",mdash:"\u2014",agrave:"\xe0",euro:"\u20ac",egrave:"\xe8",shy:"-",minus:"-",raquo:" ",Uuml:"\xdc"};try{return"#x"===e.substr(1,2)?String.fromCharCode(parseInt(e.substring(2,e.length-1),16)):"#"===e.substr(1,1)?String.fromCharCode(parseInt(e.substring(2,e.length-1),10)):s[e.substring(1,e.length-1)]}catch(t){return""}},this.cjk_break=function(e,s){if(!e)return[];var t,r,n="";for(t=0;t<e.length-1;t++)n+=e[t],e.charCodeAt(t)>=4352!=e.charCodeAt(t+1)>=4352&&(n+=" ");for(var a=(n+=e.substr(-1)).replace(/ +/g," ").split(" "),o=[],i=0;i<a.length;i++)if(a[i].charCodeAt(0)>=4352)for(r=1;r<s+1;r++)for(t=0;t<a[i].length-r+1;t++)o.push(a[i].substr(t,r));else o.push(a[i]);return o},this.ngram_expand=function(e,s){for(var t=e.map(function(e){return e.charCodeAt(0)>=4352?1:0}),r=e.slice(),n=2;n<s+1;n++)for(var a=0;a<e.length-n+1;a++)t.slice(a,a+n).reduce(function(e,s){return e+s})<2&&r.push(e.slice(a,a+n).join("_"));return r},this.preprocess=function(e,s,t,r,n){var a=e,o=!1,i=/\s*[\s.\\()\[\]|\/,\x3c>\-_!'\xa1?~#\xb4:;={}\u3010\u3002\u3011"&]\s*/g,l=/(\s([a-z0-9]+)?[a-z]\d([a-z0-9]+)?\s)|(\s([a-z0-9]+)?\d[a-z]([a-z0-9]+)?\s)/g,u=/\s+/g,c=/[\uff10-\uff190-9]+(( [\uff10-\uff190-9]+)+)?/g;n?(o=(a=(a=a.replace(/&[^;]{2,8};/g,this.html_entities_convert)).replace(/[A-Za-z]+(?:\.[a-z]+)+/g,"")).length>(a=a.replace(/([\uE000-\uF8FF]|\uD83C[\uDD00-\uDFFF]|\uD83D[\uDC00-\uDEFF]|.[\uFE00-\uFE0F])/g,"")).length,a=(a=" "+a.replace(i,"  ")+" ").replace(/([^\u0041-\u005A\u0061-\u007A\u00A1-\u10FF\u3040-\u3096\u30A0-\u30FB\u4E00-\u9FCC\uAC00-\uD7A3\u3000-\u303F\u3200-\u32FF\s])/g,"")):a=" "+a.replace(i,"  ")+" ";a=(a=(a=(a=" "+a.replace(i,"  ")+" ").replace(l," RT ")).replace(u," ")).replace(c,"0").trim();var h=s>0?this.cjk_break(a,s):a.split(" "),_=(r>1?this.ngram_expand(h,r):h).map(function(e){return t+e});return o&&_.push("EMOJI"),_},this.email_address_preprocess=function(e,s){var t=[],r=e.toLowerCase();if(r){var n=r.split("@");t=this.preprocess(n[0],0,"U_",s,!1).concat(this.domain_splitter(n[1],"email"))}return t},this.url_preprocess=function(e,s){var t=[],r=e.split(/[\/&=]/).filter(function(e){return e.length>1&&e.length<64}).slice(1).map(function(e){return e.replace(/([A-Z][a-z])/g," $1").toLowerCase()});return t=(t=t.concat(this.domain_splitter(r.shift(),"webpage"))).concat(this.preprocess(r.join(" "),0,"R_",s,!1))},this.unicode_planes=[[65,90],[97,122],[161,4351],[12352,12438],[12448,12539],[19968,40908],[44032,55203],[12288,12351],[12800,13055],[65280,65519]],this.get_unicode_plane_distribution=function(e){var s,t=new Array(this.unicode_planes.length);for(s=0;s<t.length;s++)t[s]=0;if(0===e.length)return t;for(s=0;s<e.length;s++){for(var r=e.charCodeAt(s),n=-1,a=0;a<this.unicode_planes.length;a++)if(this.unicode_planes[a][0]<=r&&r<=this.unicode_planes[a][1]){n=a;break}n>=0&&(t[n]+=1)}var o=t.reduce(function(e,s){return e+s});return 0===o?t:t.map(function(e){return e/o})},this.featurize=function(e,s,t,r,n){return this.preprocess(s.toLowerCase(),r,"",n,!0).concat("email"===e?this.email_address_preprocess(t,n):"webpage"===e?this.url_preprocess(t,n):[]).filter(function(e,s,t){return s===t.indexOf(e)})},this.getCoreModelInference=function(e,s,t){function r(e,s){return s[1]-e[1]}var n,a,o=t.bias.slice();for(n=0;n<e.length;n++)for(a=0;a<o.length;a++)o[a]+=e[n]*t.unicode_planes_weights[n][a];var i=[],l=0,u=t.tok2vec(s),c=null;for(n=0;n<s.length;n++)if(c=u[n]){if(-1===i.indexOf(s[n]))for(a=0;a<c.length;a++)o[a]+=c[a];i.push(s[n])}else l+=1;if(l>0)for(n=0;n<t.unk_words_weights.length;n++)o[n]+=t.unk_words_weights[n];var h=[],_=[],d=[],f=[];if(l===s.length||0===o[0]&&0===o[1]&&0===o[2])h=[["NoEvent",0]],_=[["NoEvent",0]],d=[["NoEvent",0]];else{for(n=0;n<t.usecases.length;n++)"NoEvent"===t.usecases[n]?(h.push(["NoEvent",o[n]+t.high_recall_threshold]),d.push(["NoEvent",o[n]+t.high_precision_threshold])):(h.push([t.usecases[n],o[n]]),d.push([t.usecases[n],o[n]])),_.push([t.usecases[n],o[n]]);h.sort(r),_.sort(r),d.sort(r)}if(n=t.usecases.length,l===s.length)f=[["xx_XX",0]];else{for(a=0;a<t.locales.length;a++)f.push([t.locales[a],o[n+a]]);f.sort(r)}return{high_recall_model_usecase_results:h,regular_model_usecase_results:_,high_precision_model_usecase_results:d,locale_results:f,jsMessageLogs:{classifierUsecase:_[0][0],classifierLocale:f[0][0],tokenCount:s.length,unknownWordCount:l}}},this.inferUsecaseAndLocale=function(e,s,t,r,n,a){function o(e,s){return!!e.subject[s]}function i(e){return[].concat(p.subject[e],g.subject[e])}function l(e){return p.subject[e]}var u={},c=this.get_unicode_plane_distribution(s),h=this.infer_locale_family(s,r,c,this.locale_family_model);this.model="cjk"===h?loadModel("document_classifier_model_cjk.js"):loadModel("document_classifier_model_non_cjk.js");var _=this.featurize(e,s,r,this.model.cjk_tok_level,this.model.ngram_level);if(u=this.getCoreModelInference(c,_,this.model),"webpage"===e&&"flight"===a)for(var d in this.UseCaseClassifierModeEnum)this.UseCaseClassifierModeEnum.hasOwnProperty(d)&&(u[this.UseCaseClassifierModeEnum[d]+"_model_usecase_results"]=[["NoEvent",1]]);var f,g=this.regex_shunts[n]&&this.regex_shunts[n][e];if(!g){var m=loadHelper("domain_to_wildcard.js")(n);g=this.regex_shunts[m]&&this.regex_shunts[m][e]}var p=this.regex_shunts["*"]&&this.regex_shunts["*"][e];!g&&p?g=p:p&&(o(g,"Cancelled")&&o(p,"Cancelled")?g.subject.Cancelled=i("Cancelled"):o(p,"Cancelled")&&(g.subject.Cancelled=l("Cancelled")),o(g,"Confirmed")&&o(p,"Confirmed")?g.subject.Confirmed=i("Confirmed"):o(p,"Confirmed")&&(g.subject.Confirmed=l("Confirmed")),o(g,"NoEvent")&&o(p,"NoEvent")?g.subject.NoEvent=i("NoEvent"):o(p,"NoEvent")&&(g.subject.NoEvent=l("NoEvent")));var v=["Cancelled","Confirmed","NoEvent"];if(g!==undefined)for(var C in g){if(g.hasOwnProperty(C)){var j,b,w;switch(C){case"url":j=r;break;case"title":case"subject":j=s;break;case"body":j=t}for(var D=0;D<v.length;D++){for(w=v[D],b=0;g[C][w]&&b<g[C][w].length&&f===undefined;b++)if(g[C][w][b].test(j)){f=w;break}if(f!==undefined)break}}if(f!==undefined)break}if(u.jsMessageLogs.shuntUsecase=!1,f!==undefined)for(var d in this.UseCaseClassifierModeEnum)this.UseCaseClassifierModeEnum.hasOwnProperty(d)&&(u[this.UseCaseClassifierModeEnum[d]+"_model_usecase_results"]=[[f,1]],u.jsMessageLogs.shuntUsecase=!0);u.locale_results[0][0]={en:"en_US",de:"de_DE",ja:"ja_JP",fr:"fr_FR",es:"es_ES",ko:"ko_KR",zh:"zh_Hans_CN",nl:"nl_NL",it:"it_IT",zh_CN:"zh_Hans_CN",zh_TW:"zh_Hans_CN",zh_HK:"zh_Hans_CN",xx_XX:"xx_XX"}[u.locale_results[0][0]];var E=getCurrentLocale(),L=E.split("_")[0],M=u.locale_results[0][0],k=M.split("_")[0];u.jsMessageLogs.overwriteToDeviceRegion=!1,k===L&&M!==E&&(u.locale_results[0][0]=E,u.jsMessageLogs.overwriteToDeviceRegion=!0);var F=this.locale_domain_variants_overrides[u.locale_results[0][0]];if(u.jsMessageLogs.shuntLocaleVariant=!1,F!==undefined)for(var x in F)if(F.hasOwnProperty(x)){var U=F[x];new RegExp(x+"$").exec(n)&&(u.locale_results[0][0]=U,u.jsMessageLogs.shuntLocaleVariant=!0)}var N=this.locale_domain_overrides[n];return u.jsMessageLogs.shuntLocaleDomain=!1,N!==undefined&&(N=N[u.locale_results[0][0]])!==undefined&&(u.locale_results[0][0]=N,u.jsMessageLogs.shuntLocaleDomain=!0),u},this.getBodyLocaleHeuristicResult=function(e,s){var t,r={},n=s,a=this.locale_domain_body_overrides[e.domain];if(r.shuntLocaleBody=!1,a!==undefined)for(var o in a)if(a.hasOwnProperty(o))for(t=0;t<a[o].length;t++)a[o][t].test(e.plain)&&(n=o,r.shuntLocaleBody=!0);var i=e.plain.match(/\d+\/\d+\/\d{2,4}/g)||[],l=[],u=!1,c=!1;for(t=0;t<i.length;t++){var h=i[t].split("/"),_=Number(h[0]),d=Number(h[1]);l.push([_,d,Number(h[2])]),_>12&&_<32&&d<13?u=!0:d>12&&d<32&&_<13&&(c=!0)}if(r.dateFormatCount=i.length,r.hasDDMMDate=u,r.hasMMDDDate=c,r.overwriteDateFormatToGB=!1,r.overwriteDateFormatToUS=!1,r.overwriteDateFormatPastDeductionToGB=!1,r.overwriteDateFormatPastDeductionToUS=!1,"en"==n.substr(0,2))if(u!=c)u&&"en_US"==n&&(n="en_GB",r.overwriteDateFormatToGB=!0),c&&(n="en_US",r.overwriteDateFormatToUS=!0);else if(!u&&!c&&i.length>0){var f=new Date(1e3*e.epoch);f.setHours(0),f.setMinutes(0),f.setSeconds(0);var g=!0,m=!0;for(t=0;t<l.length;t++)h=l[t],g=g&&new Date(h[2],h[1]-1,h[0])<f,m=m&&new Date(h[2],h[0]-1,h[1])<f;g!=m&&(m&&"en_US"==n&&(n="en_GB",r.overwriteDateFormatPastDeductionToGB=!0),g&&(n="en_US",r.overwriteDateFormatPastDeductionToUS=!0))}return{jsMessageLogs:r,locale:n}},this.getResults=function(e,s,t){var r,n,a,o;s=void 0!==s?s:"regular";var i=e.documentType||e.sourceType;r=e.subject,n=e.html,a="email"===i?e.from:e.url,o=e.domain;var l=getCurrentLocale(),u="unknown";if(e.subject.length>12&&(u=detectLanguageForString(e.subject))&&u===l.substr(0,2)&&["de","en","es","fr","it","ja","ko","nb","nl","pt","zh-Hans","zh-Hant"].indexOf(u)<0)return{use_case:"NoEvent",locale:"xx_XX",isEvent:function(){return!1},jsMessageLogs:{classifierBailOut:"Unsupported Locale",OSDetectedLanguage:u}};var c=this.inferUsecaseAndLocale(i,r,n,a,o,t);c.jsMessageLogs.OSDetectedLanguage=u;var h=c[s+"_model_usecase_results"][0][0],_=c.locale_results[0][0];return{usecase_results:c[s+"_model_usecase_results"],locale_results:c.locale_results,jsMessageLogs:c.jsMessageLogs,locale:_,use_case:h,category:t,isEvent:function(){return"NoEvent"!==h},isCancellation:function(){return"Cancelled"===h},isConfirmation:function(){return"Confirmed"===h}}}}return new e}).call();