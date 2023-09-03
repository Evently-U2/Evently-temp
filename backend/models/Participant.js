const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const ParticipantSchema = new mongoose.Schema({

  firstName: {
      type: String,
      required: [true, 'Please provide first name'],
      trim: true,
  },
  middleName: {
      type: String,
      default: "none",
      trim: true,
  },
  lastName: {
      type: String,
      required: [true, 'Please provide last name'],
      trim: true,
  },
  collegeName: {
      type: String,
      required: [true, 'Please provide your college name'],
      trim: true,
  },
  email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
      trim: true,
  },
  password: {
      type: String,
      required: [true, 'Please provide password'],
      trim: true,
  },
  gender: {
      type: String,
      default: 'other',
      trim: true,
  },
  birthDate: {
      type: String,
      required: [true, 'Please provide birthdate'],
      trim: true,
  },
  completionYear: {
      type: String,
      required: [true, 'Please provide completion year'],
      trim: true,
  },
});



ParticipantSchema.pre('save', async function () {

  if (!this.isModified('password')) return

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

})



ParticipantSchema.methods.createJWT = function () {

  return jwt.sign (

    { userId: this._id, email: this.email },
    
    process.env.JWT_SECRET,
    
    {
      expiresIn: process.env.JWT_LIFETIME,
    }

  )
}



ParticipantSchema.methods.comparePassword = async function (canditatePassword) {

  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch

};



module.exports = mongoose.model('Participant', ParticipantSchema)
