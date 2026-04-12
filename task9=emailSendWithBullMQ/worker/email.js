const {Worker}= require("bullmq");
const transporter = require("../utils/mailer");
const worker=new Worker("email-queue",async(job)=>{
    console.log(`msg recieved with id: ${job.id}`);

        try {
            await transporter.sendMail({
                from: "atalswayam28@gmail.com",
                to: job.data.email,
                subject: "Test Email",
                text: job.data.message
            });

            console.log("Email sent to:", job.data.email);
        } catch (err) {
            console.log("Error sending email:", err);
        }

},
{
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
}
)