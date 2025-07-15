import { checkSchema } from 'express-validator';

export const validateRefreshSchema = checkSchema({
    refresh_token: {
        in: ['cookies'],
        notEmpty: {
            errorMessage: {
                message: 'Le refresh token ne peut pas être vide',
                error_code: 'empty_refresh_token',
            },
        },
    }
});

