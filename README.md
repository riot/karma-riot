# karma-riot



[karma-riot](https://github.com/TeeKz/karma-riot) is a fast [Riot 2](https://muut.com/riotjs/) integration for [Karma](https://karma-runner.github.io) that handles tag modules with ease.


## Installation

The easiest way is to keep `karma-riot` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-riot": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-riot --save-dev
```

## Configuration
Following code shows the default configuration...
```js
// karma.conf.js
module.exports = function(config) {
  config.set({

    frameworks: ['jasmine', 'riot'],

    files: [
        '**/*.tag',
        'test/*Spec.js',
    ],

    preprocessors: {
      '**/*.tag': ['riot']
    },

    plugins: [
        'karma-riot'
    ],
  });
};
```

See [example](https://github.com/TeeKz/karma-riot/tree/master/example) for Jasmine spec config.



----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com