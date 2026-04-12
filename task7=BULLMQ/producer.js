const {Queue}=require("bullmq");
const notificationQueue=new Queue('email-queue');//id/name is email-queue for this queue


async function addtoqueue(){
    const res=await notificationQueue.add('email to piys',{
        email:'atalswayam28@gmail.com',
        subject:'this is a test email',
        body:'shuuuuuhhhh!!..?'
    });
    console.log('Job added to queue!',res.id);
}
addtoqueue();