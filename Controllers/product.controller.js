import Product from "../models/products.schema"

import formidable from 'formidable'

import fs from 'fs'

import {deleteFile, s3FileUpload} from "../services/imageUpload"

import  Mongoose  from "mongoose"

import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';

import config from '../config/config'


/***************************************
 * @ADD_PRRODUCT
 * @route https://localhost:5000/api/product
 * @description Controller used for creating a new product
 * @description only admin can create the coupon
 * @description uses AWS S3 Bucket for image upload
 * @returns Product Object
 ***************************************/

export const addProduct = asyncHandler(async(req,res)=>{
const form = formidable({
    multiples:true,
    keepExtensions:true

});

form.parse(req, async function(err,fields,files){
    try{
        if(err){
            throw new CustomError(err.message || "Something went wrong",500);
        }

      let productId =  new Mongoose.Types.ObjectId().toHexString();

      console.log()


      //check for fields

      if(!fields.name || !fields.price || !fields.description || fields.collectionId){
        throw new CustomError("Please fill all details",500)
      }

      //handling images

      let imgArrayResp = Promise.all(

        Object.keys(files).map(async (filekey,index)=>{

            const element = files[filekey];

            const data = fs.readFileSync(element.filepath);

            const upload = await s3FileUpload({
                bucketName:config.S3_BUCKET_NAME,
                body:data,
                key:`products/${productId}/photo_${index + 1}.png`,
                contentType:element.mimetype
            });

            return {
                secure_url:upload.Location
            }
        })
      );

      let imgArray = await imgArrayResp;

      const product = await Product.create({
        _id:productId,
        photos:imgArray,
        ...fields
      })


      if(!product){

        throw new CustomError("Product was not created",400);


      }

      res.status(200).json({
        success:true,
        product
      })

      //3454a35/photo_1
    }
    catch(err){

        return res.status(500).json()

    }
})
    
})


/***************************************
 * @GET_ALL_PRRODUCT
 * @route https://localhost:5000/api/product
 * @description Controller used for getting all product details
 * @description user and admin can get all the products
 * @returns Product Array inside Object
 ***************************************/


export const getAllProducts = asyncHandler(async (req,res)=>{

  const products = Product.find({});

  if(!products){
    throw new CustomError("No Product was found",404);

  }

  res.status(200).json({
    success:true,
    products
  })
})

/***************************************
 * @GET_PRODUCT_BY_ID
 * @route https://localhost:5000/api/product/:id
 * @description Controller used for getting single product details
 * @description user and admin can get  the product
 * @returns Product Object
 ***************************************/

export const getProductById = asyncHandler(async(req,res)=>{


  const {id:productId} = req.params;
  const product = await Product.findById(productId);

  if(!product){
    throw new CustomError("No Product was found",404);

  }

  res.status(200).json({
    success:true,
    product
  })


})

// assignment to read

/*

model.aggregate([{},{},{}]);


$group
$push
$$ROOT
$lookup
$project


*/

/***
 * After Bootcamp study mongodb in detail mainly 
 * indexes and aggregate
 */


