module.exports = function routeExceptionHandlerMultiple(...callbacks) {
    return callbacks.map(callback => {
        return async (req, res, next) => {
            try {
                return await callback(req, res, next)
            } catch (error) {
                return next(error)
            }
        }
    })
}