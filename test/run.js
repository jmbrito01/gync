var Gync = require('../');
var fs = require('fs');

describe('Gync', function() {
	describe('#run', function() {
		it('should trigger reject if no generator specified', function(done) {
			Gync.run().then(onResolve, onReject);

			function onResolve() {
				throw "Resolved some value";
			}

			function onReject() {
				done();
			}
		});
		it('should trigger reject if not specified a generator', function(done) {
			Gync.run(function() {

			}).then(onResolve, onReject);

			function onResolve() {
				throw "Resolved some value";
			}

			function onReject() {
				done();
			}
		});
		it('should return the result of the generator function', function(done) {
			Gync.run(function* () {
				return true;
			}).then(onResolve, onReject);

			function onResolve(value) {
				if (value) done();
				else throw "Returned invalid value";
			}

			function onReject(error) {
				throw error;
			}
		});

		it('should execute promises synchronously', function(done) {
			Gync.run(function* () {
				function promiseTest() {
					return new Promise(function (resolve, reject) {
						resolve(true);
					});
				}
				try {
					var result = yield promiseTest();
					return result;
				} catch (e) {
					throw e;
				}
			}).then(onResolve, onReject);

			function onResolve(result) {
				if (result) done();
			}

			function onReject(error) {
				throw error;
			}
		});

		it('should execute the callback using the resume parameter', function(done) {
			Gync.run(function* (resume) {
				function callbackTest(cb) {
					setTimeout(function() {
						cb(null, true);
					}, 200);
				}

				var result = yield callbackTest(resume);
				return result;
			}).then(onResolve, onReject);

			function onResolve(result) {
				if (result) done();
			}

			function onReject(error) {
				throw error;
			}
		});

	});
});