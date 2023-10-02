import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';

import { setAuthToken } from './Auth';
function SignIn() {

    
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
      })
      const [errors, setErrors] = useState({})

    const url = "/user/signin"

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
    }

       function getSigninData(e) {
        e.preventDefault()
        const validationErrors = {}
        if(!formData.phone.trim()) {
            validationErrors.phone = "phone number is required"
        } else if(formData.phone.length < 10){
            validationErrors.phone = "phone number should be at least 10 char"
        }
        
        if(!formData.password.trim()) {
            validationErrors.password = "password is required"
        } else if(formData.password.length < 6){
            validationErrors.password = "password should be at least 6 char"
        }
    
        setErrors(validationErrors)
        if(Object.keys(validationErrors).length === 0) {
            fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
             "Content-Type": "application/json"
            },
            body: JSON.stringify({
                phone: formData.phone,
                password: formData.password
            })

        }).then((result) => {
            result.json().then((resp) => {
                if(resp.error){
                    alert(resp.error)
                }
                else{
                     setAuthToken(resp.accessToken);
                    alert("Signin Successfully")
                     navToPsge()
                }

            })
        })
        }

       }

    const navigate = useNavigate()
    const navToPsge = () => {
        navigate("/")
    }

    return (


        <Container style={{padding:"70px", width:"40%" , border: "2px  solid black" , marginTop:"20px",borderRadius: "10px " }}>
                    <h1> Sign In</h1>
                    <Form onSubmit={getSigninData}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control type="number" placeholder="Enter Your Mobile Number"name="phone" onChange={handleChange} />{errors.phone && <span style={{color:"red"}}>{errors.phone}</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" placeholder="Enter Your password" name="password"  onChange={handleChange} />{errors.password && <span style={{color:"red"}}>{errors.password}</span>}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
        

        </Container>

    );
}

export default SignIn;

