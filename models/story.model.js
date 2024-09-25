import mongoose from 'mongoose';



const storySchema = new mongoose.Schema({

  username: {
    type: mongoose.Schema.Types.String,
    ref: 'User', // Refers to the user who created the post
    required: true
  },
  content: {
    type: String,
    required: true, // Post content
    maxlength: 500 // Limit the post content length
  },
  image: {
    type: String, // URL of the post image (optional)
    default: null
  },
  video: {
    type: String, // URL of the post image (optional)
    default: null
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Array of users who liked the post
    
  }],
  createdAt: { 
    type: Date,
     default: Date.now, expires: '24h' 
    },  // TTL index for automatic deletion after 24 hours

  viewers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
}], // List of users who viewed the story

  updatedAt: {
    type: Date
  }
});


export const Story=mongoose.model("Story",storySchema)


