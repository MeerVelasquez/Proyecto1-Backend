import mongoose from 'mongoose';

const restaurantSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'address' },
    category: {type : String , required : true},
    active: {type: Boolean, default: true},
});

export default mongoose.model('restaurant', userSchema);