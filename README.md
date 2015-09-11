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
    "karma": "^0.13.9",
    "karma-mocha": "^0.2.0",
    "karma-mocha-reporter": "^1.1.1",
    "karma-phantomjs-launcher": "^0.2.1",
    "karma-riot": "^1.0.0",
    "riot": "^2.2.4"
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

See [our example](https://github.com/riot/examples/karma-mocha) for Mocha spec config.

----

For more information on Karma see the [homepage].

[homepage]: http://karma-runner.github.com
