// console.log(arguments);
// console.log(require('module').wrapper);

//MOdule.export
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(2, 5));

//EXPORTS
// const calc2 = require('./test-module-2');
const { add } = require('./test-module-2');
console.log(add(2, 5));

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
