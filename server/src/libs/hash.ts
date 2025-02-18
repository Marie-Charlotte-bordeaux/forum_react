import bcrypt from "bcryptjs";

const SALT = 10;
export const Hasher = {
    hash: async (plainPassword: string) => {
        const hashedPassword = await bcrypt.hash(plainPassword, SALT);
        return hashedPassword;
    },
    compare: async (plainPassword: string, hashedPassword: string) => {
        const isValid = await bcrypt.compare(plainPassword, hashedPassword);
        return isValid;
    }
}