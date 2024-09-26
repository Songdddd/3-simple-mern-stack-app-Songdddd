require('dotenv').config({ silent: true })
const express = require('express') 
const morgan = require('morgan')
const cors = require('cors') 
const mongoose = require('mongoose')

const app = express() 
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) 
app.use(cors()) 


app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

const { Message } = require('./models/Message')
const { User } = require('./models/User')

const aboutUsData = {
  name: "Derrick Song",
  description: `Hello! My name is Derrick Song, and I am deeply passionate about software engineering and space technology. As a current BA student at NYU, majoring in Computer Science and Mathematics, I'm always eager to expand my knowledge and explore new frontiers in these fields. My academic journey has sparked a keen interest in applying technology to solve real-world problems, especially in the realm of space exploration.
  
  I’m an enthusiastic collaborator and love getting involved in diverse projects. I believe that the best innovations come from a mix of perspectives, and I’m always excited to work on anything that challenges the norm. Whether it’s building a new software tool, exploring data, or delving into the intricacies of space tech, I’m ready to dive in!
  
  Outside of my academic and professional pursuits, I have a quirky little fact to share: I’m the proud owner of five adorable guinea pigs! They bring a lot of joy to my life and are a fun reminder of the simple pleasures outside the tech world.
  
  Feel free to reach out to me at DerrickSonghaoyuan@gmail.com. I’m always open to new ideas, collaborations, or even just a chat about software, space, or guinea pigs! Let's Go!`,

  photoUrl: "https://i.imgur.com/3nGMmib.jpeg"

};

// Define the new "About Us" route
app.get('/api/about', (req, res) => {
  res.json(aboutUsData);
});

// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle saving messages
app.post('/messages/save', async (req, res) => {
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

module.exports = app // CommonJS export style!


