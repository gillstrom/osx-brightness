# osx-brightness
> Change or get brightness in OS X


## Install

```
$ npm install --save osx-brightness
```


## Usage

```js
var brightness = require('osx-brightness');

brightness.set(5, function (err) {
	if (err) {
		console.error(err);
	}

	//=> Brightness changed by 5 steps.
});

brightness.get(function (err, lvl) {
	if (err) {
		console.error(err);
	}

	console.log(lvl);
	//=> 0.4375
});
```


## CLI

```
$ npm install --global osx-brightness
```

```
$ osx-brightness --help

  Usage
  	$ osx-brightness
  	$ osx-brightness <steps>

  Example
  	$ osx-brightness
  		=> 0.4375
  	$ osx-brightness 5
  	$ osx-brightness -5
```


## License

MIT © [Andreas Gillström](https://github.com/gillstrom)
