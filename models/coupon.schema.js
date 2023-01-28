import mongoose from "mongoose";


const couponSchema =  mongoose.Schema({

    code:{
        type:String,
        required:[true,'Please provide a coupon name']
    },
    code:{
        type:String,
        required:[true,'Please provide a code']
    },
    discount:{
        type:Number,
        default:0
    },
    active:{
        type:Boolean,
        default:true
    }

},
{
    timestamps:true
}
)

module.exports = mongoose.model('coupons',couponSchema);