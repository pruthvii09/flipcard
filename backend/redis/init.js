import { Redis } from "ioredis";
const redisUri = process.env.REDIS_URL;
const redis = new Redis(redisUri);

export { redis };
