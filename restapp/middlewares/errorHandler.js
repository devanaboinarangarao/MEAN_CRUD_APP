exports.errorHandler = (apiReq, apiRes) => {
    apiRes.status(500).send("Something went wrong")
}