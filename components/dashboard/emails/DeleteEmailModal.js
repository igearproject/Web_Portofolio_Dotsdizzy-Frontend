import {useState} from 'react';
import Alert from '../../Alert';
import errorHandling from '../../../services/errorHandling';
import {Col, Row, Button, Modal, Spinner, Table} from 'react-bootstrap';
import { BiTrash, BiCheck, BiX } from 'react-icons/bi';
import emailHandling from '../../../services/emailHandling';

const DeleteEmailModal = ({show, setShow, data, setData, msg, setMsg, get, hideOtherModal}) => {
    const [loading,setLoading]=useState(false);
    const hideModal=async()=>{
        setMsg({
            status:'',
            msg:''
        });
        setShow(false);
        // setData({
        //     name:'',
        //     email:'',
        //     _id:'',
        //     messages:[]
        // })
    }
    const handleDelete=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            await emailHandling.deleteOne(data._id);            
            get();
            setShow(false);
            hideOtherModal();
            // setData({
            //     name:'',
            //     email:'',
            //     _id:'',
            //     messages:[]
            // })
            setMsg({
                status:'success',
                msg:"Delete Email Successfully"
            });
        }catch(err){
            setMsg(errorHandling.deleteData("email",err));
        }
        setLoading(false);
    }
    return (
        <Modal 
            show={show} 
            fullscreen={false} 
            onHide={() => hideModal()} 
            // scrollable={true}
            style={{"zIndex":4000}}
            
        >
            <form onSubmit={(e)=>handleDelete(e)}>
                <Modal.Header closeButton
                >
                    <Modal.Title>Delete Email</Modal.Title>
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
                                <Table className="border-0">
                                <tbody>
                                    <tr className="border-0">
                                    <td className="border-0">Name</td>
                                    <td className="border-0">:</td>
                                    <td className="border-0">{data.name}</td>
                                    </tr>
                                    <tr className="border-0">
                                    <td className="border-0">Email</td>
                                    <td className="border-0">:</td>
                                    <td className="border-0">{data.verifed?(<BiCheck className="text-success"/>):(<BiX className="text-warning"/>)} {data.email}</td>
                                    </tr>
                                </tbody>
                                </Table>
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
                    <span>Delete this email and all messages from this email?</span>
                    <Button variant="danger"  type="submit" disabled={loading}>
                        {loading&&(<Spinner animation="border" size="sm"/>)} <BiTrash/> Delete Now
                    </Button>

                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default DeleteEmailModal