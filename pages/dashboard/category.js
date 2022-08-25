import Head from "next/head";
import Alert from "../../components/Alert";
import { Container, Row, Col, Stack, Button, ButtonGroup, FloatingLabel, Form, Modal, Spinner } from "react-bootstrap";
import NavbarDashboard from "../../components/dashboard/NavbarDashboard";
import Footer from "../../components/Footer";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { useEffect, useState } from "react";
import errorHandling from "../../services/errorHandling";
import categoryHandling from "../../services/categoryHandling";
import Skeleton from 'react-loading-Skeleton';
import 'react-loading-Skeleton/dist/Skeleton.css';

const DashboardCategory=()=>{

    const [categorys,setCategorys] = useState([]);
    const [category,setCategory] = useState({
        _id:'',
        name:'',
        description:''
    });
    const [loading,setLoading]=useState(true);
    const [msg,setMsg]=useState({
        status:'',
        msg:'',
    })
    
    const [showAdd,setShowAdd]=useState(false);
    const [loadingAdd,setLoadingAdd]=useState(false);
    
    const [showUpdate,setShowUpdate]=useState(false);
    const [loadingUpdate,setLoadingUpdate]=useState(false);

    const [showDelete,setShowDelete]=useState(false);
    const [loadingDelete,setLoadingDelete]=useState(false);

    useEffect(()=>{
        getData();
    },[]);

    const getData=async ()=>{
        setLoading(true);
        try{
            const response=await categoryHandling.getAll();
            setCategorys(response.data.data);
            setLoading(false);
        }catch(err){
            setMsg(errorHandling.getData('category',err))
        }
        setLoading(false);
    }
    const handleChange=async(e)=>{
        setCategory(prev=>({...prev, [e.target.name]:e.target.value}));
        // console.log(category)
    }
    const handleAdd=async(e)=>{
        e.preventDefault();
        setLoadingAdd(true);
        try{
            const response=await categoryHandling.addOne(category.name,category.description);
            // console.log(response);
            getData();
            e.target.reset();
            setMsg({
                status:"success",
                msg:"Add New Category Successfully"
            });
            setLoadingAdd(false);
        }catch(err){
            // console.log(err.response.data);
            setLoadingAdd(false);
            setMsg(errorHandling.addData("category",err));
        }
    }
    const showAddModal=async()=>{
        setCategory({
            _id:'',
            name:'',
            description:''
        });
        setMsg({
            status:"",
            msg:""
        })
        setShowAdd(true);
    }
    const hideAddModal=async()=>{
        setShowAdd(false)
        setMsg({
            status:"",
            msg:""
        })
    }

    
    // fungsi update
    
    
    const handleUpdate=async(e)=>{
        e.preventDefault();
        setLoadingUpdate(true);
        try{
            const response=await categoryHandling.updateOne(category._id,category.name,category.description);
            // console.log(response);
            getData();
            e.target.reset();
            setMsg({
                status:"success",
                msg:"Update Category Successfully"
            });
            setLoadingUpdate(false);
        }catch(err){
            // console.log(err.response.data);
            setLoadingUpdate(false);
            setMsg(errorHandling.updateData("category",err));
        }
    }

    const showUpdateModal=async(data)=>{
        setCategory({
            _id:data._id,
            name:data.name,
            description:data.description
        });
        setMsg({
            status:"",
            msg:""
        })
        setShowUpdate(true);
    }
    const hideUpdateModal=async()=>{
        setShowUpdate(false)
        setCategory({
            _id:'',
            name:'',
            description:''
        });
        setMsg({
            status:"",
            msg:""
        })
    }

    // fungsi Delete
    
    
    const handleDelete=async()=>{
        setLoadingDelete(true);
        try{
            const response=await categoryHandling.deleteOne(category._id);
            // console.log(response);
            getData();
            setMsg({
                status:"success",
                msg:"Delete Category Successfully"
            });
            hideDeleteModal()
            setLoadingDelete(false);
        }catch(err){
            // console.log(err.response.data);
            setLoadingDelete(false);
            setMsg(errorHandling.deleteData("category",err));
        }
    }

    const showDeleteModal=async()=>{
        setShowUpdate(false)
        setShowDelete(true);
        setMsg({
            status:"",
            msg:""
        })
    }
    const hideDeleteModal=async()=>{
        setShowDelete(false)
        setCategory({
            _id:'',
            name:'',
            description:''
        });
    }

    return(
        <>
            <Head>
                <title>Category - DotsDizzy</title>
            </Head>
            <NavbarDashboard fluid={true} bgC="dark" variant="dark"/>
            <Container fluid={true} style={{alignItems:'center',marginTop:'64px',paddingTop:"1.5rem"}}>
                <Stack direction="horizontal" gap={3}>
                    <h1>Category</h1>
                    <Button variant="primary" onClick={()=>showAddModal()} className="ms-auto shadow d-flex p-3 align-items-center"><BiPlus/></Button>
                </Stack>
                <hr/>    
            </Container>
            <Container fluid={true} style={{minHeight:'80vh'}} className="bg-light">
                <Alert status={msg.status} msg={msg.msg}/>
                <Row className="g-3 py-4">
                    {loading?(
                        <>
                            <Col className="shadow m-3 p-3">
                                <Skeleton height={'50px'}/>
                            </Col>
                            <Col className="shadow m-3 p-3">
                                <Skeleton height={'50px'}/>
                            </Col>
                            <Col className="shadow m-3 p-3">
                                <Skeleton height={'50px'}/>
                            </Col>
                            <Col className="shadow m-3 p-3">
                                <Skeleton height={'50px'}/>
                            </Col>
                            <Col className="shadow m-3 p-3">
                                <Skeleton height={'50px'}/>
                            </Col>
                            <Col className="shadow m-3 p-3">
                                <Skeleton height={'50px'}/>
                            </Col>
                        </>
                    ):
                        categorys.map((data,index)=>{
                            return(
                                <Col className="shadow p-3 mx-3" key={index}>
                                    <Stack direction="horizontal" gap={3}>
                                        <div className=""><h4>{data.name}</h4></div>
                                        <ButtonGroup aria-label="Basic example" className="ms-auto">
                                            <Button 
                                                variant="light" 
                                                className="shadow" 
                                                onClick={(()=>showUpdateModal(data))}
                                            ><BiEdit/></Button>
                                        </ButtonGroup>
                                    </Stack>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
            <Modal show={showAdd} fullscreen={true} onHide={() => hideAddModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert status={msg.status} msg={msg.msg}/>
                    <form onSubmit={handleAdd}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" name="name" maxLength="255" onChange={handleChange} required placeholder="name" />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Description"
                            className="mb-3"
                        >
                            <Form.Control type="text" name="description" maxLength="255" onChange={handleChange} placeholder="description" />
                        </FloatingLabel>
                        <Button variant="primary"  type="submit" disabled={loadingAdd} size="lg">
                            {loadingAdd&&(<Spinner animation="border" size="sm"/>)} Save
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal show={showUpdate} fullscreen={true} onHide={() => hideUpdateModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert status={msg.status} msg={msg.msg}/>
                    <form onSubmit={handleUpdate}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" value={category.name} name="name" maxLength="255" onChange={handleChange} required placeholder="name" />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Description"
                            className="mb-3"
                        >
                            <Form.Control type="text" value={category.description} name="description" maxLength="255" onChange={handleChange} placeholder="description" />
                        </FloatingLabel>
                        <Button variant="primary"  type="submit" disabled={loadingUpdate} size="lg">
                            {loadingUpdate&&(<Spinner animation="border" size="sm"/>)} Save changes
                        </Button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" className="shadow" onClick={()=>showDeleteModal()}><BiTrash/></Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} fullscreen={true}  onHide={() => hideDeleteModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert status={msg.status} msg={msg.msg}/>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name"
                        className="mb-3"
                    >
                        <Form.Control type="text" value={category.name} disabled name="name" maxLength="255" onChange={handleChange} required placeholder="name" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Description"
                        className="mb-3"
                    >
                        <Form.Control type="text" value={category.description} disabled name="description" maxLength="255" onChange={handleChange} placeholder="description" />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="danger"  type="submit" disabled={loadingDelete} size="lg" onClick={()=>handleDelete()}>
                            {loadingDelete&&(<Spinner animation="border" size="sm"/>)} Delete
                        </Button>
                </Modal.Footer>
            </Modal>
            <Footer/>
        </>
    );
}

export default DashboardCategory;