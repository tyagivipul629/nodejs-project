import React from 'react';
import axios from 'axios';
import authToken from './authToken';

class Test extends React.Component{
    componentDidMount(){
        axios.post('http://10.85.92.138:8002/signup',{
            headers:{
                "access-control-allow-origin" : "*"
            },
            "Content-Type": "application/json"
        },
        {"userName":"vipul","userEmail":"vipul629@gmail.com",
        "userPassword":"Manoj1234","userPhone":1234567891})
        .then(res=>{
            console.log(res.data);
        })
    }
    render(){
        return(
            <h1>Test</h1>
        );
    }
}

export default Test;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpcHVsQGdtYWlsLmNvbSIsImlhdCI6MTYzNzQ4OTI5MX0.7wZ5A_N05JH_d1xR4iLw-Vf_OIin0MGW2kXJd_Q9xqs



