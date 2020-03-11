const credentials = {}
try {
    Object.assign(credentials,require(`./.credentials.${process.env.NODE_ENV || 'development'}`))
}catch (e) {
    if (e instanceof Error && e.code === "MODULE_NOT_FOUND") {
        console.warn("No config found for environment:" + process.env.NODE_ENV + "\n using default credentials")
        try {
            Object.assign(require('./credentials.default'))
        } catch (e) {
            console.error("Could not load default credentials")
            throw e
        }
    }
    else
        throw e;
}
module.exports = credentials