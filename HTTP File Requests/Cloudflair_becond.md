# https://api.radar.cloudflare.com/beacon.js

## Request Header
```HTTP
GET /beacon.js HTTP/1.1
Host: api.radar.cloudflare.com
Accept: */*
Accept-Language: en-US,en;q=0.9
Connection: keep-alive
Accept-Encoding: gzip, deflate, br
User-Agent: Mozilla/5.0 (iPad; CPU OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/100.0.4896.77 Mobile/15E148 Safari/604.1
```

## Response Header 
```HTTP
HTTP/1.1 503 Service Temporarily Unavailable
Date: Mon, 18 Apr 2022 17:10:04 GMT
Content-Type: text/html; charset=UTF-8
Transfer-Encoding: chunked
Connection: close
X-Frame-Options: SAMEORIGIN
Permissions-Policy: accelerometer=(),autoplay=(),camera=(),clipboard-read=(),clipboard-write=(),fullscreen=(),geolocation=(),gyroscope=(),hid=(),interest-cohort=(),magnetometer=(),microphone=(),payment=(),publickey-credentials-get=(),screen-wake-lock=(),serial=(),sync-xhr=(),usb=()
Cache-Control: private, max-age=0, no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Expires: Thu, 01 Jan 1970 00:00:01 GMT
Expect-CT: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
Set-Cookie: __cf_bm=vChrDwFoBVli6kizllNOHUQ5FKRPMzhMm4haJmXnex8-1650301804-0-ARrKkbjZBbyUMFdzTfXyuMvldleKI/X9qXKycTeuPYh/6Di6mGak/Fs4mjXJD7kaeQEA7uwDcgxRFWPPa+I4KwQ=; path=/; expires=Mon, 18-Apr-22 17:40:04 GMT; domain=.radar.cloudflare.com; HttpOnly; Secure; SameSite=None
Vary: Accept-Encoding
Server: cloudflare
CF-RAY: 6fdf03043b43c7c1-DEN
```

## Response Body
```HTML
<!DOCTYPE HTML>
<html lang="en-US">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
  <meta name="robots" content="noindex, nofollow" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Just a moment...</title>
  <style type="text/css">
    html, body {width: 100%; height: 100%; margin: 0; padding: 0;}
    body {background-color: #ffffff; color: #000000; font-family:-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, "Helvetica Neue",Arial, sans-serif; font-size: 16px; line-height: 1.7em;-webkit-font-smoothing: antialiased;}
    h1 { text-align: center; font-weight:700; margin: 16px 0; font-size: 32px; color:#000000; line-height: 1.25;}
    p {font-size: 20px; font-weight: 400; margin: 8px 0;}
    p, .attribution, {text-align: center;}
    #spinner {margin: 0 auto 30px auto; display: block;}
    .attribution {margin-top: 32px;}
    @keyframes fader     { 0% {opacity: 0.2;} 50% {opacity: 1.0;} 100% {opacity: 0.2;} }
    @-webkit-keyframes fader { 0% {opacity: 0.2;} 50% {opacity: 1.0;} 100% {opacity: 0.2;} }
    #cf-bubbles > .bubbles { animation: fader 1.6s infinite;}
    #cf-bubbles > .bubbles:nth-child(2) { animation-delay: .2s;}
    #cf-bubbles > .bubbles:nth-child(3) { animation-delay: .4s;}
    .bubbles { background-color: #f58220; width:20px; height: 20px; margin:2px; border-radius:100%; display:inline-block; }
    a { color: #2c7cb0; text-decoration: none; -moz-transition: color 0.15s ease; -o-transition: color 0.15s ease; -webkit-transition: color 0.15s ease; transition: color 0.15s ease; }
    a:hover{color: #f4a15d}
    .attribution{font-size: 16px; line-height: 1.5;}
    .ray_id{display: block; margin-top: 8px;}
    #cf-wrapper #challenge-form { padding-top:25px; padding-bottom:25px; }
    #cf-hcaptcha-container { text-align:center;}
    #cf-hcaptcha-container iframe { display: inline-block;}
  </style>

      <meta http-equiv="refresh" content="35">
  <script type="text/javascript">
    //<![CDATA[
    (function(){
      
      window._cf_chl_opt={
        cvId: "2",
        cType: "non-interactive",
        cNounce: "66878",
        cRay: "6fdf03043b43c7c1",
        cHash: "4141d92a99d7323",
        cUPMDTk: "\/beacon.js?__cf_chl_tk=Rommbt7EWjy8VCfi55Z8RyMDZ2f0Ago3TsuBMV7Xeds-1650301804-0-gaNycGzNB6U",
        cFPWv: "b",
        cTTimeMs: "1000",
        cRq: {
          ru: "aHR0cHM6Ly9hcGkucmFkYXIuY2xvdWRmbGFyZS5jb20vYmVhY29uLmpz",
          ra: "TW96aWxsYS81LjAgKGlQYWQ7IENQVSBPUyAxNV80IGxpa2UgTWFjIE9TIFgpIEFwcGxlV2ViS2l0LzYwNS4xLjE1IChLSFRNTCwgbGlrZSBHZWNrbykgQ3JpT1MvMTAwLjAuNDg5Ni43NyBNb2JpbGUvMTVFMTQ4IFNhZmFyaS82MDQuMQ==",
          rm: "R0VU",
          d: "/z9Mc3Lc/EUNu26lhlMMaGcYypOtiPDux8h3Iw435ZlYqO6BmKY3tXtvJ1C4WrkkqRUCtpJtCTvewA4zAIHo6ptHnq2QdMZCzNt+hZ5g2fV0ks8fE29flNMM5jrJO9jYwd5wXtz9H570kL1cn92chLe1m1JhrxJaEXkSj/TlLWikod9QWUXs7/R5JGbFcPneBta4UTyLnmheo270BMww3htWuK+Ppy9lQASH1His74jl+8vr0zwF2YBEvo9BIkPYcWUSFBxKaBCkZ98MZrEec2xKr7Guwe5FFmo6YhpSM34aO0ncxy0082/5Wnzj9ZfbRfbOteB8Ff9dZ7pZEDkRttZrzQF/m1ReWpHHBajaDkkfNPXNIhikS9FBPN0BoXrksASDdZwTxhfQg7/XNn028Omb8IS/x6TXlQ8tWpF9WrliMB3UDAFXaARV7TNNyWA1XOgFeWvdoRonx37vtIJ5+tsvwCEAI7NSck39MxAVcqVqUJs2XVtcXsuDKOGOKegRd6LOtmmh45jKBQ2lTilSqNmjO6ZdIpEcEdzvfPvpq5HprF6eAqtFVv9uVEkmbL57",
          t: "MTY1MDMwMTgwNC4xOTcwMDA=",
          m: "F8BX7x6mK5egtOlnwIuWzbs5X4XDAGzcaQqbrRtHgzA=",
          i1: "j3YeRHDiN9lntuPF2v/kwA==",
          i2: "OtS7BkoscwiW/Kgb9StVgQ==",
          zh: "DNimdpFrBTtKY54Hx9r/PSAaxiyPEKhCP0KcRMmk7Ok=",
          uh: "ui6wIJ6WEUgh2eKrj5VjDv4v6ksFKw9gPrBbZ0iiBKo=",
          hh: "vPVKr2uPh5EL8NQk+/5FRtcB8rQGNjDuyLHpbGW1Tfw=",
        }
      }
      window._cf_chl_enter = function(){window._cf_chl_opt.p=1};
      
    })();
    //]]>
  </script>
  

</head>
<body>
  <table width="100%" height="100%" cellpadding="20">
    <tr>
      <td align="center" valign="middle">
          <div class="cf-browser-verification cf-im-under-attack">
  <noscript>
    <h1 data-translate="turn_on_js" style="color:#bd2426;">Please turn JavaScript on and reload the page.</h1>
  </noscript>
  <div id="cf-content" style="display:none">
    
    <div id="cf-bubbles">
      <div class="bubbles"></div>
      <div class="bubbles"></div>
      <div class="bubbles"></div>
    </div>
    <h1><span data-translate="checking_browser">Checking your browser before accessing</span> api.radar.cloudflare.com.</h1>
    
    <div id="no-cookie-warning" class="cookie-warning" data-translate="turn_on_cookies" style="display:none">
      <p data-translate="turn_on_cookies" style="color:#bd2426;">Please enable Cookies and reload the page.</p>
    </div>
    <p data-translate="process_is_automatic">This process is automatic. Your browser will redirect to your requested content shortly.</p>
    <p data-translate="allow_5_secs" id="cf-spinner-allow-5-secs" >Please allow up to 5 seconds&hellip;</p>
    <p data-translate="redirecting" id="cf-spinner-redirecting" style="display:none">Redirecting&hellip;</p>
  </div>
   
  <form class="challenge-form" id="challenge-form" action="/beacon.js?__cf_chl_f_tk=Rommbt7EWjy8VCfi55Z8RyMDZ2f0Ago3TsuBMV7Xeds-1650301804-0-gaNycGzNB6U" method="POST" enctype="application/x-www-form-urlencoded">
    <input type="hidden" name="md" value="l7a1q2VAgeaygI0hCMSSew845_.2AQ150ZNDV7IfGXo-1650301804-0-AV1L5wikL588ZCVibzhYN1_LP9Wx56EXiz5AtjBwUnOaT0gUdYS7TCYUqOA08KFJtCfkpINIFc513oP5tNtItHUn4N1795PXnMi7ob0f6Xrf3VFec3HPozWiVCJ8TsHgt561qPDxZz7RxQjRZC-1T-wtCK020RTgT_D37Wzk13TGc5GpIohc2xB22_4l-nfMBUlk31PZxLu6BuevX4jk4L_KDJogCLy0dRfowhIuO-be4Vm-LxFfNUkwNrFydacPN1rWISd0kG2E0KB4-uWHlL63gzKS64t5ze8OcnaCnwh2Ox2FpKaaVCAd1KwylHuhjBs4JJKD_-Q_VzfA44C-GM27IX7tQj5Qr0b2QnNqW2ujZ6N5wNuiNDZjOIkfn-0KtgAq-11GXe2YSNX8gZSdRi1OpqSi2eW9XCzj8OD36i0eqtQzEJdpN2mFL2UJCiY0LdZhnuGktAGNhmhiLrMgX9A9QUe12apzz801kIOzPaQNqkrH5kT5vpFTmopZOtT9Sk9glvoh7Tc1A7uq7hLMfQ6L7QlzoY5KKSD3AYMfNR7i7JEN44QXiUR-6b66FYfvpLHhtDFT2dm9_8gc87v93JhCwIU-Xj_8iVzHb3AQ6jGOiKEaF02tJ9O9oJp0uptJw638IWMqmVqEqw1l7wsqCuQ" />
    <input type="hidden" name="r" value="yhG2fV4vQ5yo8djcmgT8ZoivkfCCi1tLSCHYeXGx7Ek-1650301804-0-AZqTVFky5i/hPB+68Hdn/3PBwUXCCRoAZCGf3ITxbXWmUBAoqhtT7lryEUzCVaZ+TIXN+DXCcDcauEPIq18jXgcmGYxAk9u7AHcC/CvskMAoyYYSAMF2inzl9z5ZhKJ6s4q6sQdU9xVy8Yu2ojQ2LpPukTUq3kciR6NeVEX4Mwkk4Xz+HLV8uINhtVs8tL5psUilNtq465oUBz84FgY7ltxXi7jtszY0OVfvvk8Bh87cglyr4XbYDJQ0SnB5p8xSpS3vvtu4Q660zsjzzDqLhyx3ekEh5IKFZSbH4d7MsIEatgwrEk5iLD/FKzPK6Osh8bDl+1rDm1fTS9+Sl8YL15jDAXC1g4CsojAAKUTeGhejv7xySDL6bj6qeSCV8kdUOI0wkWLdRGVeAheMQJAjhG+A826YTUVCK2w/SVkCkXU+IQZGERQRByKAuX6PIkgc1lmARiHSy5wRkwA+WJt+pJL4MeJ0adjQ14SCe4BT4A3HedzobaFwVxauZylkqjWlqJ+wQeWfAU417gcHJnsBC52B/dj9WTGeHErWKo2s8fx/I2AxiKV6vhSm6w1NhHb2/ScSw2WXC8a+QHScEVqXVqLMXcp8pcoCgSKQddyTPdMXmax1lsvPd92EwYPUys6uwXNqt2Dl7Cf7zGpr6ciahFJ5oIyi4Cc4pzhMP8RKYwysOVA0Usof9s+rkc87/1+P8o7vhfwJC9I32HnjKEyghtf8o4APDh0CEO/nHmCPxDNNPuiK2/roy+0LF1+1jECqe3s/u5jj0CmPpc3qI/JqHyUSrqtsUY8z8Fh4ChhpOC0z7nqkzwNqvNw2vF6LHNvnlvMlGz/pfi8nXxoH7p7kVy3lYtPr2cquRdkKJRadC76Le9kRyQDCl+224JdR++6Fo0B5+oAyttxgYwniy1nn7E/zGxE2cbETdpf7PtqAa1hn+7yffUKUN+75RdqjU9mSd6ZmQqpHQundcJz9bTeyK0KZVM3Kb1ZCdCnttiiJG1PX7cTbk4jceSIoZFL0i6v51AKcjA3CVIlTsmy2FUT+V7TEjk/kOWi7hXS8xRuu5o6e6VLcggF43E7gOCR1no0rHAOXYn/u3eTjUrOAZ2fUmRx2/CP5JhEZtVl02LMXHhXUx2L7E6nJPbNh/XEgqvEdCMhI+9hYmEuOjOrz3IHpystAYT3cHfkHncESwSKXMyt9ANFRb/qBcQoun1bwoTS2zRFeAncgNPCf39DkSTjPeas3UdGggx3mUHVMRZiCnXv3djr8cAcQzBo5/th3d3ZcVkEpFGbqYmhaFT5qJgwMQlWHigjklaMrL0e1iUH19R5vcUyHDQgDwEaoUog2FItPgsU9DdEHvwAkF7UnBYMh0mdFHf3+fX51mFdLiFK3ZoagNR1LnrhXCNkl5mL+EZQo4GwRjaArZOf27p05mcYBteCpcqASXErpirbiSA/RcDExlNYRnPMuL0SrSgJtvZcNCKKT0ec7GEyeCtnoSlhcRdBttosXfuCSS6dEdWNz+11ntRNo3iOxNxD02tOKPLJx1GOskkAC9OOWto4trHmVUpJ/4reNhaME8pXxvD7tFR4aSC0sF5WNG7ybQNtTsacb2/2YfwInPn8l1ybA0skt9RO9arq9yyBmIhX/sJ7h5y671Xq63fwxyiZxojIiBHcH5xfxjjk7VhjdYcBCJUy7jFUMx5nkbSUcyIzDZz2cg+k8Ae1ZUSgPXVW6sxgl2d8hndjSPoNA4rDqKUpNhM7Hheb6F9GsdqxkviXSMWdGS3aCTM6PJnUNvfbq2zv72cyEKRU6lnnzK5Dh7uOZE4LmlAscEJupXqUEwtamX/wvhVOZt6DcJ3Xt4dEhCFY4+UbQBgo8uOvhf32vzrk9jXe66g7ZDzhKmLxd1p+/0NN3aekb"/>
    <input type="hidden" value="bf3b410c37677a1dd67827e58e71f121" id="jschl-vc" name="jschl_vc"/>
    <!-- <input type="hidden" value="" id="jschl-vc" name="jschl_vc"/> -->
    <input type="hidden" name="pass" value="1650301805.197-TJAUckw8/Z"/>
    <input type="hidden" id="jschl-answer" name="jschl_answer"/>
  </form>
     
    <script type="text/javascript">
      //<![CDATA[
      (function(){
          var a = document.getElementById('cf-content');
          a.style.display = 'block';
          var isIE = /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
          var trkjs = isIE ? new Image() : document.createElement('img');
          trkjs.setAttribute("src", "/cdn-cgi/images/trace/jschal/js/transparent.gif?ray=6fdf03043b43c7c1");
          trkjs.id = "trk_jschal_js";
          trkjs.setAttribute("alt", "");
          document.body.appendChild(trkjs);
          var cpo=document.createElement('script');
          cpo.type='text/javascript';
          cpo.src="/cdn-cgi/challenge-platform/h/b/orchestrate/jsch/v1?ray=6fdf03043b43c7c1";
          
          window._cf_chl_opt.cOgUQuery = location.search === '' && location.href.indexOf('?') !== -1 ? '?' : location.search;
          window._cf_chl_opt.cOgUHash = location.hash === '' && location.href.indexOf('#') !== -1 ? '#' : location.hash;
          if (window._cf_chl_opt.cUPMDTk && window.history && window.history.replaceState) {
            var ogU = location.pathname + window._cf_chl_opt.cOgUQuery + window._cf_chl_opt.cOgUHash;
            history.replaceState(null, null, "\/beacon.js?__cf_chl_rt_tk=Rommbt7EWjy8VCfi55Z8RyMDZ2f0Ago3TsuBMV7Xeds-1650301804-0-gaNycGzNB6U" + window._cf_chl_opt.cOgUHash);
            cpo.onload = function() {
              history.replaceState(null, null, ogU);
            };
          }
          
          document.getElementsByTagName('head')[0].appendChild(cpo);
        }());
      //]]>
    </script>
  

  
  <div id="trk_jschal_nojs" style="background-image:url('/cdn-cgi/images/trace/jschal/nojs/transparent.gif?ray=6fdf03043b43c7c1')"> </div>
</div>

          
          <div class="attribution">
            DDoS protection by <a rel="noopener noreferrer" href="https://www.cloudflare.com/5xx-error-landing/" target="_blank">Cloudflare</a>
            <br />
            <span class="ray_id">Ray ID: <code>6fdf03043b43c7c1</code></span>
          </div>
      </td>
     
    </tr>
  </table>
</body>
</html>
```
