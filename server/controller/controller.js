var Userdb   =  require('../model/model');

//create and save new user
exports.create= (req, res)=>{
   //validate request
   if(!req.body){
    res.status(400).send({message:'content cannot be empty'});
    return;
   }

   //new user
   const user = new Userdb({
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    status:req.body.status
   })

   //save user in the database
   user
   .save(user)
   .then(data=>{
     res.send(data)
   })
   .catch(err=>{
    res.status(500).send({
        message:err.message ||"error occured while creating a create operation"

    });
   });

}

//retrive and return all user/ retrive and return single user
exports.find=(req, res)=>{
    //to get the profile of a specific user
    if(req.body.id){
      const id = req.body.id;

      Userdb.findById(id)
       .then(data=>{
        if(!data){
            res.status(404).send({message:"nNot found user with id"+id})
        }else{
            res.send(data)
        }
       })
       .catch(err=>{
         res.status(500).send({message:"Error retrieving user with id"+id})
       })
       
    }else{
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "Error occured while retriving user information"})
    });

    }
}

//update a new identified user by user ID
exports.update=(req, res)=>{
    if(!req.body){
        return res
         .status(400)
         .send ({message:"Data to update cannot be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
      .then(data=>{
        if(!data){
            res.status(404).send({message:"cannot update user with ${id}.Maybe user not found"})
        }else{
            res.send(data)
        }
      })

      .catch(err=>{
        res.status(500).send({message:'Error Update user information'})
      });
}

//delete a user with specified user ID in the request
exports.delete=(req, res)=>{
   const id = req.params.id;

   Userdb.findByIdAndDelete(id)
    .then(data=>{
         if(!data){
            res.status(404).status({message:"cannot delete with id $(id).Maybe id is wrong"})
         }else{
            res.send({
                message:"User deleted successfully!"
            })
         }
    })


    .catch(err=>{
        res.status(500).send({
            message:"could not delete user with id=" +id
        });
    });
}