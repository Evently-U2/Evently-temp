const { StatusCodes } = require('http-status-codes')

const Models = require('../models/index')
const Errors = require('../errors/index')


const organizer = async (req, res) => {

    const { email, password } = req.body
  
    const organizer = await Models.Organizer.findOne({ email })

    if (!organizer) {

      throw new Errors.UnauthenticatedError('Invalid Credentials')
    
    }
    
    const isPasswordCorrect = await organizer.comparePassword(password)
    
    if (!isPasswordCorrect) {
    
        throw new Errors.UnauthenticatedError('Invalid Credentials')
    
    }

    const token = organizer.createJWT()

    res.status(StatusCodes.OK).json({

        response: {

            ...req.body,
            isValid: true,
            token

        }

    })
}



const participant = async (req, res) => {

    const { email, password } = req.body
  
    const participant = await Models.Participant.findOne({ email })

    if (!participant) {

      throw new Errors.UnauthenticatedError('Invalid Credentials')
    
    }
    
    const isPasswordCorrect = await participant.comparePassword(password)
    
    if (!isPasswordCorrect) {
    
        throw new Errors.UnauthenticatedError('Invalid Credentials')
    
    }

    const token = participant.createJWT()

    res.status(StatusCodes.OK).json({

        response: {

            ...req.body,
            isValid: true,
            token
        
        }
        
    })
}

module.exports = {
    
    organizer,
    participant
}