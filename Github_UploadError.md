# Github Upload Policy Overide
This is the HTTP request I was sending and getting an error when trying to upload some files. Just a little fishy I think considering it was working before.
a. What is it doing?
b. What caused it to force a fail upload?


## Request Header
```HTTP
POST /upload/policies/upload-manifest-files HTTP/1.1
Host: github.com
Accept: application/json
X-Requested-With: XMLHttpRequest
Accept-Language: en-US,en;q=0.9
Accept-Encoding: gzip, deflate, br
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryLmlBka9sBaOKofun
Origin: https://github.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) InspectBrowser
Connection: keep-alive
Referer: https://github.com/matteoantunez/Odd_Hack_Syniti_Owned/upload/main
Content-Length: 768
Cookie: _gh_sess=D5wH9%2B3td890xyrEtU0e%2BWbs3z53stRUrMBHVslZ2FWdvi215WIHK5iSrWiwiJC7%2BwdCcvR80RDydvrmLTHv3XPEHfzd%2FTdnCiz0nQBY%2B1arlDefp6k38j5PbNDCl4yd2PsUJHmaI87Gz27QRnbTAsZo6w7MX7IRkwX4D7nhhEDxG3ExKooYMUQyH%2FGcF%2FX%2BKr3oExb9zmH4m0qbR%2FA3a6w9LLLY1inFN6EQXvSy08p5421BpyCU9Pq0MXBzn9hFdIOxVuD%2BeGE59k5XjbmpzsRLX2onpNkRjeeDoUU27FzUd9WEqnKus4DRIbKUceDyk6dUbcm6y9Vn7WweDSrePoj%2B31LxjOxpKpbt7h9B2xXXGdcGgWiq8AAHeTQx3w%2BvcTPpqQ%3D%3D--kTO4%2FACZY5gGgxQj--TsJqPR4uUMS%2BoV8mDCRx7A%3D%3D; has_recent_activity=1; tz=America%2FChicago; __Host-user_session_same_site=BwR_53GWMDpXWGdhTr_UZbcnNPCAFWbfNj2tu5_08gX0iaa1; user_session=BwR_53GWMDpXWGdhTr_UZbcnNPCAFWbfNj2tu5_08gX0iaa1; color_mode=%7B%22color_mode%22%3A%22auto%22%2C%22light_theme%22%3A%7B%22name%22%3A%22light%22%2C%22color_mode%22%3A%22light%22%7D%2C%22dark_theme%22%3A%7B%22name%22%3A%22dark%22%2C%22color_mode%22%3A%22dark%22%7D%7D; dotcom_user=matteoantunez; logged_in=yes; _device_id=bd6b66f4feda3154e0e3a9c9d0d39fff; _octo=GH1.1.1811549729.1650083479
```

## Request Body
```JSON
------WebKitFormBoundaryLmlBka9sBaOKofun
Content-Disposition: form-data; name="name"

IMG_2208.jpg
------WebKitFormBoundaryLmlBka9sBaOKofun
Content-Disposition: form-data; name="size"

1796572
------WebKitFormBoundaryLmlBka9sBaOKofun
Content-Disposition: form-data; name="content_type"

image/jpeg
------WebKitFormBoundaryLmlBka9sBaOKofun
Content-Disposition: form-data; name="authenticity_token"

zqhhiTOs4eZlz2sdrzzqBgqFHnlVHKFZzuZHilmssNVdXitA4dzE41W35cUe2WctvUTxqqr5nS_gFJWNUOv9JA
------WebKitFormBoundaryLmlBka9sBaOKofun
Content-Disposition: form-data; name="repository_id"

482586630
------WebKitFormBoundaryLmlBka9sBaOKofun
Content-Disposition: form-data; name="upload_manifest_id"

117350731
------WebKitFormBoundaryLmlBka9sBaOKofun--
```

## Response Header
```HTTP
HTTP/1.1 201 Created
Server: GitHub.com
Date: Mon, 18 Apr 2022 05:22:50 GMT
Content-Type: application/json; charset=utf-8
Transfer-Encoding: chunked
Vary: X-PJAX, X-PJAX-Container
permissions-policy: interest-cohort=()
ETag: W/"cb83740879c49defd9cfa2f0a2f004f9"
Cache-Control: max-age=0, private, must-revalidate
Set-Cookie: has_recent_activity=1; path=/; expires=Mon, 18 Apr 2022 06:22:50 GMT; secure; HttpOnly; SameSite=Lax
Set-Cookie: _gh_sess=kx9KguhPVQmjZOd6hwAol%2Bhlyi0SFfgbADhidazSLrC0NjpoEwarsXilAfcpQRXJ8Ss5w8GAYZHPcylm9dYtTQF7%2FmETbioY8ichH4f7%2BbhSA%2BmvdrcRi4MFPGYnPCQh27LLNoSPQ0aN48xFsyC93zJMIdoESlmoJh2Qs89JTiyTERTbZy7xHPv5sdHuohqpp9CWTbY0Obd0H2rOv2IZx2gTgKuL1H40VWa8q1Fo%2FUU1UecE5YvKLNOK%2FzJdF%2BdWW5znadl7%2Bi%2FDMIflPjiOLPhy6EWrOI8jyLbQhR1p9LV2205EJnZnco7CSeXC%2BAl1WCIhuq%2BdEgSOyw70tD74vbaa8a6K%2Fa%2BwU7WC3WKywkf%2FnORmem33alJhTugTh32RPR2q5CVCl6Sfq8V8692vVqwQj6bSDIanC3SFG3hduvdpaUm%2FSOVJ2nfoKrW3jzhQcgIEsmw51tidm0cpeAhpeJgn5Fbie2Grjx08P81DYztO52DQ3BiawDtGtnUwZoiOfd6m4ngYu43jBrBDwhPs93eudI0p0%2Fau59DP6w%3D%3D--mIGHCr3gc6vIi5Oh--X2ZAQMdqHNHhkIfz98Qu4Q%3D%3D; path=/; secure; HttpOnly; SameSite=Lax
Strict-Transport-Security: max-age=31536000; includeSubdomains; preload
X-Frame-Options: deny
X-Content-Type-Options: nosniff
X-XSS-Protection: 0
Referrer-Policy: origin-when-cross-origin, strict-origin-when-cross-origin
Expect-CT: max-age=2592000, report-uri="https://api.github.com/_private/browser/errors"
Content-Security-Policy: default-src 'none'; base-uri 'self'; block-all-mixed-content; child-src github.com/assets-cdn/worker/ gist.github.com/assets-cdn/worker/; connect-src 'self' uploads.github.com objects-origin.githubusercontent.com www.githubstatus.com collector.github.com raw.githubusercontent.com api.github.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com cdn.optimizely.com logx.optimizely.com/v1/events translator.github.com *.actions.githubusercontent.com wss://*.actions.githubusercontent.com online.visualstudio.com/api/v1/locations github-production-repository-image-32fea6.s3.amazonaws.com github-production-release-asset-2e65be.s3.amazonaws.com insights.github.com wss://alive.github.com; font-src github.githubassets.com; form-action 'self' github.com gist.github.com objects-origin.githubusercontent.com; frame-ancestors 'none'; frame-src render.githubusercontent.com viewscreen.githubusercontent.com notebooks.githubusercontent.com; img-src 'self' data: github.githubassets.com identicons.github.com github-cloud.s3.amazonaws.com secured-user-images.githubusercontent.com/ *.githubusercontent.com; manifest-src 'self'; media-src github.com user-images.githubusercontent.com/; script-src github.githubassets.com; style-src 'unsafe-inline' github.githubassets.com; worker-src github.com/assets-cdn/worker/ gist.github.com/assets-cdn/worker/
Vary: Accept-Encoding, Accept, X-Requested-With
X-GitHub-Request-Id: 723D:9AC2:B1AFCC:1346B9F:625CF5AA
```

## Response Body
```JSON
{"upload_url":"https://github-production-upload-manifest-file-7fdce7.s3.amazonaws.com","header":{},"asset":{"id":985723810,"name":"IMG_2208.jpg","size":1796572,"content_type":"image/jpeg","href":"/upload-manifest-files/117350731/files/985723810","original_name":"IMG_2208.jpg"},"form":{"key":"482586630/985723810","acl":"private","policy":"eyJleHBpcmF0aW9uIjoiMjAyMi0wNC0xOFQwNTo1Mjo1MFoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJnaXRodWItcHJvZHVjdGlvbi11cGxvYWQtbWFuaWZlc3QtZmlsZS03ZmRjZTcifSx7ImtleSI6IjQ4MjU4NjYzMC85ODU3MjM4MTAifSx7ImFjbCI6InByaXZhdGUifSxbImNvbnRlbnQtbGVuZ3RoLXJhbmdlIiwxNzk2NTcyLDE3OTY1NzJdLHsieC1hbXotY3JlZGVudGlhbCI6IkFLSUFJV05KWUFYNENTVkVINTNBLzIwMjIwNDE4L3VzLWVhc3QtMS9zMy9hd3M0X3JlcXVlc3QifSx7IngtYW16LWFsZ29yaXRobSI6IkFXUzQtSE1BQy1TSEEyNTYifSx7IngtYW16LWRhdGUiOiIyMDIyMDQxOFQwMDAwMDBaIn0seyJDb250ZW50LVR5cGUiOiJpbWFnZS9qcGVnIn1dfQ==","X-Amz-Algorithm":"AWS4-HMAC-SHA256","X-Amz-Credential":"AKIAIWNJYAX4CSVEH53A/20220418/us-east-1/s3/aws4_request","X-Amz-Date":"20220418T000000Z","X-Amz-Signature":"b4a8c597970d089902f8767600e36288ce460496421c9cc652381dfd870f9e76","Content-Type":"image/jpeg"},"same_origin":false,"asset_upload_url":"/upload/upload-manifest-files/985723810","upload_authenticity_token":"uwiKrjQwVS8kKWi6T6Qycs-PkAAXsvrRJfXzUUa_qq6gkEI46wkrl76h5zOpNFySuva3TkaZ5sd7FS7zj292lQ","asset_upload_authenticity_token":"Jij1_MZUzVZvgykq1-qao-j4akttG2H3K8RCEAUCyp-1CRUPOZ13HcsO5-CyuhCd1N31B0K46-WQasLRSzJggg"}
```
