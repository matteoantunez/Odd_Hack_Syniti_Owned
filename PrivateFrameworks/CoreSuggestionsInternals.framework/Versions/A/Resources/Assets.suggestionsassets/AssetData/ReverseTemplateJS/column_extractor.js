(function(){return function(t,n,e){var a,r,l=[],g=loadHelper("trim_suffix_vocabulary.js"),s=function(t){return g.forEach(n=>{var a=new RegExp("(\\d{1,4})(?:s+?)?("+n.source+")");t=!t.match(e)&&a.test(t)&&3===a.exec(t).length?a.exec(t)[1]:t}),t},u=new RegExp("\\][\n\\s]*"+n.source+"[\n\\s]*\\[","i"),i=t.getSpan().next(u);r=i.previous("td").start_<i.previous("th").start_?"th":"td";var o=i.next(n).nextAnyTag(r).previousAnyTag(r);o.isNullSpan_&&(o=i.next(n).previousAnyTag(r).nextAnyTag(r));for(var p=o.innerCapture(/\[t[dh](\d+)\]/,1),h=o.parentAnyTag("tr").allInnerTags(r+p),c=0,x=0;x<h.length;x++)if(h[x].sameAs(o)){c=x;break}for(var T=o.parentAnyTag("table");T!==t.getNullSpan();){var f=T.allInnerTags("tr"+p);for(x=0;x<f.length;x++)(a=f[x].allInnerTags("td"+p)[c])&&a.tagContents()!==t.getNullSpan()&&(a=(a=s(a=a.tagContents().toString().trim())).match(e))&&a.length>=1&&l.push(a[0]);T=T.nextAnyTag("table")}if(0===l.length)for(var v=0,d=3,y=o.nextAnyTag("tr");!y.isNullSpan_&&v<=d;)p=y.innerCapture(/\[t[dh](\d+)\]/,1),(a=y.allInnerTagsFiltered("td"+p)[c])&&!a.isNullSpan_&&(a=s(a.toString().trim()).match(e))&&a.length>=1&&l.push(a[0]),0===l.length&&v++,y=y.nextAnyTag("tr");return l}}).call();