[![Build Status](https://img.shields.io/travis/riot/karma-riot/master.svg?style=flat-square)](https://travis-ci.org/riot/karma-riot)

# karma-riot

[karma-riot](https://github.com/riot/karma-riot) is a [Riot](https://riotjs.org) integration for [Karma](https://karma-runner.github.io) that handles tag modules with ease.

## Installation

Install `karma-riot` from npm:

```bash
$ npm install --save-dev karma-riot
```

Your `package.json` will be like this:

```json
{
  "devDependencies": {
    "karma": "^1.3.0",
    "karma-mocha": "1.3.0",
    "karma-mocha-reporter": "^2.2.1",
    "karma-phantomjs-launcher": "^1.0.2",
    "karma-riot": "^2.0.0",
    "riot": "^3.0.0"
  }
}
```

## Configuration

Following code shows the default configuration...

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'riot'],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-riot'
    ],
    files: [
      '**/*.tag',
      'test/**/*.js'
    ],
    preprocessors: {
      '**/*.tag': ['riot']
    },
    browsers: ['PhantomJS'],
    reporters: ['mocha']
  })
}
```

## Options

```js
riotPreprocessor: {
  options: {
    type: 'es6'
  }
}
```

[Read the docs](http://riot.js.org/guide/compiler/#pre-processors) for more info on available options.

See [our example](./test/specs.js) for Mocha spec config.

----

For more information on Karma see the [homepage].

[homepage]: http://karma-runner.github.com
