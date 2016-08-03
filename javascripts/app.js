/* Common.js is used to import javascript
  modules into a main file. The results are
  concatenated.*/

/* When importing a module from node.js, use
  the following syntax:
  var <variable name> = ('<module name>'.js); */

// require jQuery from NPM
var $ = require('jquery');

/* When importing a home made module use the
  following syntax:
  var <variable name> = ('./relative/directory/to/module.js') */

// require data from local dataset module
var data = require('./dataset.js');

console.log(data.name,
  data.phone,
  data.email,
  data.deepfryers,
  data.fryerSize,
  data.oilChanges
);
