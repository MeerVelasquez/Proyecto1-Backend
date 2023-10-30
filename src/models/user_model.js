import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    email : { type : String, required : true},
    name : {type : String, required : true},
    password : {type: String, required : true,unique : true},
    cellphone : {type: String, required : true},
    address: [{type: String, required : true}],
    role : { type: String, enum: ['client', 'admin'], default: 'client' },
    active : { type: Boolean, default: true },
});

export default mongoose.model('user', userSchema);