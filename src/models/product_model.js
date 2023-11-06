import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    restaurant: { type: mongoose.Types.ObjectId, ref: 'restaurant' },
    price: { type: Number, required: true },
    active: {type: Boolean, default: true},

 });

export default mongoose.model('product', productSchema);