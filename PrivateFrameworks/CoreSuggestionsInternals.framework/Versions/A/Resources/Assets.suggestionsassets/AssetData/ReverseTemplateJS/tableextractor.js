(function(){return function(t,n,r){var e=n.getSpan().next(t);if(!e.exists())return n.getNullSpan();var g=e.parentAnyTag("th"),a=e.parentAnyTag("td");if(!g.exists()&&!a.exists())return n.getNullSpan();g.exists()&&a.exists()?e=g.toString().length<a.toString().length?g:a:g.exists()&&g.toString().length-e.toString().length<20?e=g:a.exists()&&a.toString().length-e.toString().length<20&&(e=a);for(var i=e.toString()===g.toString()?"th":"td",s=e.innerCapture(regExpFormatted(/\[\1(\d+)\]/,i),1),l=e.parentAnyTag("tr").allInnerTags(i+s),o=0,u=0;u<l.length;u++)if(l[u].sameAs(e)){o=u;break}for(var x=e.nextAnyTag("tr"),S="",f=0;x&&f<10;){if(f++,(S=x.allInnerTags("td"+s)[o])&&S.exists()){var h=S.tagContents();if(""!==h.toString()){if(!r)return h;for(u=0;u<r.length;u++){var p=h.innerCapture(r[u],1);if(p.exists())return p}}}x=x.nextAnyTag("tr")}return n.getNullSpan()}}).call();