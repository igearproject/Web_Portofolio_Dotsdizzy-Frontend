import {useEffect,useState} from 'react';
import Alert from '../../components/Alert';
import Head from 'next/head';
import { Button, Container, Col, Form, Stack, Row, Spinner } from "react-bootstrap";
import NavbarDashboard from "../../components/dashboard/NavbarDashboard";
import Footer from "../../components/Footer";
import errorHandling from '../../services/errorHandling';
import userHandling from '../../services/userHandling';

const ProfileDashboard = () => {
    const [account,setAccount]=useState({
        _id:'',
        name:'',
        // email:'',
        role:'',
        oldPassword:'',
        password:'',
        rePassword:'',
    });
    const [loading,setLoading]=useState(true);
    const [loadingProfile,setLoadingProfile]=useState(false);
    const [loadingPassword,setLoadingPassword]=useState(false);
    const [msg,setMsg]=useState({
        status:'',
        msg:''
    });
    const handleChange=async(e)=>{
        setAccount(prev=>({...prev,[e.target.name]:e.target.value}))
        // console.log(account);
    }
    useEffect(()=>{
        getData();
    },[]);
    const getData=async()=>{
        setLoading(true);
        try{
            const response=await userHandling.profileV2();
            // console.log(response);
            setAccount(prev=>({...prev,...response.data.data.user}))
        }catch(err){
            setMsg(errorHandling.getData('account',err));
        }
        setLoading(false)
    }
    const handleChangeProfile=async(e)=>{
        e.preventDefault()
        setLoadingProfile(true)
        try{
            // console.log(account)
            await userHandling.updateProfile(account);
            getData();
            setMsg({
                status:'success',
                msg:"Update Profile Account Successfuly"
            })
        }catch(err){
            setMsg(errorHandling.updateData('account',err));
        }
        setLoadingProfile(false)
    }
    const handleChangePassword=async(e)=>{
        e.preventDefault()
        setLoadingPassword(true)
        try{
            await userHandling.changePassword(account);
            // getData();
            // console.log(account)
            setMsg({
                status:'success',
                msg:"Update Password Successfuly"
            })
            e.target.reset();
        }catch(err){
            setMsg(errorHandling.updateData('account',err));
        }
        setLoadingPassword(false)
    }
    return (
        <>
            <Head>
                <title>My Account - DotsDizzy</title>
            </Head>

            <NavbarDashboard fluid={true} bgC="dark" variant="dark"/>

            <Container fluid={true} style={{alignItems:'center',marginTop:'64px',paddingTop:"1.5rem"}}>
                <Stack direction="horizontal" gap={3}>
                    <h1>My Account</h1>
                    {/* <Button 
                        variant="primary" 
                        // onClick={()=>showModal()} 
                        className="ms-auto shadow d-flex p-3 align-items-center"
                    >
                        <BiPlus/>
                    </Button> */}
                </Stack>
                <hr/>    
            </Container>
            <Container fluid={true} style={{minHeight:'80vh'}} className="bg-light">
                <Alert status={msg.status} msg={msg.msg}/>
                {loading?(
                    <Row className="my-4">
                        <Col sm={12}>
                            <Spinner size="lg"/>
                        </Col>
                    </Row>
                ):(
                    <>
                        <form onSubmit={handleChangeProfile}>
                        <Row className="my-4">
                            <Col md={4}>
                                <h2 className="h4">Profile Info</h2>
                            </Col>
                            <Col md={8}>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="name" 
                                        minLength="3"
                                        maxLength="255"
                                        value={account.name}
                                        onChange={handleChange}
                                        required 
                                        placeholder="Enter your name" 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Your Email</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        disabled
                                        value={account.email?(account.email):("secret@domain.com")}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formRole">
                                    <Form.Label>Your Role</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        disabled
                                        value={account.role}
                                    />
                                </Form.Group>
                                <Button 
                                    variant="primary"
                                    className=" shadow"
                                    type="submit"
                                    disabled={loadingProfile}
                                >
                                    {loadingProfile&&(<Spinner size="sm"/>)} Save Profile Change
                                </Button>
                            </Col>
                        </Row>
                        </form>
                        <hr/>
                        <form onSubmit={handleChangePassword}>
                        <Row className="my-4">
                            <Col md={4}>
                                <h2 className="h4">Change Password</h2>
                            </Col>
                            <Col md={8}>
                                <Form.Group className="mb-3" controlId="formOldPassword">
                                    <Form.Label>Old Password </Form.Label>
                                    <Form.Control type="password" name="oldPassword" onChange={handleChange} placeholder="Enter old password" required minLength="8" maxLength="255"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>New Password </Form.Label>
                                    <Form.Control type="password" name="password" onChange={handleChange} placeholder="Enter new password" required minLength="8" maxLength="255"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formrePassword">
                                    <Form.Label>Confirm New Password </Form.Label>
                                    <Form.Control type="password" name="rePassword" onChange={handleChange} placeholder="Enter new password" required minLength="8" maxLength="255"/>
                                </Form.Group>
                                <Button 
                                    variant="primary"
                                    className="shadow"
                                    disabled={loadingPassword}
                                    type="submit"
                                >
                                    Change Password
                                </Button>
                            </Col>
                        </Row>
                        </form>
                    </>
                )}
                
            </Container>
            <Footer/>
        </>
    )
}

export default ProfileDashboard