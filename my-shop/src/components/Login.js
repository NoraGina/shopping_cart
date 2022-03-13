import React, {useState} from 'react';
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {BASE_URL} from '../constants';
import {withUser} from "../hoc/withUser";

const Login = (props)=>{
    const [email, setEmail] = useState('');
    const [password, setPassword ]= useState('');
    const [userStatus, setUserStatus] = useState(null);

    let navigate = useNavigate();

    const goHome = () => {
      navigate("/");
    };
    const canSubmit = email && password;

    const onSubmit = ()=>{
        fetch(`${BASE_URL}/users`,{
            method:'GET'
        })
        .then((response)=>response.json())
        .then((users)=>{
            const loggedUser = users.find(user=>{
                return user.email === email && user.password === password
            });
            if(loggedUser){
                setUserStatus('logged');
                localStorage.setItem("user", JSON.stringify(loggedUser));
                goHome();
            }else {
                setUserStatus("wrong-credentials")
              }
        })
        .catch(err => console.log(err))
    }

    return<Container className="mt-5">
    <h2>Hello {props?.user?.email}</h2>
<Row className="bg-primary bg-opacity-25 p-5" style={{maxWidth: "600px", margin: "0 auto"}}>
  <Col>
    <h2>Login</h2>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password}
                      onChange={e => setPassword(e.target.value)}/>
      </Form.Group>

      <Button variant="success" type="button" disabled={!canSubmit} onClick={onSubmit}>
        Login
      </Button>
      <br/>
      <p>Not registered? Go to <Link to="/">Register</Link></p>

      {userStatus === "logged" && <Alert variant={"success"}>
        User was logged in successfully
      </Alert>}

      {userStatus === "wrong-credentials" && <Alert variant={"danger"}>
        Wrong credentials
      </Alert>}
    </Form>
  </Col>
</Row>
</Container>
}
export default withUser(Login);