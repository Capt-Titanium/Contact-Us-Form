const path = require("path");
const express = require("express");
const app = express();
const transporter = require("./config");
const dotenv = require("dotenv");
dotenv.config();

const buildPath = path.join(__dirname, "..", "build");
//setting up JSON parser to handle the form data
app.use(express.json());

/*
IMPORTANT :-
    telling express to serve all the files from 
    the build folder which will be created when 
    we run npm run build command.
*/
app.use(express.static(buildPath));

//sending post request
app.post("/send", (req, res) => {
  try {
    const mailOptions = {
      from: req.body.email,
      to: process.env.email,
      subject: req.body.subject,
      html: `
      <p>You have a new contact request.</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: ${req.body.subject}</li>
        <li>Message: ${req.body.message}</li>
      </ul>
      `,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).send({
          success: false,
          message: "something went wrong :d. Try again later ;)",
        });
      } else {
        res.send({
          success: true,
          message: "thanks for contacting us. we will get back to you shortly",
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "something went wrong :d. Try again later ;)",
    });
  }
});

//starting express app on port 3030
app.listen(3030, () => {
  console.log("server start on port 3030");
});

/*
We will be running react and express on same port
so we don't get CORS (Cross-Origin Resource Sharing)
error  which  comes when an application is running
on one port, accesses application running on
another port.
*/
