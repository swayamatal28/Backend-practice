const JWT=require("jsonwebtoken");
const secret="gambling";


function createtoken(user){
    const payload={
        _id:user._id,
        email:user.email,
        name:user.name,
    };
    const token=JWT.sign(payload,secret);
    return token;
}

function validatetoke(token){
    const payload=JWT.verify(token,secret);
    return payload;
}

module.exports={createtoken,validatetoke,};