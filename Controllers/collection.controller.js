import Collection from '../models/collection.schema';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';

/********************************* 

* @Create_COLLECTION 
* @route http://localhost:4000/api/collection
* @description  controller for creating a new collection
* @parameters name
* @return Collection Object

************************************/

export const createCollection = asyncHandler(async(req,res)=>{

//take name from frontend
    const {name} = req.body;

    if(!name){
        throw new CustomError("Collection is required",400);
    }

    //add this name to database

    const collection = await Collection.create({
        name
    })

    //send this response value to frontend

    res.status(200).json({
        success:true,
        message:"Collection created with success",
        collection
    })
})

/********************************* 

* @Update_COLLECTION 
* @route http://localhost:4000/api/collection/update
* @description  controller for updating a  collection
* @parameters 
* @return Collection Object

************************************/

export const updateCollection = asyncHandler(async(req,res)=>{
// while updating keep in mind what should i update and what existing value should i update

//existing value to be updated
// new value to get updated

//body will have new value and id will come inside params


const {id:collectionId} = req.params;

const {name} = req.body;

if(!name){
    throw new CustomError("Collection name is required",400);
}

let updatedCollection = Collection.findByIdAndUpdate(collectionId,{name},{
    new:true,
//response should contain new updated value
runValidators:true
})



})

