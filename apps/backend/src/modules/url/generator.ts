import { env } from "../../config/env.js";
const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

//The Generator generates 7 random digits with each digit selected from the 62 characters
//The total random code that could be generated is 62^7 = 3,521,614,606,208

export function generateShortCode(
    length: number = env.SHORT_CODE_LENGTH
) {
    let result = "";
    for (
        let i = 0;
        i < length;
        i++
    ) {
        const index =
            Math.floor(
                Math.random() * characters.length
            );
        result += characters[index];
    }
    return result;
}