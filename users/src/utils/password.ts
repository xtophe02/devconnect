// import { scrypt, randomBytes } from "crypto";
// import { promisify } from "util";

// const scryptAsync = promisify(scrypt);
import bcryptjs from "bcryptjs";
export class Password {
  static async toHash(password: string) {
    // const salt = randomBytes(8).toString("hex");
    // const buffer = (await scryptAsync("password", salt, 64)) as Buffer;
    // console.log("toHash:", password);
    // return `${buffer.toString("hex")}.${salt}`;
    return bcryptjs.hash(password, 10);
  }

  static async compare(storePassword: string, suppliedPassword: string) {
    // const [hashedPassword, salt] = storePassword.split(".");
    // console.log(suppliedPassword);
    // const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    // return buffer.toString("hex") === hashedPassword;
    return bcryptjs.compare(suppliedPassword, storePassword);
  }
}
