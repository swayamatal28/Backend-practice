const {Schema,model}=require("mongoose");
const {createHmac, randomBytes}=require('crypto');
const{createtoken}=require("../services/user");
const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamp:true})

userSchema.pre('save',function(next){
    const user=this;
    if(!user.isModified('password')) return;
    const salt=randomBytes(16).toString();
    const hashedPassword=createHmac('sha256',salt).update(user.password).digest("hex");
    this.salt=salt;
    this.password=hashedPassword;
});

userSchema.static('matchPassAndGiveMeToken',async function(email,password){
    const user=await this.findOne({email});
    if(!user) throw new Error ('data ,mandatory!');

    const salt=user.salt;
    const hashedPassword=user.password;
    const userhash=createHmac('sha256',salt).update(password).digest("hex");
    if(userhash!=hashedPassword)
    {
        throw new Error('Incorrect');
    }
    const token=createtoken(user);
    return token;
    next();
})

const User=model("user",userSchema);
module.exports=User;