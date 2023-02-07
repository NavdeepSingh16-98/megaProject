import mongoose from 'mongoose';
import status from '../utils/status'; 

const orderSchema = new mongoose.Schema({

products:{
    type:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        count:Number,
        price:Number
    }],
    required:true

},

user:{
    ref:"User",
    type:mongoose.Schema.Types.ObjectId,
    required:true
},
address:{
    type:String,
    required:true
},
phoneNumber:{

    type:Number,
    required:true
},
amount:{

    type:Number,
    required:true
},
coupon:String,
transactionId:String,
status:{
    type:String,
    enum:Object(status).values(),
    default:status.ORDERED

    //can we improve this?

}
//paymentMode:UPI, creditcard or wallet, COD
    
},
{
    timestamps:true
}
)

module.exports = mongoose.model('order',orderSchema);