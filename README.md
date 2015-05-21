# osx-brightness [![Build Status](https://travis-ci.org/gillstrom/osx-brightness.svg?branch=master)](https://travis-ci.org/gillstrom/osx-brightness)
> Get or set screen brightness in OS X


## Install

```
$ npm install --save osx-brightness
```


## Usage

```js
var brightness = require('osx-brightness');

brightness.set(75, function (err) {
	console.log('Changed brightness to 75%');
});

brightness.get(function (err, level) {
	console.log(level);
	//=> 0.4375
});
```


## CLI

```
$ npm install --global osx-brightness
```

```
$ osx-brightness --help

  Example
  	$ osx-brightness
  	$ osx-brightness 75
```


## License

MIT © [Andreas Gillström](https://github.com/gillstrom)
