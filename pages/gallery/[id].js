import { useRouter } from "next/router";
import { useState } from "react";
import errorHandling from "../../services/errorHandling";
import projectHandling from "../../services/projectHandling";
import HomeLayout from "../../components/layout/HomeLayout";
import { Card, Container, Carousel, Col, Row, Stack} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { FacebookShareButton, LineShareButton, LinkedinShareButton, PinterestShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { RiFacebookLine, RiLineLine, RiLinkedinLine, RiLinksLine, RiPinterestLine, RiTelegramLine, RiTwitterLine, RiWhatsappLine } from "react-icons/ri";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ToastMessage from "../../components/ToastMessage";
import dayjs from 'dayjs';
import { BiEditAlt, BiUser } from "react-icons/bi";
import Thumbnail from "../../components/Thumbnail";
import Alert from '../../components/Alert'

export async function getServerSideProps(ctx){
    let projectData=[],error=[],recomendation=[];
    try{
        const response=await projectHandling.getOnePublish(ctx.params.id);
        projectData=response.data.data;
        recomendation=response.data.recomendation;
    }catch(err){error=errorHandling.getData("project",err)}

    return { props: { projectData, error, recomendation } }
}

const ShowDetailProject=({projectData,error,recomendation})=>{
    const router=useRouter();
    const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;
    const url=baseUrl+router.asPath;
    let desc=""
    if(projectData.description){
        desc=projectData.description.substring(0,150);
    }
    

    const tags=(projectTags)=>{
        let tags=[],tagsSplit=[];
        tagsSplit=projectTags.split(",")
        tagsSplit.map((tag)=>{
            tags.push(tag.trim());
        });
        return tags
    };
    // console.log("recomendation =>",recomendation)


    const [project,setProject]=useState(projectData);
    const [msg,setMsg]=useState(error);
    const [showToast,setShowToast]=useState(false);

    const thumbnail = (images) => {
        let img=[],thub=[],fixImg=[];
        thub=0
        images.map((data)=>{
            // if(data._id.thumbnail===true){
            if(data.thumbnail===true){
                thub=1;
                // img=data._id;
                img=data;
            }
        });
        if(thub===0&&images.length>0){
            // img=images[0]._id;
            img=images[0];
        }
        fixImg.push(img);
        images.map((data)=>{
            if(data._id!=img._id){
                fixImg.push(data)
            }
        })
        return fixImg;
        
    }

    return (
        projectData.url?(
        <HomeLayout 
            title={projectData.title}
            metaDesc={projectData.metaDescription}
            metaKey={projectData.metaKeyword}
        >
            <Container fluid={false} style={{alignItems:'center',marginTop:'64px',paddingTop:"1.5rem",minHeight:'80vh'}} className="bg-light">
            <Row className="g-3 pb-5">
                <Col md={6}>
                    <div className="sticky-md-top">
                    <Carousel variant="dark" slide={true}>
                        {thumbnail(projectData.images)?.map((data,idx)=>{
                            return (
                                <Carousel.Item key={idx}>
                                    <img
                                        className="d-block w-100"
                                        src={data.cdnUrl||process.env.NEXT_PUBLIC_SERVER_URL_IMAGE+data.fileName}
                                        alt={data.altText||"Image "+idx}
                                    />
                                </Carousel.Item>
                            )
                        })}
                    
                    </Carousel>
                        <Stack className="my-3 flex-wrap" direction="horizontal" gap={2}>
                            <PinterestShareButton url={url} media={thumbnail(projectData.images)[0].cdnUrl} description={desc}>
                                <div className="btn btn-sm btn-outline-danger shadow border-0" >
                                    <RiPinterestLine/>    
                                </div>
                            </PinterestShareButton>
                            <FacebookShareButton url={url} quote={desc}>
                                <div className="btn btn-sm btn-outline-primary shadow border-0" >
                                    <RiFacebookLine />    
                                </div>
                            </FacebookShareButton>
                            <WhatsappShareButton url={url} title={projectData.title} separator={desc}>
                                <div className="btn btn-sm btn-outline-success shadow border-0" >
                                    <RiWhatsappLine />    
                                </div>
                            </WhatsappShareButton>
                            <TwitterShareButton url={url} title={projectData.title} via={desc}>
                                <div className="btn btn-sm btn-outline-primary shadow border-0" >
                                    <RiTwitterLine />    
                                </div>
                            </TwitterShareButton>
                            <LinkedinShareButton url={url} title={projectData.title} source="DotsDizzy" summary={desc}>
                                <div className="btn btn-sm btn-outline-primary shadow border-0" >
                                    <RiLinkedinLine />    
                                </div>
                            </LinkedinShareButton>
                            <TelegramShareButton url={url} title={projectData.title}>
                                <div className="btn btn-sm btn-outline-primary shadow border-0" >
                                    <RiTelegramLine />    
                                </div>
                            </TelegramShareButton>
                            <LineShareButton url={url} title={projectData.title}>
                                <div className="btn btn-sm btn-outline-success shadow border-0" >
                                    <RiLineLine />    
                                </div>
                            </LineShareButton>
                            <CopyToClipboard text={url}
                                onCopy={() => {setShowToast(true); setMsg({status:"success",msg:"Link copied"})}}
                            >
                                <div className="btn btn-sm btn-outline-secondary shadow border-0" >
                                    <RiLinksLine />   
                                </div>                                
                            </CopyToClipboard>
                        </Stack>
                        
                    </div>
                    <ToastMessage
                        show={showToast}
                        setShow={setShowToast}
                        msg={msg}
                        position="top-center"
                    />
                </Col>
                <Col md={6} className="ps-md-4">
                    <Stack className="my-3 flex-wrap" direction="horizontal" gap={2}>
                        {projectData.categorys?.map((category,idx)=>{
                            return (
                                <Link href={`/gallery?category=${category.name}`} key={idx}>
                                    <a className="btn btn-sm btn-secondary border-0 shadow-sm">{category.name}</a>
                                </Link>
                            )
                        })}

                    </Stack>
                    <h1>{projectData.title}</h1>
                    <Row className="text-muted my-3">
                        <Col md={6}><BiUser /> I Gede Made Padma Yasa</Col>
                        <Col md={6}><BiEditAlt/> {dayjs(projectData.updatedAt).format('D MMMM YYYY')}</Col>
                    </Row>
                    <p style={{whiteSpace:"pre-line"}}>{projectData.description}</p>
                    {/* <div dangerouslySetInnerHTML={{ __html: projectData.description }}></div> */}
                    <Row className="text-muted my-3">
                        <Col md={6}>Created at {dayjs(projectData.createdAt).format('D MMMM YYYY')}</Col>
                        {/* <Col md={6}>By I Gede Made Padma Yasa</Col> */}
                    </Row>
                    <Stack className="my-4 flex-wrap" direction="horizontal" gap={2}>
                        {tags(projectData.tags)?.map((tag,idx)=>{
                            return (
                                <Link href={`/gallery?tags=${tag}`} key={idx}>
                                    <a className="btn btn-sm btn-outline-secondary border-0 shadow-sm px-2">#{tag}</a>
                                </Link>
                            )
                        })}

                    </Stack>
                </Col>
            </Row>
            {recomendation&&(
                <>
                <Row>
                    <Col md={12}><h2 style={{fontSize:"1.25rem"}}>See My Other Project Recommendations</h2></Col>
                </Row>
                <Row className="py-3 mb-4">
                    {recomendation.map((data,idx)=>{
                        return (
                            <Col xs={6} sm={6} md={3} key={idx}>
                                <Link href={`/gallery/${data.url}`}>
                                    <a href="#" title={data.title}>
                                    <Card className="shadow border-0 h-100 clickable">
                                        {data.images&&(<Thumbnail images={data.images}/>)}
                                    </Card>
                                    </a>
                                </Link>
                            </Col>
                        )
                    })}
                </Row>
                </>
            )}
            
            </Container>
        </HomeLayout>
        ):(
            <HomeLayout>
                <Container fluid={false} style={{alignItems:'center',marginTop:'64px',paddingTop:"1.5rem",minHeight:'80vh'}} className="bg-light">
                    {error&&(<Alert status={error.status} msg={error.msg}/>)}
                </Container>
            </HomeLayout>
        )
    )
}

export default ShowDetailProject;