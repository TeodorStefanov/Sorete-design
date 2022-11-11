const mongoose = require('mongoose')
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        match: [/^[A-Za-z0-9 ]+$/, 'Item name is not Valid']
    },
    description: {
        type: String,
        require: true,
        match: [/^[A-Za-z0-9 ]+$/, 'Item name is not Valid'],
        minLength: 5
    },
    imageUrl: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
})

itemSchema.path('imageUrl').validate(function (url) { 
    return url.includes('http') || url.includes('https') 
}, 'Image url is not valid')
module.exports = mongoose.model('Item', itemSchema) 