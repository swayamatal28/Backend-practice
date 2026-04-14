const {createLogger,format,transports}=require('winston');
const {combine,timestamp,label,printf}=format;

const myFormat=printf(({level,message,timestamp})=>{
    return `${timestamp} [${level}] ${message}`;
})

const youtubeLogger=()=>{
    return createLogger({
  level: 'debug',
  format: combine(
    format.colorize(),
    timestamp({format:"HH:mm:ss"}),
    myFormat,
  ),
  //defaultMeta: { service: 'user-service' },
  transports: [
    //READ THIS!?.
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    // new transports.File({ filename: 'error.log', level: 'error' }),
    
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    // new transports.File({ filename: 'combined.log' }),

    new transports.Console()

  ],
});
}
module.exports=youtubeLogger;