var riot = require('riot')
var path = require('path')

/**
 * Configure Riot Preprocessor to compile all tags
 * @param {array} args - args
 * @param {array} config - config
 * @param {array} logger - logger
 * @param {array} helper - helper
 * @returns {function} preprocessor
 */
function createRiotPreprocessor(args, config, logger, helper) {
  config = config || {}

  var log = logger.create('preprocessor.riot')
  var options = helper.merge(args.options || {}, config.options || {})

  return function(content, file, done) {
    var result = null
    log.debug('Processing "%s".', file.originalPath)
    if (!/\.js$/.test(file.path)) file.path = file.path + '.js'
    try {
      result = riot.compile(content.replace(/^\uFEFF/g/* strips BOM */, ''), options, file.originalPath)
    } catch (e) {
      log.error('%s\n  at %s:%d', e.message, file.originalPath, e.location.first_line)
      return done(e, null)
    }
    done(null, result)
  }
}
createRiotPreprocessor.$inject = ['args', 'config.riotPreprocessor', 'logger', 'helper']

/**
 * Configure Riot framework to be included in the DOM during testing
 * @param {array} files - reference to config.files
 */
function initRiot(files) {
  var riotPath = path.dirname(require.resolve('riot')) // lib/server/index.js
  files.unshift({
    pattern: riotPath + '/../../riot.js',
    included: true,
    served: true,
    watched: false
  })
  files.unshift({
    pattern: path.resolve('.') + '/polyfill.js',
    included: true,
    served: true,
    watched: false
  })
}
initRiot.$inject = ['config.files']

/** Publish modules **/
module.exports = {
  'framework:riot': ['factory', initRiot],
  'preprocessor:riot': ['factory', createRiotPreprocessor]
}
