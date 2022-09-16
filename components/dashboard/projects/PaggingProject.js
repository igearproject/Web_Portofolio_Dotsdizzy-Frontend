import Link from 'next/link';
import {Col,Row,Pagination} from 'react-bootstrap';

const PaggingProject = ({pagging,setOptionGetData}) => {
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
                        pagging.limit>pagging.total?(
                            `Show ${pagging.total} / ${pagging.total} project found`
                        ):(
                            `Show ${pagging.limit} / ${pagging.total} project found`
                        )
                    ):(
                        `0 project found`
                    )}
                </span>
            </Col>
            <Col md={6} className="mt-3">
                <Pagination className="float-sm-start float-md-end">
                    {pagging.page>1&&(<Link href="/gallery?page=1" passHref><Pagination.First onClick={()=>changeOption("page",1)}/></Link>)}
                    {pagging.page>1&&(<Link href={`/gallery?page=${pagging.page-1}`} passHref><Pagination.Prev onClick={()=>prevOrNext("prev",pagging.page)}/></Link>)}
                    {Array.from({ length: pagging.totalPage }).map((_, idx) => (
                        <Link href={`/gallery?page=${idx+1}`} passHref key={idx}>
                            <Pagination.Item  onClick={()=>changeOption("page",idx+1)} active={idx+1===pagging.page?(true):(false)}>{idx+1}</Pagination.Item>
                        </Link>
                    ))}
                    {pagging.page<pagging.totalPage&&(<Link href={`/gallery?page=${pagging.page+1}`} passHref><Pagination.Next onClick={()=>prevOrNext("next",pagging.page)}/></Link>)}
                    {pagging.page<pagging.totalPage&&(<Link href={`/gallery?page=${pagging.totalPage}`} passHref><Pagination.Last onClick={()=>changeOption("page",pagging.totalPage)}/></Link>)}
                </Pagination>
            </Col>
        </Row>
    )
}

export default PaggingProject