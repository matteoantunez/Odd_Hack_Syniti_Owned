(function(){return{isPlaceAddressValid:function(t,n){return t.exists()&&n.exists()&&(t.toString().length>=.75*n.toString().length&&0===n.toString().indexOf(t.toString())||n.toString().length>=.75*t.toString().length&&0===t.toString().indexOf(n.toString()))&&(t=null),t}}}).call();