require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require('./models/user');
const AddedUser = require('./models/addedUsers');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

// DB CONNECTION
mongoose.connect(process.env.DATABASE, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log("DB CONNECTED")
})

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.delete("/api/addedUsers/:id", (req, res) => {
    const { id } = req.params;
   
    AddedUser.deleteOne({ _id: id })
     .then(() => res.status(200).json({ message: 'User deleted successfully' }))
     .catch(err => {
       console.error(err);
       res.status(500).json({ message: 'Error deleting user', error: err });
     });
   });

   app.put("/api/addedUsers/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
 
    // Update user
    AddedUser.updateOne({ _id: id }, { $set: { name, email, phone } })
        .then(() => res.status(200).json({ message: 'User updated successfully' }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error updating user', error: err });
        });
 });
 


app.post("/api/addedUsers", (req, res) => {
    const { name, email, phone } = req.body;

    // Check if user already exists
    AddedUser.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ message: 'User already exists' });

            // Create new user
            const newUser = new AddedUser({ name, email, phone });

            // Save the user and handle errors
            newUser.save()
                .then(user => res.status(200).json({ message: 'User added successfully', user }))
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ message: 'Error saving user', error: err });
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error finding user', error: err });
        });
});

app.get("/api/addedUsers", (req, res) => {
    AddedUser.find()
        .then(users => res.status(200).json(users))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error fetching users', error: err });
        });
 });
 


app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })

    if (!user) {
        return { status: 'error', error: 'Invalid login' }
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    )

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            'secret123'
        )

        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
})


app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // exclude password field
        res.json(users);
        console.log(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});



app.post("/api/register", (req, res) => {
    const { name, email, password, phone } = req.body;

    // Check if user already exists

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ message: 'User already exists' });

            // Hash the password
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) return res.status(500).json({ message: 'Error hashing password', error: err });

                // Create new user
                const newUser = new User({ name, email, password: hash, phone });

                // Save the user and handle errors
                newUser.save()
                    .then(user => res.status(200).json({ message: 'ok', user }))
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({ message: 'Error saving user', error: err });
                    });
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error finding user', error: err });
        });
});

const auth = require("./routes/auth")
app.use("/api", auth)

const port = 5000

app.listen(port, () => {
    console.log(`app is running at port ${port}`)
});
