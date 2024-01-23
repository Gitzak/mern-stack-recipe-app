const errorHandler = (err, req, res, next) => {
    // MongoDB error handling can be added here
    if (err.name === "MongoError") {
        // handle MongoDB-specific errors
        return res.status(500).json({ message: "MongoDB Error Occurred", error: err.message });
    }

    // Generic error response
    res.status(500).json({ message: "An error occurred", error: err.message });
};

module.exports = { errorHandler };
