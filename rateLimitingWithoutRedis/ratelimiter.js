    export function tokenBucketRateLimiter(opts){
        const{
            tokensPerInterval,
            intervalMs,
            bucketSize,
            keyGenerator=(req)=>
                req.ip || (req.headers["x-forwarded-for"]|| "anon").toString(),
        }=opts;
        const buckets=new Map();
        const tokensPerMs=tokensPerInterval/intervalMs;
        return function(req,res,next){
            try{
                const key=keyGenerator(req);
                const now=Date.now();

                const bucket=buckets.get(key) || {
                    tokens:bucketSize,
                    lastRefill:now,
                };

                const elapsed=now-bucket.lastRefill;
                const refill=elapsed*tokensPerMs;

                bucket.tokens=Math.min(bucketSize,bucket.tokens+refill);
                bucket.lastRefill=now;
                if(bucket.tokens>=1){
                    bucket.tokens-=1;
                    buckets.set(key,bucket);
                    return next();
                }
                else{
                    return res.status(429).json({error:"Wait before trying again"});
                }
            }
            catch(err){
                console.log('RL ERR');
                return next();
            }
        };

        
    }