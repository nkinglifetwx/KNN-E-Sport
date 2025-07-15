import { checkSchema } from 'express-validator';

export const validateRegisterSchema = checkSchema({
    username: {
        in: ['body'],
        isLength: {
            options: { min: 3, max: 16 },
            errorMessage: {
                message: 'Le pseudo doit faire entre 3 et 16 caractères',
                error_code: 'invalid_username_length',
            },
        },
        isAlphanumeric: {
            errorMessage: {
                message: 'Le pseudo doit être alphanumérique',
                error_code: 'invalid_username_format',
            },
        },
        notEmpty: {
            errorMessage: {
                message: 'Le pseudo ne peut pas être vide',
                error_code: 'empty_username',
            },
        },
    },
    password: {
        in: ['body'],
        isLength: {
            options: { min: 8 },
            errorMessage: {
                message: 'Le mot de passe doit faire au moins 8 caractères',
                error_code: 'invalid_password_length',
            },
        },
        notEmpty: {
            errorMessage: {
                message: 'Le mot de passe ne peut pas être vide',
                error_code: 'empty_password',
            },
        },
    },
});

