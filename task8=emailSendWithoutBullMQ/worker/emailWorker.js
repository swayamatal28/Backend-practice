const queue=require("../queue/emailQueue");
const transporter = require("../utils/mailer");

setInterval(async ()=>{
    if(queue.length>0)
    {
        // const job=queue.shift();
        // console.log("Processing job:",job.id);
        // console.log("Sending mail to ",job.email);
        // setTimeout(()=>{
        //     console.log("email sent to: ",job.email);
        // },2000);

         const job = queue.shift();

        console.log("Processing job:", job.id);

        try {
            await transporter.sendMail({
                from: "atalswayam28@gmail.com",
                to: job.email,
                subject: "Test Email",
                text: job.message
            });

            console.log("Email sent to:", job.email);
        } catch (err) {
            console.log("Error sending email:", err);
        }
    }
},1000);