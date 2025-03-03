import type {express} from "express"
import z from "zod"
import type { Request } from "express"
import type { User } from "../domain/User"

export type authkhlihiki_ytesti=Request & {
user:?User
}