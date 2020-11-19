import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const ContactForm = () => {
  const [result, setResult] = useState(null);

  const [state, setstate] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const sendEmail = (event) => {
    event.preventDefault();

    axios
      .post("/send", { ...state }) //sending json data to express
      .then((response) => {
        setResult(response.data); //if success
        setstate({
          name: "",
          email: "",
          subject: "",
          message: "",
        }); //setting data back to null for more entries
      })
      .catch(() => {
        setResult({
          success: false,
          message: "something went wrong :d. Try again later ;)",
        }); //in case of error
      });
    //code to trigger sending email
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setstate({
      ...state,
      [name]: value,
    });
  };

  return (
    <div>
      {result && (
        <p className={`${result.success ? "success" : "error"}`}>
          {result.message}
        </p>
      )}
      <form onSubmit={sendEmail}>
        <Form.Group controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={state.name}
            placeholder="enter your full name"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={state.email}
            placeholder="Enter your email"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={state.subject}
            placeholder="Enter subject"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={state.message}
            rows="3"
            placeholder="Enter your message"
            onChange={onInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit!
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
