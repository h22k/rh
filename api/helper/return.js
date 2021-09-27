/**
 *
 * @param status
 * @param data
 * @param errorMsg
 * @returns {{data, status, errorMsg, statusCode}}
 */
const {response} = require("express");

function returnResponse(status, data, errorMsg) {
    return {
        status,
        data,
        errorMsg,
    }
}

/**
 *
 * @param res
 * @param data
 * @param statusCode
 * @returns {{data, status, errorMsg, statusCode: number}}
 */
function successResponse(res, data, statusCode = 200) {
    return res.status(statusCode).json(returnResponse(true, data, null))
}

/**
 *
 * @param res
 * @param error
 * @param statusCode
 * @returns {{data, status, errorMsg, statusCode: number}}
 */
function errorResponse(res, error, statusCode = 500) {
    return res.status(statusCode).json(returnResponse(false, null, error))
}

function jsonResponse(res, promise) {
    promise.then(val => {
        successResponse(res, val)
    }).catch(error => {
        errorResponse(res, {
            msg: 'DB Error!',
            error
        })
    })
}

module.exports = {
    errorResponse,
    returnResponse,
    successResponse,
    jsonResponse
}