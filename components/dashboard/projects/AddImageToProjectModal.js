import {useEffect, useState} from 'react';
import Alert from '../../Alert';
import errorHandling from '../../../services/errorHandling';
import {Col, Card, Row, Button, Modal, Spinner, Stack, Table} from 'react-bootstrap';
import { BiX, BiSave, BiCloudUpload, BiEdit } from 'react-icons/bi';
import imageHandling from '../../../services/imageHandling';
import projectHandling from '../../../services/projectHandling';
import SearchAndFilter from '../../../components/dashboard/images/SearchAndFilter'
import FormModal from '../images/FormModal';

const AddImageToProjectModal = ({show, setShow, data, setData, msg, setMsg, reloadData}) => {
    const [loading,setLoading]=useState(true);
    const [loadingUpdate,setLoadingUpdate]=useState(false);
    const [images,setImages]=useState([]);
    const [imageSelected,setImageSelected]=useState([]);

    const [searchOption,setSearchOption]=useState({
        limit:10,
        searchBy:'fileName',
        searchKey:'',
        last:'',
        sortBy:'createdAt',
        sortOption:'desc'
    });

    const [pagging,setPagging]=useState({
        total:0,
        limit:searchOption.limit
    });

    const hideModal=async()=>{
        setMsg({
            status:'',
            msg:''
        });
        setShow(false);
    }
    
    const getData=async()=>{
        setLoading(true);
        // data.images?.map((data)=>{
        //     setImageSelected(prev=>({...prev,...data}));
        // })
        try{
            const response=await imageHandling.getAll(searchOption);
            // console.log(response);
            setImages(response.data.data);
            setPagging({
                "limit":response.data.limit,
                "total":response.data.total,
            })
        }catch(err){
            setMsg(errorHandling.getData('image',err));
        }
        setLoading(false);
    }
    useEffect(()=>{
        if(data.images){
            setImageSelected([])
            data.images.map((dataI)=>{
                setImageSelected(prev=>([...prev,{
                    alt_text:dataI.alt_text,
                    cdnId:dataI.cdnId,
                    cdnUrl:dataI.cdnUrl,
                    createdAt:dataI.createdAt,
                    fileName:dataI.fileName,
                    thumbnail:dataI.thumbnail,
                    updatedAt:dataI.updatedAt,
                    _id:dataI._id,
                }
                ]));
                // console.log(dataI)
            });
        }
    },[data.images]);

    useEffect(()=>{
        getData();
        
    },[searchOption.limit,searchOption.searchBy, searchOption.searchKey]);

    const AddSelectedImages=async(data)=>{
        let check=false;
        imageSelected.map((dataI)=>{
            if(dataI._id===data._id){
                check=true;
            }
        });

        if(!check){
            await setImageSelected(prev=>([...prev,{
                alt_text:data.alt_text,
                cdnId:data.cdnId,
                cdnUrl:data.cdnUrl,
                createdAt:data.createdAt,
                fileName:data.fileName,
                thumbnail:data.thumbnail,
                updatedAt:data.updatedAt,
                _id:data._id,
            }]));
        }
        // console.log(data,imageSelected);
    }

    const RemoveSelectedImages=(_id)=>{
        setImageSelected(imageSelected.filter(item => item._id != _id))
        // console.log(data,imageSelected);
    }

    // useEffect(()=>{
    //     setData(prev=>({...prev,images:imageSelected}));
    // },[imageSelected]);

    const handleUpdate=async()=>{
        setLoadingUpdate(true);
        setMsg({
            status:'',
            msg:''
        });
        // console.log("data",data);
        try{
            const project=data;
            project.images=imageSelected;
            const response=await projectHandling.updateOne(project);
            // await setData(response.data.data);
            await setData(prev=>({...prev,images:imageSelected}));
            reloadData();
            setMsg({
                status:"success",
                msg:"Update Project Successfully"
            });
        }catch(err){
            setMsg(errorHandling.updateData("project",err));
        }
        setLoadingUpdate(false);
    }

    // form upload image
    const [image,setImage]=useState({
        _id:'',
        fileName:'',
        cdnUrl:'',
        cdnId:'',
        alt_text:'',
        thumbnail:false
    });

    const [showFormModal,setFormModal]=useState(false);
    const showModalAdd=async()=>{
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

    return (
        <>
        <Modal 
            show={show} 
            fullscreen={true} 
            onHide={() => hideModal()} 
            // scrollable={true}
            style={{"zIndex":4000}}
            
        >
            <Modal.Header closeButton
            >
                <Modal.Title>Add Image</Modal.Title>
            </Modal.Header>
            <Modal.Body 
                style={{
                    maxHeight:"70vh",
                    overflowY:"auto",
                }}
            >
                <Row className="mb-3">
                    <Col sm={12} className="mb-2">
                        <span className="text-muted ">Images selected</span>
                    </Col>
                    <Col sm={12} >
                        <div className="d-flex border p-3 flex-wrap">
                            {imageSelected.map((data,idx)=>{
                                return(
                                    data.fileName&&(
                                        <Button 
                                            variant={data.thumbnail?("success"):("light")} 
                                            key={idx}
                                            size="sm"
                                            className="me-2 mb-2 shadow d-flex p-2 align-items-center justify-content-between"
                                            // disabled={true}
                                        >
                                            {data.fileName.substring(14,100)}
                                            <div 
                                                className="ms-2 btn btn-sm btn-outline-danger border-0"
                                                onClick={()=>RemoveSelectedImages(data._id)}
                                            >
                                                <BiX/>
                                            </div>
                                        </Button>
                                    )
                                )
                            })}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <SearchAndFilter optionGetData={searchOption} setOptionGetData={setSearchOption} zIn="4001"/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                    {pagging.total>0?(
                        <span className="text-muted">{pagging.total<pagging.limit?(pagging.total):(pagging.limit)} / {pagging.total} images found</span>
                    ):(
                        <span className="text-muted"> No images found</span>
                    )}
                    </Col>
                </Row>
                <Alert status={msg.status} msg={msg.msg}/>    
                <Row className="g-3" >
                    {images?.map((data,idx)=>{
                        return (
                            <Col sm={4} md={3} key={idx}>
                                <Card 
                                    className="clickable"
                                    onClick={()=>AddSelectedImages(data)}
                                >
                                    <Card.Img variant="top" src={data.cdnUrl||process.env.NEXT_PUBLIC_SERVER_URL_IMAGE+data.fileName} />
                                    {/* <Card.Body>
                                        <Card.Title>{props.data.alt_text?.substring(0,100)}</Card.Title>
                                        <Card.Text>
                                            File Name : {props.data.fileName}
                                        </Card.Text>
                                    </Card.Body> */}
                                    <Card.Footer className="d-flex align-items-center justify-content-between">
                                        {/* <div className="text-muted">
                                            {dayjs(props.data.createdAt).format('DD MMM YYYY')}
                                        </div> */}
                                        <div className="d-grid gap-2 flex-fill">
                                            <Button variant="outline-primary border-0 shadow" onClick={()=>showModalEdit(data)}>
                                                <BiEdit/>
                                            </Button>
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )
                    })}
                    
                </Row>                      
                
            </Modal.Body>
            <Modal.Footer 
                className="d-flex justify-content-between bg-white"
                style={{
                    maxHeight:"100px",
                    overflow:"auto",
                }}
            >
                <Button variant="secondary" className="border-0 shadow d-flex align-items-center justify-content-between"  
                    onClick={showModalAdd}
                >
                    <BiCloudUpload/> <span className="d-none d-sm-block ms-2" >Upload Image</span>
                </Button>
                <Button variant="primary" disabled={loadingUpdate} 
                    onClick={handleUpdate} 
                    className="border-0 shadow d-flex align-items-center justify-content-between"
                >
                    {loadingUpdate?(<Spinner animation="border" size="sm"/>):(<BiSave/>)}
                    <span className="d-none d-sm-block ms-2">Save Image</span>
                </Button>

            </Modal.Footer>
        </Modal>
        <FormModal
            show={showFormModal} hideModal={hideFormModal} 
            data={image} setData={setImage} 
            msg={msg} setMsg={setMsg}
            get={getData}
            // showDelete={showModalDelete}
            zIn={4002}
        />
        </>
    )
}

export default AddImageToProjectModal