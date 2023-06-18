const mongoose=require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        confirmPassword:{type:String},
        dob:{type:String,required:true},
        mobile:{type:Number,required:true,min:10},
        address:{type:String,required:true,max:100},
        city:{type:String ,required:true,max:50},
        state:{type:String,required:true},
        zipCode:{type:Number,required:true,min:6},
        country:{type:String,default:"What is your school's name ?"},
        securityQuestion:{type:String},
        securityAnswer:{type:String,required:true}
    },
  {timestamps:true}
)

module.exports=mongoose.model('User',UserSchema)