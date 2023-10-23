import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email : { type : String, required : true},
    name : {type : String, required : true},
    password : {type: String, required : true,unique : true},
    cellphone : {type: String, required : true},
    address: {type: mongoose.Schema.Types.ObjectId, ref: 'address' },
    role : { type: String, enum: ['client', 'admin'], default: 'client' },
});

export default mongoose.model('user', userSchema);