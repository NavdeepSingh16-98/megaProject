import mongoose from "mongoose";


const productSchema = mongoose.Schema(
    {

        name:{
            type:String,
            required:[true,"Please provide a product name"],
            trim:true,
            maxLength:[120,"product name should be max of 120 characters"]
        },
        price:{
            type:Number,
            required:[true,"Please provide a product price"],
            maxLength:[5,"product price should not be more than 5 digits"]
        },
        description:{
            type:String
            // use some form of editor
            // markdown to html
            // or any other form of editor
        },
        photos:[{

            // we can use cloudnary here for the url of image
            secure_url:{
                type:String,
                required:true
            }
        }],

        stock:{
            type:Number,
            default:0
        },
        sold:{
            type:Number,
            default:0
        },
        collectionId:{
            ref:"Collection",
            type:mongoose.Schema.Types.ObjectId

            // use collection not  collections , as we are referring only schema not data base
        }

},
{
    timestamps:true
}
)

module.exports = mongoose.model('product',productSchema);