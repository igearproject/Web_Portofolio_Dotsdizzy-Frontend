import {useState} from 'react';
import Alert from '../../Alert';
import errorHandling from '../../../services/errorHandling';
import imageHandling from '../../../services/imageHandling';
import Image from 'next/image';
import {Col, Row, Button, Modal, ProgressBar, Spinner} from 'react-bootstrap';
import { BiTrash } from 'react-icons/bi';

const DeleteModalImages = ({show, setShow, data, setData, msg, setMsg, get}) => {
    const [loading,setLoading]=useState(false);
    const hideModal=async()=>{
        setMsg({
            status:'',
            msg:''
        });
        setShow(false);
        setData({
            _id:'',
            fileName:'',
            cdnUrl:'',
            cdnId:'',
            alt_text:'',
            thumbnail:false
        })
    }
    const handleDelete=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            await imageHandling.deleteOne(data._id);            
            get();
            setShow(false);
            setData({
                _id:'',
                fileName:'',
                cdnUrl:'',
                cdnId:'',
                alt_text:'',
                thumbnail:false
            })
            setMsg({
                status:'success',
                msg:"Delete Image Successfully"
            });
        }catch(err){
            setMsg(errorHandling.deleteData("image",err));
        }
        setLoading(false);
    }
    return (
        <Modal 
            show={show} 
            fullscreen={false} 
            onHide={() => hideModal()} 
            // scrollable={true}
            
        >
            <form onSubmit={(e)=>handleDelete(e)}>
                <Modal.Header closeButton
                >
                    <Modal.Title>Delete</Modal.Title>
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
                                        placeholder="blur" 
                                        blurDataURL="/loading.png"
                                        height="250px" width="250px" layout="fixed" 
                                        alt="image to delete"
                                        src={data.cdnUrl||process.env.NEXT_PUBLIC_SERVER_URL_IMAGE+data.fileName} />
                                )}
                            </Col>
                        </Row>                      
                    
                </Modal.Body>
                <Modal.Footer 
                    className="d-flex justify-content-between bg-white"
                    style={{
                        maxHeight:"100px",
                        overflow:"auto",
                    }}
                >
                    <Button variant="danger"  type="submit" disabled={loading} size="lg">
                        {loading&&(<Spinner animation="border" size="sm"/>)} <BiTrash/> Delete
                    </Button>

                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default DeleteModalImages