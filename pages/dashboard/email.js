import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Head from "next/head";
import NavbarDashboard from "../../components/dashboard/NavbarDashboard";
import Footer from "../../components/Footer";
import {Container, Col, Card, Row, Stack, Button} from "react-bootstrap";
import { BiCheck, BiMessage, BiPlus, BiX } from "react-icons/bi";
import emailHandling from '../../services/emailHandling';
import errorHandling from '../../services/errorHandling';
import ShowDetails from '../../components/dashboard/emails/ShowDetails';
import DeleteEmailModal from '../../components/dashboard/emails/DeleteEmailModal';
import Skeleton from 'react-loading-Skeleton';
import 'react-loading-Skeleton/dist/Skeleton.css';
import SearchEmail from '../../components/dashboard/emails/SearchEmail';
import PaggingEmail from '../../components/dashboard/emails/PaggingEmail';

const EmailDashBord = () => {
    dayjs.extend(relativeTime);
    const [loading,setLoading]=useState(true);
    const [emails,setEmails]=useState([]);
    const [email,setEmail]=useState({
        name:'',
        email:'',
        _id:'',
        messages:[]
    });
    const [msg,setMsg]=useState({
        status:'',
        msg:'',
    });

    const [pagging,setPagging]=useState([]);
    const [optionGetData,setOptionGetData]=useState({
        page:1,
        searchKey:'',
        // category:'',
        // searchBy:'title',
        // sortBy:'createdAt',
        // sortOption:'desc',
        limit:10
    });
    
    const getData=async()=>{
        setLoading(true);
        try{
            const response=await emailHandling.getAll(optionGetData);
            setEmails(response.data.data);
            setPagging({
                "page":response.data.page,
                "limit":response.data.limit,
                "total":response.data.total,
                "totalPage":response.data.totalPage,
            })
            // console.log(response)
        }catch(err){
            setMsg(errorHandling.getData('email',err));
        }
        setLoading(false);
    }

    useEffect(()=>{
        getData()
    },[optionGetData.page,optionGetData.searchKey,optionGetData.limit])
    
    const [show,setShow]=useState(false);
    
    const showModal=async(data)=>{
        setEmail(data);
        setMsg({
            status:"",
            msg:""
        });
        setShow(true);
    }
    const hideModal=async()=>{
        setShow(false);
        setEmail({
            name:'',
            email:'',
            _id:'',
            messages:[]
        });
        // setMsg({
        //     status:"",
        //     msg:""
        // });
    }
    const [showDelete,setShowDelete]=useState(false);
    const showModalDelete=async(data)=>{
        setEmail(data);
        setMsg({
            status:"",
            msg:""
        });
        setShowDelete(true);
    }
    return (
    <>
        <Head>
            <title>Email - DotsDizzy</title>
        </Head>

        <NavbarDashboard fluid={true} bgC="dark" variant="dark"/>

        <Container fluid={true} style={{alignItems:'center',marginTop:'64px',paddingTop:"1.5rem"}}>
            <Stack direction="horizontal" gap={3}>
                <h1>Email</h1>
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
            <SearchEmail 
                optionGetData={optionGetData}
                setOptionGetData={setOptionGetData}
            />
            <Row>
                {loading?(
                    <>
                    <Col md={6}>
                        <Card className="w-100 shadow" onClick={()=>showModal(data)}>
                            <Card.Header className="d-flex bg-white border-0 d-flex align-items-center justify-content-between">
                                <span><Skeleton height={'25px'} width={"100px"}/></span>
                                <Skeleton height={'25px'} width={"80px"}/>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title><Skeleton height={'50px'} width={"150px"}/></Card.Title>
                                <Card.Text><Skeleton height={'25px'} width={"150px"}/></Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex align-items-center justify-content-between bg-white border-0">
                                <span><Skeleton height={'25px'} width={"80px"}/></span>
                                <Skeleton height={'25px'} width={"80px"}/>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="w-100 shadow" onClick={()=>showModal(data)}>
                            <Card.Header className="d-flex bg-white border-0 d-flex align-items-center justify-content-between">
                                <span><Skeleton height={'25px'} width={"100px"}/></span>
                                <Skeleton height={'25px'} width={"80px"}/>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title><Skeleton height={'50px'} width={"150px"}/></Card.Title>
                                <Card.Text><Skeleton height={'25px'} width={"150px"}/></Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex align-items-center justify-content-between bg-white border-0">
                                <span><Skeleton height={'25px'} width={"80px"}/></span>
                                <Skeleton height={'25px'} width={"80px"}/>
                            </Card.Footer>
                        </Card>
                    </Col>
                    </>
                ):(
                    emails?.map((data,idx)=>{
                        return (
                            <Col md={6} key={idx}>
                                <Card className="w-100 shadow clickable" onClick={()=>showModal(data)} >
                                    <Card.Header className="d-flex bg-white border-0 d-flex align-items-center justify-content-between">
                                        <span>{data.email}</span>
                                        <Button variant="outline-light" disabled={true} className="border-0">
                                            {data.verifed?(<BiCheck className="text-success"/>):(<BiX className="text-warning"/>)}
                                        </Button>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{data.name}</Card.Title>
                                        <Card.Text>{data.message[data.message.length-1]?.message.substring(0,100)}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="d-flex align-items-center justify-content-between bg-white border-0">
                                        <span>{dayjs(data.message[data.message.length-1]?.createdAt).fromNow()}</span>
                                        <Button variant="outline-dark" disabled={true} className="border-0">
                                            <BiMessage/> {data.message?.length}
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )
                    })
                )}
                
            </Row>
            <PaggingEmail 
                pagging={pagging}
                setOptionGetData={setOptionGetData}
            />
        </Container>
        <ShowDetails
            show={show}
            hideModal={hideModal}
            data={email}
            showDelete={showModalDelete}
        />
        <DeleteEmailModal
            show={showDelete}
            setShow={setShowDelete}
            data={email}
            setData={setEmail}
            msg={msg}
            setMsg={setMsg}
            get={getData}
            hideOtherModal={hideModal}
        />
        <Footer/>
    </>
  )
}

export default EmailDashBord