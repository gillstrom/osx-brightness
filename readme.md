# osx-brightness

> Get or set screen brightness in OS X


## Install

```
$ npm install --save osx-brightness
```


## Usage

```js
const osxBrightness = require('osx-brightness');

osxBrightness.set(0.75).then(() => {
	console.log('Changed brightness to 75%');
});

osxBrightness.get().then(brightness => {
	console.log(brightness);
	//=> 0.4375
});
```


## CLI

See the [brightness](https://github.com/kevva/brightness) CLI.


## License

MIT © [Andreas Gillström](https://github.com/gillstrom)
