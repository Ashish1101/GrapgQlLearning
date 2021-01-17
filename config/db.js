const mongoose = require('mongoose');


const mongoDB = async () => {
   const connection = await mongoose.connect(process.env.MONGO_URI , {
       useNewUrlParser : true,
       useUnifiedTopology: true
   })
   if(connection) {
       console.log('connected to database')
   } else {
       console.error('Server not responding')
   }
}

module.exports = mongoDB