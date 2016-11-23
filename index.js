'use strict'

const riot = require('riot')
const path = require('path')
const compile = riot.compile

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

  const log = logger.create('preprocessor.riot')
  const options = helper.merge(args.options || {}, config.options || {})

  return function(content, file, done) {
    let result = null
    log.debug('Processing "%s".', file.originalPath)
    if (!/\.js$/.test(file.path)) file.path = file.path + '.js'
    try {
      result = compile(content, options, file.originalPath)
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
  const riotForServer = require.resolve('riot') // lib/server/index.js
  const riotForClient = path.join(path.dirname(riotForServer), '../../riot.js')
  files.unshift({
    pattern: riotForClient,
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
