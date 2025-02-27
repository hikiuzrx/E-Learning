import type { publish } from "../shared/config/redis";

export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        private password: string
    )
    {}
    validatepassword(password: string) {
        //bcrypt
    }
}