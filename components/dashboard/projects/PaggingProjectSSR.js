import Link from 'next/link';
import {Col,Row,Pagination} from 'react-bootstrap';

const PaggingProjectSSR = ({pagging,option}) => {
    // console.log(option)
    // const changeOption=(name,value)=>{
    //     setOptionGetData(prev=>({...prev, [name]:value}));
    // }
    // const prevOrNext=async(option,page)=>{
    //     if(option==="prev"){
    //         if(page>1){
    //             setOptionGetData(prev=>({...prev, page:page-1}));
    //         }
    //     }else{
    //         setOptionGetData(prev=>({...prev, page:page+1}));
    //     }
    // }

    const goURLSSR=(page)=>{
        let url='?';
        if(page>1){
            url+=`page=${page}&`;
        }
        if(option['searchKey']&&option['searchKey']!=''){
            url+=`searchKey=${option['searchKey']}&`;
        }
        if(option['searchBy']&&option['searchBy']!='title'){
            url+=`searchBy=${option['searchBy']}&`;
        }
        if(option['limit']&&option['limit']!=12){
            url+=`limit=${option['limit']}&`;
        }
        if(option['category']&&option['category']!=''){
            url+=`category=${option['category']}&`;
        }
        if(option['sortBy']&&option['sortBy']!='createdAt'){
            url+=`sortBy=${option['sortBy']}&`;
        }
        if(option['sortOption']&&option['sortOption']!='desc'){
            url+=`sortOption=${option['sortOption']}&`;
        }
        url=url.replace(/.$/, '');
        return (`/gallery${url}`);
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
                    {pagging.page>1&&(<Link href={goURLSSR(1)} passHref><Pagination.First /></Link>)}
                    {pagging.page>1&&(<Link href={goURLSSR(pagging.page-1)} passHref><Pagination.Prev/></Link>)}
                    {Array.from({ length: pagging.totalPage }).map((_, idx) => (
                        <Link href={goURLSSR(idx+1)} key={idx} passHref>
                            <Pagination.Item active={idx+1===pagging.page?(true):(false)}>{idx+1}</Pagination.Item>
                        </Link>
                    ))}
                    {pagging.page<pagging.totalPage&&(<Link href={goURLSSR(pagging.page+1)} passHref><Pagination.Next /></Link>)}
                    {pagging.page<pagging.totalPage&&(<Link href={goURLSSR(pagging.totalPage)} passHref><Pagination.Last/></Link>)}
                </Pagination>
            </Col>
        </Row>
    )
}

export default PaggingProjectSSR