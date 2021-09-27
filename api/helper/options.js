function options(...models) {
    const obj = {
        include: []
    }

    models.forEach(model => {
        obj.include.push({model})
    })

    return obj
}

module.exports = options