const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const OrganizerSchema = new mongoose.Schema({

    organizerName: {
        type: String,
        required: [true, 'Please provide first name'],
        trim: true,
    },
    organizerHeadName: {
        type: String,
        required: [true, 'Please provide name of the head of the organization'],
        trim: true,
    },
    startingYear: {
        type: String,
        required: [true, 'Please provide organization starting year'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide description of your organization'],
        trim: true,
    },
    collegeName: {
        type: String,
        required: [true, 'Please provide your college name'],
        trim: true,
    },
    location: {
        type: String,
        required: [true, 'Please provide your location'],
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
    
});


OrganizerSchema.pre('save', async function () {

  if (!this.isModified('password')) return

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

})


OrganizerSchema.methods.createJWT = function () {

  return jwt.sign (
    
    { userId: this._id, email: this.email },
    
    process.env.JWT_SECRET,
    
    {
      expiresIn: process.env.JWT_LIFETIME,
    }

  )
}


OrganizerSchema.methods.comparePassword = async function (canditatePassword) {

  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch

}


module.exports = mongoose.model('Organizer', OrganizerSchema)

