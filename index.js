function createLocaleMiddleware (messages, defaultLocale) {
  defaultLocale = defaultLocale || 'pt-BR'

  /**
   * reads locale headers and save it to `req.locale`
   * @todo possibly read DEFAULT_LOCALE from domain country
   * @param {Object} req express request
   * @param {Object} res express response
   * @param {Function} next next handler
   * @returns {undefined}
   */
  function localeMiddleware (req, res, next) {
    var cookieLocale = req.cookies && req.cookies[process.env.LOCALE_COOKIE_NAME]
    var headerLocale = req.acceptsLanguages(Object.keys(messages))
    var userLocale = req.user ? req.user.locale : null
    req.locale = userLocale || cookieLocale || headerLocale || defaultLocale
    next()
  }

  return localeMiddleware
}

module.exports = createLocaleMiddleware
