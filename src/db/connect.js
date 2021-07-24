const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/formRegistration',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>{console.log('connection successful')})
  .catch((err)=>{console.log(err)});