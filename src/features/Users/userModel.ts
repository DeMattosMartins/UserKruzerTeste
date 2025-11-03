import mongoose from 'mongoose';

const User = new mongoose.Schema({
   name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cpf: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
},
{ 
  timestamps: true,
  versionKey: false
});

const UserModel = mongoose.model('Users', User);

export default UserModel;
