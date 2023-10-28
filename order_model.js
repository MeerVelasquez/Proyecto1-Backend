import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurant' },
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
    total: { type: Number, required: true },
    status: {  
        enum: ['created', 'sent', 'accepted', 'received', 'onAddress', 'completed'],
          default: 'created'},
    active : {type : Boolean, default : true},

});

export default mongoose.model('order', orderSchema);