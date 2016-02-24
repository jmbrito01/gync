# Gync

Gync is a simple asynchronous control flow framework that
gives you the hability to handle promises in a syncronous way.

### Example

```
var Gync = require('gync');
var fs = require('fs');

function readFile(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });

    });
}

Gync.run(function* (resume) {
    var pkg = JSON.parse(yield readFile('./package.json'));
    var other = JSON.parse(yield readFile('./other.json'));

    var pkg_cb = JSON.parse(yield fs.readFile('./package.json', resume));

});
```

### References

#### Gync.run(args, generator)
Executes a generator synchronously and returns a promise for
the result of the generator.

##### Parameters
* **args:** An array with the list of values you want to
pass to the generator as arguments
* **generator:** The generator function to be executed




### License

The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.