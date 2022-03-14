import React, {useState} from 'react';
import {Button, Col, Container, Form, Row, Alert} from "react-bootstrap";
import {Link} from "react-router-dom";
import {BASE_URL} from '../constants';

import { withUser } from '../hoc/withUser';

const Register = (props)=>{
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('female');
  const[role, setRole]= useState('customer');
  const[fullName, setFullName] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [user, setUser] = useState(null)

  const canSubmit = email && password && gender && role && fullName && agreedToTerms;

  const onSubmit = () => {
    const newUser = {
      email,
      password,
      gender, 
      role, 
      fullName
    }

    fetch(`${BASE_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-type': 'application/json;',
      },
    })
      .then((response) => response.json())
      .then((user) => {
        setUser(user)
      })
      .catch(err => console.log(err))
  }

    return<Container className="mt-5">
    <h2>Hello {props?.user?.fullName}</h2>
    <Row className="bg-success bg-opacity-25 p-5" style={{maxWidth: "600px", margin: "0 auto"}}>
      <Col>
        <h2>Register</h2>
        <Form>
        <Form.Group className="mb-3">
            <Form.Label>Fullname</Form.Label>
            <Form.Control type="text" placeholder="Enter fullName" value={fullName} onChange={e => setFullName(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="text" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password}
                          onChange={e => setPassword(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="radio"
              name="gender"
              label="Male"
              value="male"
              checked={gender === "male"}
              onChange={e => setGender(e.target.value)}
            />
            <Form.Check
              type="radio"
              name="gender"
              label="Female"
              value="female"
              checked={gender === "female"}
              onChange={e => setGender(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="radio"
              name="role"
              label="Are you Buying?"
              value="customer"
              checked={role === "customer"}
              onChange={e => setRole(e.target.value)}
            />
            <Form.Check
              type="radio"
              name="role"
              label="Are you Sell?"
              value="admin"
              checked={role === "admin"}
              onChange={e => setRole(e.target.value)}
            />
          </Form.Group>


          

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Terms and conditions" checked={agreedToTerms}
                        onChange={e => setAgreedToTerms(e.target.checked)}/>
          </Form.Group>

          <Button variant="primary" type="button" disabled={!canSubmit} onClick={onSubmit}>
            Register
          </Button>

          

          <p>Already registered? Go to <Link to="/login">Login</Link></p>

          {user && <Alert variant={"success"}>
            User {user.fullName} was successfully registered
          </Alert>}

        </Form>
      </Col>
    </Row>
  </Container>
}

export default withUser(Register);