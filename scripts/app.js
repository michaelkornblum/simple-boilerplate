var $ = require('jquery');
var data = require('./dataset.js');

$(document).ready(function () {
  console.log(data.name,
    data.phone,
    data.email,
    data.deepfryers,
    data.fryerSize,
    data.oilChanges
  );
});

console.log('this is a test');
