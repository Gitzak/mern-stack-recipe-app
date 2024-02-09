exports.sendResponse = (message, status, data) => {
    const response = {};
    response.status = status;
    response.message = message;
    response.dataResponse = data;
    return response;
};
