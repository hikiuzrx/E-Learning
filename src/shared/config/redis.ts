import redis from 'redis'
import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL });
client.connect().catch(console.error);



const pubClient = redis.createClient()
const subClient = redis.createClient()
pubClient.on("error",(err)=> console.error(err.message))
subClient.on("error",(err)=> console.error(err.message))
export async function subscribe(){}
export async function publish(){}
export {pubClient,subClient,client}
