const mongoose   = require('mongoose');
var mongoUri    = "mongodb+srv://sochifree:08065376637@sochifree.jgsvkmc.mongodb.net/test";

const connectDB  = async ()=>{
    try{
       //mongodb connection string
       return await mongoose.connect(mongoUri, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: false,
        useCreateIndex: true
       })

       //console.log('MongoDBconnected:${con.connection.host}');

    }catch(err){
       console.log(err);
       //process.exit(1);
    }
}

module.exports  = connectDB