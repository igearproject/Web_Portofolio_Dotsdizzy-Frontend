import dayjs from "dayjs";
import {Button, Col, Modal, Row, Table, Card} from 'react-bootstrap';
import { BiCheck, BiCopy, BiRightArrowAlt, BiTrash, BiX } from 'react-icons/bi';

const ShowDetails = ({show,hideModal,data,showDelete}) => {
  return (
    <Modal 
        show={show} 
        fullscreen={true} 
        onHide={() => hideModal()} 
        // scrollable={true}
        
    >
            <Modal.Header closeButton
            >
                <Modal.Title>Show Email</Modal.Title>
            </Modal.Header>
            <Modal.Body 
                style={{
                    maxHeight:"90vh",
                    overflowY:"auto",
                }}
            >  
                    <Row>
                        <Col md={12} >
                            <Table className="border-0">
                              <tbody>
                                <tr className="border-0">
                                  <td className="border-0">Name</td>
                                  <td className="border-0">:</td>
                                  <td className="border-0">{data.name} <BiCopy/></td>
                                </tr>
                                <tr className="border-0">
                                  <td className="border-0">Email</td>
                                  <td className="border-0">:</td>
                                  <td className="border-0">{data.verifed?(<BiCheck className="text-success"/>):(<BiX className="text-warning"/>)} {data.email} <BiCopy/></td>
                                </tr>
                              </tbody>
                            </Table>
                        </Col>
                        <Col md={12}>
                        <Button variant="outline-danger"  type="button" onClick={()=>showDelete(data)}>
                          <BiTrash/>
                        </Button> 
                        </Col>
                    </Row>
                    <Row className="my-4">
                      {data.message?.sort().reverse().map((message,idx)=>{
                        return (
                          <Col md={12} key={idx} className="mb-3">
                            <Card>
                              <Card.Header className="d-flex align-items-center justify-content-between">
                                <span text="text-muted">{dayjs(message.createdAt).format('ddd, DD MMM YYYY HH:mm a')}</span>
                                <span><BiRightArrowAlt className="text-success"/> {message.emailTo}</span>
                              </Card.Header>
                              <Card.Body>
                                  {message.subject&&(<Card.Title>{message.subject} <BiCopy/> </Card.Title>)}
                                  <Card.Text>
                                    {message.message}
                                  </Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                        )
                      })}
                      
                    </Row>
                
            </Modal.Body>
            {/* <Modal.Footer 
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

            </Modal.Footer> */}
    </Modal>
  )
}

export default ShowDetails