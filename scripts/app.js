const $ = require('jquery');
//const data = require('./dataset.js');
import data from './dataset';

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
