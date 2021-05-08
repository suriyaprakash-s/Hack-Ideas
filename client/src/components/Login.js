import React from 'react';
import {Form,} from 'semantic-ui-react'
import '../styles/Login.css'

const Login =()=>{
    const [requestOtp, setRequestOtp]= React.useState(false);
    const [empId, setEmpId]= React.useState('');
    const [error, setError]= React.useState(false);

    const onChangeEmpId = (e)=>{
        setEmpId(e.target.value);
        if(requestOtp)
            setRequestOtp(false);
    }
    const handleOtpRequest=()=>{
        if(empId)
        {
            setError(null);
            setRequestOtp(true);
        }
        else{
            setError(true);
        }
    };
    
    return(
        <div className="login" >
            <h3><i>Hackathons are where your crazy idea becomes reality</i></h3>
            <h4>Let's go crazy...</h4>
            <Form error>
            <Form.Group inline>
                <Form.Input icon="user" iconPosition="left" className=".input" error={error}
                    placeholder='Enter your Employee ID' value={empId} onChange={onChangeEmpId}/>
                {!requestOtp && <Form.Button onClick={()=>handleOtpRequest()}>Send OTP</Form.Button>}
            </Form.Group>
            {requestOtp && <Form.Group>
                <Form.Input inline icon="envelope" iconPosition="left"
                    className=".input" placeholder='One Time Password' type="password"/>
                <Form.Button>Verify OTP</Form.Button>
            </Form.Group>}
            </Form>
        </div>
    );
};

export default Login;