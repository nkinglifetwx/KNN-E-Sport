import argon2 from "argon2";

const ARGON2_OPTIONS: argon2.Options = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
};

export async function hashPassword(password: string): Promise<string> {
    return await argon2.hash(password, ARGON2_OPTIONS);
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
    return await argon2.verify(hash, password);
}