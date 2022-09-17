import Link from 'next/link';
import {Col, Button, Row, Container, Stack, Card} from 'react-bootstrap';
import Thumbnail from '../../components/Thumbnail';
import errorHandling from '../../services/errorHandling';
import projectHandling from '../../services/projectHandling';
import { useEffect, useState } from 'react';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
import SearchAndFilterProjectSSR from '../../components/dashboard/projects/SearchAndFilterProjectSSR';
import PaggingProjectSSR from '../../components/dashboard/projects/PaggingProjectSSR';
import HomeLayout from '../../components/layout/HomeLayout';


export async function getServerSideProps(ctx) {
    // caching
    // res.setHeader(
    //     'Cache-Control',
    //     'public, s-maxage=10, stale-while-revalidate=59'
    // )
    let data=[],error=[],option=[],paginateSSR={};
    option={
        page:parseInt(ctx.query.page)||1,
        limit:parseInt(ctx.query.limit)||12,
        searchKey:ctx.query.searchKey||'',
        searchBy:ctx.query.searchBy||'title',
        sortBy:ctx.query.sortBy||'createdAt',
        sortOption:ctx.query.sortOption||'desc',
        category:ctx.query.category||'',
        tags:ctx.query.tags||'',
    }
    try{
        const response=await projectHandling.getAllPublish(option);
        data=response.data.data;
        paginateSSR={
            limit:response.data.limit,
            total:response.data.total,
            totalPage:response.data.totalPage,
            page:response.data.page,
        };

    }catch(err){
        error=errorHandling.getData('project',err);
    }
    return { props: { data, error, option, paginateSSR } }
}

const Gallery = ({data,error,option,paginateSSR}) => {
    const [projects,setProjects]=useState(data);
    const [msg,setMsg]=useState(error);
    const [optionGetData,setOptionGetData]=useState(option);
    const [paginate,setPaginate]=useState(paginateSSR);
    const [loading,setLoading]=useState(false);
    // useEffect(()=>{
    //     // console.log(data, option, msg)
    //     getData();

    // },[optionGetData]);

    // const getData=async()=>{
    //     setLoading(true);
    //     setMsg({status:'',message:''});
    //     // console.log('getting data')
    //     try{
    //         const response=await projectHandling.getAllPublish(optionGetData);
    //         // setProjects(response.data.data);
    //         data=response.data.data;
    //         setPaginate({
    //             limit:response.data.limit,
    //             total:response.data.total,
    //             totalPage:response.data.totalPage,
    //             page:response.data.page,
    //         })

    //     }catch(err){setMsg(errorHandling.getData('project',err))}
    //     setLoading(false)
    // }

    return (
        <HomeLayout 
            title="Gallery"
            // metaDesc={project.metaDescription}
            // metaKey={project.metaKeyword}
        >
            <Container fluid={true} style={{alignItems:'center',marginTop:'64px',paddingTop:"1.5rem"}} className="mb-4 bg-light">
                {/* <Stack direction="horizontal" gap={3}>
                    <h1>Project</h1>
                    <Button variant="primary" className="ms-auto d-flex p-3 align-items-center" 
                        onClick={()=>showAddModal()}
                    >
                        <BiPlus /> <span className="d-none d-md-block ms-2">Add Project</span>
                    </Button>
                </Stack> */}
                <SearchAndFilterProjectSSR
                    optionGetData={optionGetData}
                    setOptionGetData={setOptionGetData}
                    setMsg={setMsg}
                />
                {/* <hr/>     */}
            </Container>
            <Container fluid={true} style={{minHeight:'80vh'}} className="bg-light">
                <Row className="g-4 pb-4">
                    {
                    // loading?(
                    //     Array.from({ length: 8 }).map((_, idx) => (
                    //         <Col sm={6} md={3} key={idx}>
                    //             <Skeleton height={'250px'} width={"100%"}/>
                    //         </Col>
                    //     ))
                        
                    // ):(
                        data?.map((project,idx)=>{
                            return (
                                project.images.length>0&&(
                                    <Col sm={6} md={3} key={idx}>
                                        <Link href={`/gallery/`+project.url} passHref>
                                            <Card className="border-0 shadow rounded-4 h-100 clickable">
                                                <Thumbnail images={project.images}/>
                                                <Card.Body className=" overflow-hidden">
                                                    <div className="d-flex align-items-center overflow-hidden" >
                                                        <Card.Title className="mb-0 p-0 text-nowrap" style={{fontSize:"1rem"}}>{project.title}</Card.Title>
                                                    </div>
                                                    {project.categorys&&(
                                                        <div className="d-flex justify-content-right align-items-center g-2 p-0">
                                                            {project.categorys.map((data,idx)=>{
                                                                return (
                                                                    // idx<2&&(
                                                                        <Link href={`/gallery?category=${data.name}`} passHref key={idx}>
                                                                            <Button onClick={()=>setOptionGetData(prev=>({...prev,category:data.name}))} variant="outline-secondary" size="sm" className="shadow me-2 border-0" >
                                                                                {data.name}
                                                                            </Button>
                                                                        </Link>
                                                                    // )
                                                                )
                                                            })}
                                                        </div>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Col>
                                )
                            )
                        })
                    // )
                    }                    
                                            
                </Row>
                <PaggingProjectSSR
                    pagging={paginateSSR}
                    option={option}
                    // setOptionGetData={setOptionGetData}
                />
            </Container>             
        </HomeLayout>
    )
}

export default Gallery