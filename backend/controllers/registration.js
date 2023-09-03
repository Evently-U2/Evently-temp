const { StatusCodes } = require('http-status-codes')

const Models = require('../models/index')


const organizer = async (req,res) => {

    const organizer = await Models.Organizer.create({ ...req.body })
    const token = organizer.createJWT()

    res.status(StatusCodes.CREATED).json({

        response: {

            ...req.body,
            isValid: true,
            token
        
        }
        
    })

}

const participant = async (req,res) => {

    const participant = await Models.Participant.create({ ...req.body })
    const token = participant.createJWT()

    res.status(StatusCodes.CREATED).json({

        response: {

            ...req.body,
            isValid: true,
            token,
        
        }
    })
    
}


module.exports = {
    
    organizer,
    participant
}