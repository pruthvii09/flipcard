import { redis } from "../redis/init.js";
export const rateLimiter = ({ maxRequest, windowMs }) => {
  return async function (req, res, next) {
    const ip = req.ip;
    console.log("ip => ", ip);
    const key = `rateLimit:${ip}`;
    console.log("key => ", key);
    try {
      const result = await redis
        .multi()
        .incr(key)
        .pexpire(key, windowMs)
        .exec();

      const requestCount = result[0][1];
      console.log("requestCount => ", requestCount);
      console.log("maxRequest => ", maxRequest);
      if (requestCount > maxRequest) {
        return res.status(429).json({ message: "Too many requests" });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
