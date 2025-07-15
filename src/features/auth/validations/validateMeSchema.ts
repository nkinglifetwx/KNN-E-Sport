import { checkSchema } from 'express-validator';

export const validateMeSchema = checkSchema({
    access_token: {
        in: ['cookies'],
        notEmpty: {
            errorMessage: {
                message: 'L\'access token ne peut pas être vide',
                error_code: 'empty_access_token',
            },
        },
    }
});

