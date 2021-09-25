<?php

use Illuminate\Http\JsonResponse;

if ( ! function_exists('returnResponse')) {
    /**
     * Skeleton for API requests.
     *
     * @param bool $status
     * @param mixed $data
     * @param mixed $errorMsg
     * @param int $statusCode
     * @return JsonResponse
     */
    function returnResponse(bool $status, mixed $data, mixed $errorMsg, int $statusCode): JsonResponse
    {
        return response()->json([
            'status'    => $status,
            'data'      => $data,
            'errorMsg'  => $errorMsg
        ], $statusCode);
    }
}

if ( ! function_exists('returnSuccess')) {
    /**
     * Skeleton for success API requests.
     *
     * @param object|array $data
     * @param int $statusCode
     * @return JsonResponse
     */
    function returnSuccess(object|array $data, $statusCode = 200): JsonResponse
    {
        return returnResponse(true, $data, null, $statusCode);
    }
}

if ( ! function_exists('returnFail')) {
    /**
     * Skeleton for failed API requests.
     *
     * @param object|array $errorMsg
     * @param int $statusCode
     * @return JsonResponse
     */
    function returnFail(object|array $errorMsg, int $statusCode): JsonResponse
    {
        return returnResponse(false, null, $errorMsg, $statusCode);
    }
}
