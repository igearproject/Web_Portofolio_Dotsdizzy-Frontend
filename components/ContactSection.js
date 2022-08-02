import Alert from './Alert';
import Image from 'next/image'
import React, { useState } from 'react'
import { Col, Container, Row, FloatingLabel, Form, Button, Spinner } from 'react-bootstrap'
import { BiSend } from "react-icons/bi";
import emailHandling from '../services/emailHandling';

const ContactSection = () => {
    const [data,setData]=useState({
        name:'',
        email:'',
        subject:'',
        emailTo:process.env.NEXT_PUBLIC_EMAIL_ME,
        message:''
    });
    const [loading,setLoading]=useState(false);
    const [msg,setMsg]=useState({
        status:'',
        msg:''
    });

    const handleChange=async(e)=>{
        setData(prev=>({...prev, [e.target.name]:e.target.value}));
        // console.log(data);
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)
        try{
            const response=await emailHandling.send(data.email,data.name,data.subject,data.emailTo,data.message);
            // console.log(response)
            setLoading(false)
            setMsg({
                status:'success',
                msg:"Message sent successfully"
            });
            e.target.reset();

        }catch(err){
            if(err.response?.data?.message){
                setMsg({
                    status:'error',
                    msg:err.response.data.message
                });
            }else{
                setMsg({
                    status:'error',
                    msg:err.message
                });
            }
            setLoading(false)
        }

    }
    return (
        <Container fluid className="bg-secondary ">
            <Row className="align-items-center pt-5 pb-5">
                <Col md={6} className="p-md-5">
                    <Image src="/img/ilustration/tiny/contact me.png" alt="illustration contact me" height="250px" width="250px" layout="responsive"/> 
                </Col>
                <Col md={6} className="mt-sm-4 p-md-5">
                    <form onSubmit={(e)=>handleSubmit(e)}>
                    <span className="text-primary subheading ">Contact Me</span>
                    <h2 className="mb-2 text-white">Email Form</h2>
                    <p className="mb-4 descheading text-white">I can reply to your message faster, every Monday to Friday from 7 AM - 7 PM.</p>
                    <Alert status={msg.status} msg={msg.msg}/>
                    <Row>
                        <Col md={6}>
                        <FloatingLabel
                            controlId="floatingName"
                            label="Your Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" name="name" onChange={handleChange} maxLength={250} required placeholder="Your Name" />
                        </FloatingLabel>
                        </Col>
                        <Col md={6}>
                        <FloatingLabel
                            controlId="floatingEmail"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control type="email" name="email" onChange={handleChange} maxLength={250} required placeholder="name@example.com" />
                        </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                        <FloatingLabel
                            controlId="floatingSubject"
                            label="Subject/ Purpose"
                            className="mb-3"
                        >
                            <Form.Control type="text" name="subject" onChange={handleChange} maxLength={250} required placeholder="Subject" />
                        </FloatingLabel>
                        </Col>
                        <Col md={6}>
                        <FloatingLabel
                            controlId="floatingEmailTo"
                            label="My Email address"
                            className="mb-3"
                        >
                            <Form.Control type="email" name="emailTo" onChange={handleChange} value={data.emailTo} maxLength={250} required disabled/>
                        </FloatingLabel>
                        </Col>
                    </Row>
                    <FloatingLabel controlId="floatingMessage" label="Messsage">
                        <Form.Control
                            as="textarea"
                            name="message" onChange={handleChange}
                            placeholder="Leave message here"
                            style={{ height: '150px' }}
                            className="mb-3"
                            required
                        />
                    </FloatingLabel>
                    <Button variant="primary" type="submit" className="me-3" disabled={loading}>
                        <span className="me-1">Send Email To Me</span> {loading?(<Spinner animation="border" size="sm"/>):(<BiSend/>)}
                        {/* <box-icon name='send'></box-icon> */}
                    </Button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default ContactSection