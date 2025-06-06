const mongoose =require("mongoose");
const jwt=require("jsonwebtoken");
const joi=require("joi");
const passwordComplexity=require("joi-password-complexity");

const userSchema=new mongoose.Schema({
    firstName:{type:String,reuired:true},
    lastName:{type:String,reuired:true},
    email:{type:String,reuired:true},
    password:{type:String,reuired:true},
});


userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"});
    return token;
};

const User= mongoose.model("user ",UserSchema);


const validate=(data)=>{
    const schema=joi.object({
        firstName:joi.string().required().label("First name"),
        LastName:joi.string().required().label("Last name"),
        email:joi.string().email().required().label("Email"),
        password:passwordComplexity().required().label("First name"),
    })
    return schema.validate(data);
}