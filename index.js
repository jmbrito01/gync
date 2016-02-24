'use strict';

class Gync {
	constructor(opts) {
        
	}
       
    static run(args, generator) {
		return new Promise(function (resolve, reject) {
			var Generator = (function*() {}).constructor;
			if (args === undefined) {
				reject('No generator specified to be run');
				throw "No generator specified to be run";
			}
            if (generator === undefined) generator = args, args = [];

			if (!(generator instanceof Generator)) {
				reject('The argument provided is not a function generator, try using function* instead of function');
				throw "'The argument provided is not a function generator, try using function* instead of function'";
			}

			//Initialize the iterator and fetch the first result
			args.push(resume);
			var iterator = generator.apply(generator, args);
			fetchResult();

			function resume(err, result) {
				if (err) onError(err);
				else fetchResult(result);
			}

			function fetchResult(lastResult) {
				var result = iterator.next(lastResult);
				var isPromise = result.value instanceof Promise;
				if (result.done && !isPromise) {
					resolve(result.value);
				} else if (isPromise && !result.done) {
					//Is a promise, lets handle it before continue execution
					result.value.then(fetchResult, onError);
                } else if (isPromise && result.done) {
					result.value.then(resolve, reject);
				}
			}

			function onError(error) {
				reject(error);
			}
		});
	}
}

module.exports = Gync;

