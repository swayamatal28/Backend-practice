const {Schema,model}=require("mongoose");
const {createHmac,randomBytes}=require("crypto");
const {createToken}=require("../services/user")
const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    salt:{
        type:String,
    },

},{timestamp:true});

userSchema.pre('save',function(next){
    const user=this;
    if(!user.isModified("password")) return ;
    const salt=randomBytes(16).toString();
    const hashedPassword=createHmac('sha256',salt).update(user.password).digest("hex");
    this.salt=salt;
    this.password=hashedPassword;
})

userSchema.static('match',async function(email,password){
    const user=await this.findOne({email});
    if(!user) throw new Error('No email registered with thi email');
    const salt=user.salt;
    const hashedPassword=createHmac('sha256',salt).update(password).digest("hex");
    if(hashedPassword!=user.password){
        throw new Error('Incorrct pass');
    }
    const token=createToken(user);
    return token;
})

const User=model("user",userSchema);
module.exports=User;