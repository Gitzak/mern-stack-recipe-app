exports.sendResponse = (message,status,data)=>{
    const response = {};
    response.status = status;
    response.message = message;
    response.data = data;
    return response
}