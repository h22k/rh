function requireIf(prefix, options) {
    const controller =  require(`../controllers/${prefix}Controller`)
    return new controller(prefix, options)
}

module.exports = requireIf