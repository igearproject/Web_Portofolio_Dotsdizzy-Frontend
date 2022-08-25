import {useState} from 'react';
import Image from 'next/image';
import Alert from '../../Alert';
import {Button, Col, Row, Modal, Form, FloatingLabel, Spinner, ProgressBar} from 'react-bootstrap';
import imageHandling from '../../../services/imageHandling';
import errorHandling from '../../../services/errorHandling';
import { BiTrash } from 'react-icons/bi';


const FormModal = ({show,hideModal,data,setData,msg,setMsg,get,showDelete}) => {
    const [loading,setLoading]=useState(false);
    const [progress,setProgress]=useState(0);

    const handleChange=async(e)=>{
        if(e.target.name==="image"){
            setData((prev)=>({...prev,image:e.target.files[0]}));
        }else if(e.target.name==="thumbnail"){
            setData(prev=>({...prev, thumbnail:e.target.checked}));
        }else{
            setData((prev)=>({...prev,[e.target.name]:e.target.value}));
        }
        // console.log(data);
    }
    const handleAdd=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setProgress(0);
        try{
            const response=await imageHandling.addOne(data.image,data.alt_text,data.thumbnail,(e)=>{
                let percentComplete = parseInt(e.loaded * 100 / e.total );
                // console.log(percentComplete);
                if(!(percentComplete>=100)){
                    setProgress(percentComplete);
                }
            });
            setProgress(100);
            setData(response.data.data);
            setMsg({
                status:'success',
                msg:"Upload Image Successfully"
            });
            get();
        }catch(err){
            setMsg(errorHandling.addData("image",err));
        }
        setLoading(false);
        setProgress(0);
    }
    const handleUpdate=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setProgress(0);
        try{
            const response=await imageHandling.updateOne(data);
            setData(response.data.data);
            setMsg({
                status:'success',
                msg:"Update Successfully"
            });
            get();
        }catch(err){
            setMsg(errorHandling.updateData("image",err));
        }
        setLoading(false);
    }
    return (
        <Modal 
            show={show} 
            fullscreen={true} 
            onHide={() => hideModal()} 
            // scrollable={true}
            
        >
            <form onSubmit={data._id?((e)=>handleUpdate(e)):((e)=>handleAdd(e))} encType='multipart/form-data'>
                <Modal.Header closeButton
                >
                    <Modal.Title>{!data._id?("Upload New Image"):("Update Image")}</Modal.Title>
                </Modal.Header>
                <Modal.Body 
                    style={{
                        maxHeight:"70vh",
                        overflowY:"auto",
                    }}
                >
                    <Alert status={msg.status} msg={msg.msg}/>    
                        <Row>
                            <Col md={12}>
                                {data.cndUrl||data.fileName&&(
                                    <Image 
                                        className="mb-3" 
                                        // objectFit="cover"
                                        placeholder="blur" 
                                        blurDataURL="/loading.png"
                                        height="250px" width="250px" layout="fixed" 
                                        src={data.cdnUrl||process.env.NEXT_PUBLIC_SERVER_URL_IMAGE+data.fileName} 
                                    />
                                )}
                                <Form.Group
                                    className="mb-3"
                                >
                                    <Form.Label>Image</Form.Label>
                                    {data._id?(
                                        <Form.Control 
                                            type="text" 
                                            name="image" 
                                            value={data.fileName} 
                                            maxLength="255" 
                                            onChange={handleChange} 
                                            required
                                            disabled={true}
                                            placeholder="image"
                                        />
                                    ):(
                                        <Form.Control 
                                            type="file" 
                                            name="image" 
                                            // value={data._id&&data.fileName&&(data.fileName)} 
                                            maxLength="255" 
                                            onChange={handleChange} 
                                            required
                                            placeholder="image"
                                            accept="image/*"
                                        />
                                    )}
                                    
                                </Form.Group>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Alt Text"
                                    className="mb-3"
                                >
                                    <Form.Control 
                                        type="text" 
                                        name="alt_text" 
                                        value={data.alt_text&&(data.alt_text)} 
                                        maxLength="255" 
                                        onChange={handleChange} 
                                        required 
                                        placeholder="alt text" 
                                    />
                                </FloatingLabel>
                                <Form.Check 
                                    type="switch"
                                    id="custom-switch"
                                    label="Thumbnail"
                                    name="thumbnail"
                                    onChange={handleChange}
                                    checked={data.thumbnail&&(data.thumbnail)}
                                    className="mb-3"
                                />

                                
                            </Col>
                        </Row>
                        {progress!=0&&(
                        <Row className="mt-1">
                            <Col md={12}>
                                <ProgressBar now={progress} label={`${progress}%`} />
                            </Col>
                        </Row>
                        )}
                       
                    
                </Modal.Body>
                <Modal.Footer 
                    className="d-flex justify-content-between bg-white"
                    style={{
                        maxHeight:"100px",
                        overflow:"auto",
                    }}
                >
                    <Button variant="primary"  type="submit" disabled={loading} size="lg">
                        {loading&&(<Spinner animation="border" size="sm"/>)} {!data._id?("Save"):("Save Changes")}
                    </Button>
                    {data._id&&(
                    <Button variant="outline-danger"  type="button" disabled={loading} onClick={()=>showDelete(data)} size="lg">
                        <BiTrash/>
                    </Button>
                    )}

                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default FormModal