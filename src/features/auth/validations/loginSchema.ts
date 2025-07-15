import { checkSchema } from 'express-validator';

export const validateLoginSchema = checkSchema({
    username: {
        in: ['body'],
        notEmpty: {
            errorMessage: {
                message: 'Le pseudo ne peut pas être vide',
                error_code: 'empty_username',
            },
        },
    },
    password: {
        in: ['body'],
        notEmpty: {
            errorMessage: {
                message: 'Le mot de passe ne peut pas être vide',
                error_code: 'empty_password',
            },
        },
    },
});

