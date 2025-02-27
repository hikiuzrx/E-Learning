import redis from 'redis'


const pubClient = redis.createClient()
const subClient = redis.createClient()
pubClient.on("error",(err)=> console.error(err.message))
subClient.on("error",(err)=> console.error(err.message))
export async function subscribe(){}
export async function publish(){}
export {pubClient,subClient}
