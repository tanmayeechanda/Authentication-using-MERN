const router=require("express");
const {User} = require("../modules/user");
const joi=require("joi");

router.post("/",async(req,res) => {
    try {
        const{error}=validate(req.body);
        if(error)
            return res.status(400).send({mesaage:error.details[0].message});

        const user= await user.findOne({email:req.body.email})
        if(!user)
            return res.status(401).send({message:"Inavlid Email or Password"});

        const validPassword= await bcrypt.comapre(
            req.body.password,user.password
        )
        if(!validPassword)
            return res.status(401).send({message:"Inavlid Email or Password"})

        const token=user.generateAuthToken();
        res.status(200).send({data:token,message:"Logged in success"})
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
    }
})

const validate=(data) => {
    const Schema=joi.object({
        email:joi.string().email().required().label("Email"),
        password:joi.string().password().required().label("Password")
    })
    return Schema.validate(data);
}