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
