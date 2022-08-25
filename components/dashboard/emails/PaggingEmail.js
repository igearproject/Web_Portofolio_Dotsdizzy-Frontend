import {Col,Row,Pagination} from 'react-bootstrap';

const PaggingEmail = ({pagging,setOptionGetData}) => {
    const changeOption=(name,value)=>{
        setOptionGetData(prev=>({...prev, [name]:value}));
    }
    const prevOrNext=async(option,page)=>{
        if(option==="prev"){
            if(page>1){
                setOptionGetData(prev=>({...prev, page:page-1}));
            }
        }else{
            setOptionGetData(prev=>({...prev, page:page+1}));
        }
    }
    return (
        <Row className="my-4">
            <Col md={6} className="mt-3">
                <span className="text-muted">
                    {pagging.total!=0?(
                        `Show ${pagging.limit} / ${pagging.total} emails found`
                    ):(
                        `0 emails found`
                    )}
                </span>
            </Col>
            <Col md={6} className="mt-3">
                <Pagination className="float-sm-start float-md-end">
                    {pagging.page>1&&(<Pagination.First onClick={()=>changeOption("page",1)}/>)}
                    {pagging.page>1&&(<Pagination.Prev onClick={()=>prevOrNext("prev",pagging.page)}/>)}
                    {Array.from({ length: pagging.totalPage }).map((_, idx) => (
                        <Pagination.Item key={idx} onClick={()=>changeOption("page",idx+1)} active={idx+1===pagging.page?(true):(false)}>{idx+1}</Pagination.Item>
                    ))}
                    {pagging.page<pagging.totalPage&&(<Pagination.Next onClick={()=>prevOrNext("next",pagging.page)}/>)}
                    {pagging.page<pagging.totalPage&&(<Pagination.Last onClick={()=>changeOption("page",pagging.totalPage)}/>)}
                </Pagination>
            </Col>
        </Row>
    )
}

export default PaggingEmail