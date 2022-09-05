import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card, Col, Container, Row, Form, Button, Stack, FloatingLabel, Spinner } from "react-bootstrap";
import { BsArrowReturnLeft } from "react-icons/bs";
import userHandling from "../services/userHandling";
import Alert from "../components/Alert";
import CryptoJS from "crypto-js";
import errorHandling from "../services/errorHandling";

const Login = () => {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [loading, setLoading]=useState(false);
    const [msg, setMsg]=useState(false);
    const [key, setKey]=useState(process.env.NEXT_PUBLIC_SECRET_KEY);

    const router=useRouter();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const response=await userHandling.login(email,password);
            const encrptToken=await CryptoJS.AES.encrypt(response.data.token, key);
            await localStorage.setItem('token',encrptToken);
            setMsg({
                status:'success',
                msg:'Login successfuly'
            });
            e.target.reset();
            setLoading(false);
            router.push('/dashboard');

        }catch(err){
            // if(err.response?.data?.message){
            //     setMsg({
            //         status:'error',
            //         msg:err.response.data.message
            //     });
            // }else{
            //     setMsg({
            //         status:'error',
            //         msg:err.message
            //     });
            // }
            setMsg(errorHandling.login('login',err));
            
            setLoading(false);
        }

    }
    return (
        <>
            <Head>
                <title>Login - DotsDizzy</title>
            </Head>
            <Container className="pt-5 bg-dark bg-gradient" fluid  style={{minHeight:"100vh"}}>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <Card>
                            <Card.Body className="p-5">
                                <h1>Login</h1>
                                <div className="mb-4 text-secondary">DotsDizzy Account</div>
                                <Alert status={msg.status} msg={msg.msg}/>
                                {/* <hr className="mb-4"/> */}
                                <form onSubmit={(e)=>handleSubmit(e)}>
                                    <FloatingLabel
                                        controlId="email"
                                        label="Email address"
                                        className="mb-3"                                        
                                    >
                                        <Form.Control 
                                            type="email" 
                                            placeholder="name@domain.com" 
                                            required={true}
                                            onChange={(e)=>setEmail(e.target.value)}
                                        />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="password" label="Password" className="mb-4">
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Password" 
                                            required={true}
                                            onChange={(e)=>setPassword(e.target.value)}
                                        />
                                    </FloatingLabel>
                                    <Stack direction="horizontal" className="mb-5">
                                        <div >
                                            <Button variant="primary" type="submit" disabled={loading}>{loading&&(<Spinner animation="border" size="sm"/>)} Login</Button>
                                        </div>
                                        <div className="ms-auto">
                                            <Button variant="outline-secondary" type="button" > Register</Button>
                                        </div>
                                    </Stack>
                                    <Link href="/" >
                                        <a className="text-muted">
                                            <BsArrowReturnLeft/> Back to home page
                                        </a>
                                    </Link>
                                </form>

                            </Card.Body>

                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login