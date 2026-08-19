const validate = (schema, options = {}) => {
    const source = options.source || "body";

    return (req, res, next) => {
        const dataToValidate = source === "query" ? req.query : req.body;

        const { error } = schema.validate(dataToValidate, {
            abortEarly: false,
            allowUnknown: source === "query",
            convert: source === "query"
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((detail) => detail.message)
            });
        }

        next();
    };
};

module.exports = validate;