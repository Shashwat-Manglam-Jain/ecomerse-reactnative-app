const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Port = 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const User = require("./Models/User");
const Order = require("./Models/Order");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// mongodb connection
mongoose
  .connect("mongodb+srv://shashwat100k:shashwat@cluster0.oivzaab.mongodb.net/")
  .then(() => {
    console.log("Connection successfully made");
  })
  .catch((err) => {
    console.log("Connection failed", err);
  });

const sendVerificationToken = (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shashwat100k@gmail.com",
      pass: "chvu kcvx vugv sxnb",
    },
  });

  async function main() {
    const info = await transporter.sendMail({
      from: "shashwat100k@gmail.com",
      to: email,
      subject: "Email Verification ✔",
      text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
    });

    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
};

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = await req.body;

    //    check if email exist then user already exist
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      console.log(`User Already exists with email ${email}`);
      return res.status(400).json({ message: "User Already signup" });
    }
    // create new user
    const newUser = new User({ name, email, password });

    // Generate and store verification token
    newUser.verificationToken = crypto.randomBytes(30).toString("hex");

    // save the user to the data base

    await newUser.save();
    // Debugging the statement to verify

    console.log("New user successfully registered", newUser);

    // send verification token to the user
    // and reverify user

    sendVerificationToken(newUser.email, newUser.verificationToken);
    console.log(
      "Email Successfully send . Please check your email address to verify?"
    );
    res.status(200).json({
      message:
        "Email Successfully send . Please check your email address to verify?",
    });
  } catch (error) {
    console.log("Failed in doing singup", error);
    res.status(500).json({ message: "Failed in doing singup" });
  }
});

// end point to verify token

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    // find user with the same token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      // Sends response here
      return res.send(404).json({ message: "Invalid verification token!!" });
    }
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    console.log("Successfully Verified the User Email!!");
    // Sends response here
    return res
      .send(200)
      .json({ message: "Successfully Verified the User Email!!" });
  } catch (error) {
    console.log("Failed to Verified the User Email!", error);
    // Sends response here
    res.status(500).json({ message: "Failed to Verified the User Email!" });
  }
});

// generate key
const generatekey = () => {
  const generate = crypto.randomBytes(30).toString("hex");
  return generate;
};

const generate = generatekey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // check if email not exist
    if (!user) {
      console.log("User not Found !!");
      res.status(401).json({ message: "User not Found !!" });
    }
    //  if password not equal

    if (user.password !== password) {
      console.log("Password dont exists !!");
      res.status(404).json({ message: "Password dont exists !!" });
    }

    const token = jwt.sign({ userId: user._id }, generate);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
});

// Endpoint to store the address to the backend
app.post("/address", async (req, res) => {
  try {
    const { userId, address } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.address.push(address);
    await user.save();
    res.status(201).json({ message: "Successfully added address", user });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Error in adding address" });
  }
});

// Endpoint to get the address
app.get("/address/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const address = user.address;
    res.status(200).json({ address });
  } catch (error) {
    console.error("Error retrieving address:", error);
    res.status(500).json({ message: "Error retrieving address" });
  }
});

// endpoint to store order into backend
app.post("/Order", async (req, res) => {
  try {
    const { userId, cartItem, totalPrice, shippingAddress, paymentmethod } =
      req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "user not found!!" });
    }

    // creating array of the cart
    const product = cartItem.map((val) => ({
      name: val.name,
      image: val.image,
      price: val.price,
      quantity: val.quantity,
    }));

    // create an order
    const order = new Order({
      user: userId,
      Product: product,
      totalprice: totalPrice,
      ShippingAddress: shippingAddress,
      Paymentmethod: paymentmethod,
    });
    await order.save();
    res.status(200).json({ message: "Order Successfully Created!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in creating Order" });
  }
});

app.get("/Order/:userId", async (req, res) => {
  try{
    const userId = req.params.userId;

    const orders = await Order.find({user:userId}).populate("user");

    if(!orders || orders.length === 0){
      return res.status(404).json({message:"No orders found for this user"})
    }

    res.status(200).json({ order:orders });
  } catch(error){
    res.status(500).json({ message: "Error",error});
  }
})

app.get("/Profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by userId
    const datafind = await User.findById(userId);

    // Check if the user was not found
    if (!datafind) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the found user data
    res.status(200).json({ user: datafind });
  } catch (error) {
    // Handle errors
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(Port, () => {
  console.log(`Server is running on port ${Port} `);
});
