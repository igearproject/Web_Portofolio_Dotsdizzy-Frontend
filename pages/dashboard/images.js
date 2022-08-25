import {useEffect,useState} from 'react';
import Alert from '../../components/Alert';
import Head from 'next/head';
import NavbarDashboard from '../../components/dashboard/NavbarDashboard';
import Footer from '../../components/Footer';
import {Container, Col, Row, Stack, Button, Spinner} from 'react-bootstrap';
import { BiArrowToBottom, BiPlus } from 'react-icons/bi';
import errorHandling from '../../services/errorHandling';
import imageHandling from '../../services/imageHandling';
import CardImage from '../../components/dashboard/images/CardImage';
import FormModal from '../../components/dashboard/images/FormModal';
import DeleteModalImages from '../../components/dashboard/images/DeleteModalImages';
import SearchAndFilter from '../../components/dashboard/images/SearchAndFilter';

const ImagesDashboard = () => {
    const [loading,setLoading]=useState(true);
    const [images,setImages]=useState([]);
    const [image,setImage]=useState({
        _id:'',
        fileName:'',
        cdnUrl:'',
        cdnId:'',
        alt_text:'',
        thumbnail:false
    });
    const [msg,setMsg]=useState({
        status:"",
        msg:""
    });

    const [showFormModal,setFormModal]=useState(false);
    const showModal=async()=>{
        setMsg({
            status:"",
            msg:""
        });
        setFormModal(true);
    }
    const showModalEdit=async(data)=>{
        setImage(data);
        setMsg({
            status:"",
            msg:""
        });
        setFormModal(true);
    }
    const hideFormModal=async()=>{
        setFormModal(false);
        setImage({
            _id:'',
            fileName:'',
            cdnUrl:'',
            cdnId:'',
            alt_text:'',
            thumbnail:false
        });
        setMsg({
            status:"",
            msg:""
        });
    }
    const [showDeleteModal,setShowDeleteModal]=useState(false);
    const showModalDelete=async(data)=>{
        setFormModal(false);
        setImage(data);
        setMsg({
            status:"",
            msg:""
        });
        setShowDeleteModal(true);
    }
    const [pagging,setPagging]=useState([]);
    const [total,setTotal]=useState(0);
    const [optionGetData,setOptionGetData]=useState({
        // page:1,
        searchKey:'',
        category:'',
        searchBy:'fileName',
        sortBy:'createdAt',
        sortOption:'desc',
        limit:12,
        last:'',
    });

    useEffect(()=>{
        getData();
    },[optionGetData]);

    const getData=async()=>{
        setLoading(true);
        setMsg({
            status:"",
            msg:""
        });
        try{
            const response=await imageHandling.getAll(optionGetData);
            // console.log(response);
            if(optionGetData.last&&response?.data?.data){
                setTotal(total+response.data.data.length);
                if(images.length<100){
                    setImages(prev=>([...prev,...response.data.data]));
                }else{
                    setImages(response.data.data);
                }

            }else{
                setTotal(response.data.data.length)
                setImages(response.data.data);
            }
            setPagging({
                // "page":response.data.page,
                "limit":response.data.limit,
                "total":response.data.total,
                // "totalPage":response.data.totalPage,
            })
        }catch(err){
            setMsg(errorHandling.getData('image',err));
        }
        setLoading(false);
    }

    const loadMore=async(length,sortBy)=>{
        const index=length-1;
        if(sortBy==="createdAt"){
            setOptionGetData(prev=>({...prev, last:images[index].createdAt}));
        }else{
            setOptionGetData(prev=>({...prev, last:images[index].updatedAt}));
        }
    }
    
    return (
        <>
            <Head>
                <title>Images - DotsDizzy</title>
            </Head>
            <NavbarDashboard fluid={true} bgC="dark" variant="dark"/>
            <Container fluid={true} style={{alignItems:'center',marginTop:'64px',paddingTop:"1.5rem"}}>
                <Stack direction="horizontal" gap={3}>
                    <h1>Images</h1>
                    <Button 
                        variant="primary" 
                        onClick={()=>showModal()} 
                        className="ms-auto shadow d-flex p-3 align-items-center"
                    >
                        <BiPlus/>
                    </Button>
                </Stack>
                <hr/>    
            </Container>
            <Container fluid={true} style={{minHeight:'80vh'}} className="bg-light">
                <SearchAndFilter optionGetData={optionGetData} setOptionGetData={setOptionGetData}/>
                {!showFormModal&&!showDeleteModal&&(<Alert status={msg.status} msg={msg.msg}/>)}
                <Row>
                    <Col md={12}>
                    {pagging.total>0?(
                        <span className="text-muted">{total} / {pagging.total} images found</span>
                    ):(
                        <span className="text-muted"> No images found</span>
                    )}
                    </Col>
                </Row>
                <Row className="g-3 py-4">
                    {images.map((data,idx)=>{
                        return (
                            <Col md={3} key={idx}>
                                <CardImage 
                                    data={data} 
                                    showModal={showModalEdit}
                                />
                            </Col>
                        )

                    })}
                    
                </Row>
                <Row className="py-4 ">
                    {images.length<pagging.total&&(
                        <Col md={12} className="d-flex align-items-center w-100 justify-content-center">
                            <Button variant="outline-secondary" onClick={()=>loadMore(images.length,optionGetData.sortBy)} className="border-0 shadow-lg">
                                {!loading?(<BiArrowToBottom/>):(<Spinner animation="border" size="sm"/>)}
                            </Button> 
                        </Col>
                    )}
                </Row>
            </Container>
            <FormModal 
                show={showFormModal} hideModal={hideFormModal} 
                data={image} setData={setImage} 
                msg={msg} setMsg={setMsg}
                get={getData}
                showDelete={showModalDelete}
            />
            <DeleteModalImages 
                show={showDeleteModal} setShow={setShowDeleteModal} 
                data={image} setData={setImage} 
                msg={msg} setMsg={setMsg}
                get={getData}
            />
            <Footer/>
        </>
    )
}

export default ImagesDashboard