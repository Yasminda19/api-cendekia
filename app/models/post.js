const mongoose = require ('mongoose');

const PostSchema = mongoose.Schema ({
     
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    Publish_date: { 
        type: Date, 
        default: Date.now 
    },
       
})
    {timestamps: true}
;
module.exports = mongoose.model('Post', PostSchema);
