# osx-brightness
> Change brightness in OS X


## Install

```
$ npm install --save wifi-password
```


## Usage

```js
var brightness = require('osx-brightness');

brightness(5, function (err) {
	if (err) {
		console.error(err);
	}

	//=> Brightness changed by 5 steps.
});
```


## CLI

```
$ npm install --global osx-brightness
```

```
$ osx-brightness --help

  Usage
  	$ osx-brightness <steps>

  Example
  	$ osx-brightness 5
  	$ osx-brightness -5
```


## License

MIT © [Andreas Gillström](https://github.com/gillstrom)
