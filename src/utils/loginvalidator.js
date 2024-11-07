import Joi from 'joi'


const loginEmployeeSchema = Joi.object({
    email: Joi.alternatives()
        .try(
            Joi.string()
                .email({ tlds: false })
                .messages({
                    "string.email": "Please enter a valid email address",
                    "string.empty": "Email is require"
                }),
        )
        .required(),
    password: Joi.string()
        .required()
        .min(6)
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters long"
        })
})
    .required();

const validateEmployeeLogin = (input) => {
    const { error } = loginEmployeeSchema.validate(input, {
        abortEarly: false
    })

    if (error) {
        const formatError = error.details.reduce((prev, curr) => {
            prev[curr.path[0]] = curr.message
            return prev
        }, {})
        return formatError
    }
    return null
};

export default validateEmployeeLogin