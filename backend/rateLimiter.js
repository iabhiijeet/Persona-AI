const DAILY_LIMIT = 10;
const CLEANUP_INTERVAL = 60 * 60 * 1000;

const hits = new Map();

function getResetTime() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0);
  return tomorrow.getTime();
}

function getClientIp(req) {
  return req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of hits) {
    if (now > data.resetTime) {
      hits.delete(ip);
    }
  }
}, CLEANUP_INTERVAL);

export function rateLimiter(req, res, next) {
  const ip = getClientIp(req);
  const now = Date.now();

  let record = hits.get(ip);

  if (!record || now > record.resetTime) {
    record = { count: 0, resetTime: getResetTime() };
    hits.set(ip, record);
  }

  const remaining = DAILY_LIMIT - record.count;

  if (remaining <= 0) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return res.status(429).json({
      error: "Daily limit reached. Try again tomorrow.",
      remaining: 0,
      retryAfter,
    });
  }

  record.count++;
  res.set("X-RateLimit-Remaining", String(remaining - 1));
  req.rateLimit = { remaining: remaining - 1 };
  next();
}
