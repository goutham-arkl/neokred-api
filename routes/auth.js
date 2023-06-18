const router = require('express').Router()
const User=require('../models/User')
const CryptoJS=require('crypto-js')
const jwt=require('jsonwebtoken')

//register

router.post('/register',async(req,res)=>{

    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,'secret').toString(),
        dob:req.body.dob,
        mobile:req.body.mobile,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        zipCode:req.body.zipCode,
        country:req.body.country,
        securityAnswer:req.body.SecurityAnswer
    })

    try{
        const savedUser=await newUser.save();
        res.status(201).json(savedUser)
    }catch(err){
        res.status(500).json(err)
    }
})

//login

router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json("Invalid credentials");
      }
  
      const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_JS_SECRET).toString(CryptoJS.enc.Utf8);
      const validPassword = hashedPassword !== req.body.password;
      if (validPassword) {
        return res.status(401).json('Wrong password');
      }
  
      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "5s" });
      const { password, ...others } = user._doc;
      console.log(accessToken,"🐾🐾");
      return res.status(200).json({ ...others, accessToken });
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  
  

router.get('/verify',(req,res)=>{
    try {
        const authHeader=req.headers.token
        console.log(req.headers)
        if(authHeader){
            const token=authHeader.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
                if(err){
                    console.log('invalid token')
                    res.status(403).json('Invalid token')
                }
                req.user=user;
                res.status(200).json('valid')
            })
        }else{
             res.status(401).json('You are not authenticated')
        }
    } catch (error) {
        
    }
})

module.exports=router