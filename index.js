
var riot = require('riot');
var path = require('path');

// Configure Riot Preprocessor to compile all tags
var createRiotPreprocessor = function(args, config, logger, helper) {
    config = config || {};

    var log = logger.create('preprocessor.riot'),
        options = helper.merge( args.options || {}, config.options || {});

    return function(content, file, done) {
        var result = null;

        log.debug('Processing "%s".', file.originalPath);

        file.path = file.path.replace(/\.tag$/, '.js');

        try {
            result = riot.compile(content, options);
        } catch (e) {
            log.error('%s\n  at %s:%d', e.message, file.originalPath, e.location.first_line);
            return done(e, null);
        }

        done(null, result);
    };
};

createRiotPreprocessor.$inject = ['args', 'config.riotPreprocessor', 'logger', 'helper'];


// Configure Riot framework to be included in the DOM during testing
var createPattern = function(path) {
    return {pattern: path, included: true, served: true, watched: false};
};

var initRiot = function(files) {
    var jasminePath = path.dirname(require.resolve('riot'));
    files.unshift(createPattern(jasminePath + '/../riot.js'));
};

initRiot.$inject = ['config.files'];


// Publish Modules
module.exports = {
    'framework:riot': ['factory', initRiot],
    'preprocessor:riot': ['factory', createRiotPreprocessor]
};