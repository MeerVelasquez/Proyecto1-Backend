import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    restaurant: { type: mongoose.Types.ObjectId, ref: 'restaurant' },
    products: [{type: mongoose.Types.ObjectId, ref: 'product' }],
    total: { type: Number, required: true },
    status: {  type: String,
        enum: ['created', 'sent', 'accepted', 'received', 'onAddress', 'completed'],
          default: 'created'},
    active : {type : Boolean, default : true},

});

export default mongoose.model('order', orderSchema);