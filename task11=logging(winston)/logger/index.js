let logger=null;
const youtubeLogger=require("./youtubeLogger");

if (process.env.NODE_ENV === 'youtube') {
  logger=youtubeLogger();
};


module.exports=logger;