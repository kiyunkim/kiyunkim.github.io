'use strict';
var Isotope = (function (option) {
  var self = this,
    proto = Isotope.prototype,

    cookieName = option.cookieName,
    cookieValue = option.cookieValue,
    cookieClosed = option.cookieClosed;

  proto.submit = function () {
    // .. 
  };

  proto.setup = function () {
    // submit function
    $(cookieClosed).click(function () {
      // if no email address is put in
      proto.submit($(email_input).val());
    });
  };

  return { setup: self.setup };
});

$(document).ready(function () {
  var isotopeGrid = new Isotope({

    cookieName: 'mnt_ELemailcapCookie',      // cookie name
    cookieValue: 'true',                     // cookie initial value
    cookieClosed: 'closed'                   // cookie value when experience has been closed

  });
  isotopeGrid.setup();
});


// https://codepen.io/gapcode/pen/vEJNZN
var version = detectIE();

if (version === false) {
  // if not IE or Edge
} else {
  // if IE or edge
  
  addCss('css/ie.css');
}

function detectIE() {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  
  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  
  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  
  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    return true;
    // IE 10 or older => return version number
    //return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    return true;
    // IE 11 => return version number
    //var rv = ua.indexOf('rv:');
    //return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    return true;
    // Edge (IE 12+) => return version number
    // return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}


function addCss(fileName) {

  var head = document.head;
  var link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = fileName;

  head.appendChild(link);
}
