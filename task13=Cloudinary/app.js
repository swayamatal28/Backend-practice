require("dotenv").config();
const cloudinary=require("cloudinary").v2;
cloudinary.config({
    cloud_name:'dw4kt4tiu',
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,   
    
})
//THIS FOR UPLOADING IMAGE

const url=cloudinary.url('Screenshot_2026-04-06_205845_epfn28',{
    transformation:[
        //{
        // fetch_format:'auto',  //this is used to deliver the most efficiet format(ex.:- the size of the file is    reduced)
        //another way to optimize
        //quality:'auto',

        //now we combine this two to optimize as much as possible

        //}
        {
            quality:'auto',
        },
        {
            fetch_format:'auto',
        },
        {
            width:1200,
        }
    ]
});
console.log(url);//this is the url of a image from cloudinary which we have uploaded directly

//to upload a image to cloudinary programetically

(async function(){
    try{
        const results=await cloudinary.uploader.upload('./download (5).jpg');
        console.log(results);

        const url=cloudinary.url(results.public_id,{
            transformation: [
                {
                    quality:'auto',
                    fetch_format:'auto',
                },
                {
                    width:1209,
                    height:1220,
                    crop:'fill', //this would be make it crop to look like sqaure ,else it can be skewed
                    gravity:'auto',//used to center it to the main focus of the image
                }
            ]
        })
        console.log(url);

    }
    catch(err){
        console.error("upload failing")
        console.error(err);
    }
})();