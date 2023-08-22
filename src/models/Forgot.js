import { Schema, model, models } from 'mongoose'

const ForgotSchema = new Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    uid: {
        type: String,
        required: true,
        unique: true,
        ref: 'User' 
    },
    expiresAt: {
        type: Date,
        default: new Date(new Date().getTime() + 10*60000).toISOString()
    },
    expired: {
        type: Boolean,
        default: false
    }
})

module.exports = models.Forgot || model('Forgot', ForgotSchema)
