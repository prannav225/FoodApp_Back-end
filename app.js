// importing required modules
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
mongoose.set('strictQuery', false)

//setting port
const PORT = 4001;

//importing mongoose model
const Post = require('./model/posts')
const User = require('./model/users')

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // CORS: cross orign resource sharing

// Establishing database connection using Mongoose
const dbURL = "mongodb://localhost:27017/foodie"
mongoose.connect(dbURL).then(() => {
    console.log('Connected to Database');
})

// GET endpoint to retrieve all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts)
    } catch (err) {
        console.log(err);
    }
})

// GET endpoint to retrieve a single post by ID
app.get('/posts/:id', async(req, res) => {
    const { id } = req.params
    try{
        const singlePost = await Post.findById(id)
        res.send(singlePost)
    }catch(err) {
        res.send(err)
    }
})

// POST endpoint to add a new post
app.post('/addpost', async (req, res) => {
    let postData = new Post({
        author: req.body.author,
        summary: req.body.summary,
        title: req.body.title,
        image: req.body.image,
        location: req.body.location,
    })
    try {
        // Saving the new post instance to the database
        await postData.save()
        res.send({ message: "Post added Successfully" })
    } catch (err) {
        res.send({ message: "Error saving post" })
    }
})

// POST endpoint to register a new user
app.post('/signup', async (req, res) => {
    User.findOne({ email: req.body.email }, (err, userData) => {
        if (userData) {
            res.send({ message: "This Email has been already used" })
        } else {
            // Creating a new User instance using data from the request body
            const data = new User({
                name: req.body.name,
                mobile_number: req.body.mobile_number,
                email: req.body.email,
                password: req.body.password
            })
             // Saving the new user instance to the database
            data.save(() => {
                if (err) {
                    res.send("Error")
                } else {
                    res.send({ message: "User has been Resgistered Successfully" })
                }

            })
        }
    })
})

// POST endpoint to authenticate a user and allow login
app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, data) => {
        if (data) {
             // Checking if the given password matches the stored password for the user
            if (req.body.password == data.password) {
                res.send({ message: "Login Successfull" })
            } else {
                res.send({ message: "Inavlid Password or the password you entered doesn't match with the email" })
            }
        } else {
            res.send({ message: "No account seems to be matching your emial address" })
        }
    })
})

app.listen(PORT, () => {
    console.log(`running at localhost ${PORT}`);
})