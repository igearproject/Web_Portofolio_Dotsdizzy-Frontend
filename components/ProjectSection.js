import Image from 'next/image';
import Link from 'next/link';
import { Col, Container, Row, Button } from 'react-bootstrap';
import {AiOutlineInstagram} from 'react-icons/ai';
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const ProjectSection = () => {
    const {ref, inView}=useInView({
        threshold:0.5
    });
    const animation=useAnimation();
    useEffect(()=>{
        if(inView){
            animation.start({
                opacity: 1,
                scale:1,
                transition:{
                    type:'spring',duration:1.5,bounce:0.3
                }
            });
        }
        if(!inView){
            animation.start({
                opacity: 0,
                scale:0
            });
        }

    },[inView]);
    return (
        <Container fluid>
            <Row style={{minHeight:'480px'}} className="py-5 align-items-center overflow-hidden" ref={ref}>
                <motion.div animate={animation} className="col-md-4 p-md-5 pt-3 mb-3 align-items-center h-100">
                    <span className="text-primary subheading">My Project</span>
                    <h2 className="mb-2">The Latest Project I Made</h2>
                    <p className="mb-4 descheading">If you like some of the projects i made. Maybe you and I are suitable to work together.</p>
                    <a href="#contact">
                        <Button variant="outline-primary" className="me-3">Contact Me</Button>
                    </a>
                </motion.div>
                <motion.div className="col-md-8 pb-md-5" animate={animation}>
                    <Row
                        className="mx-md-5 mt-4 overflow-scroll d-flex flex-row flex-nowrap row-cols-2 gx-2"
                    >
                        <Col style={{minWidth:'70%'}}>
                            <Image src="/img/ilustration/tiny/dotsdizzy 1 illustration culture and nature.png" alt="project illustration 1" layout="responsive" height='250px' width="250px"/>
                        </Col>
                        <Col style={{minWidth:'70%'}}>
                            <Image src="/img/ilustration/tiny/dotsdizzy 2 illustration girl dancing sumatera.png" alt="project illustration 2" layout="responsive" height='250px' width="250px"/>
                        </Col>
                        <Col style={{minWidth:'70%'}}>
                            <Image src="/img/ilustration/tiny/dotsdizzy 3 illustration girl dancing bali.png" alt="project illustration 3" layout="responsive" height='250px' width="250px"/>
                        </Col>
                        <Col style={{minWidth:'70%'}}>
                            <Image src="/img/ilustration/tiny/dotsdizzy 4 illustration culture and nature.png" alt="project illustration 4" layout="responsive" height='250px' width="250px"/>
                        </Col>
                        <Col style={{minWidth:'70%'}}>
                            <Image src="/img/ilustration/tiny/dotsdizzy 5 illustration drink.png" alt="project illustration 5" layout="responsive" height='250px' width="250px"/>
                        </Col>
                        <Col style={{minWidth:'70%'}}>
                            <Image src="/img/ilustration/tiny/dotsdizzy 5 illustration girl and beauty.png" alt="project illustration 6" layout="responsive" height='250px' width="250px"/>
                        </Col>
                        {/* <Col style={{minWidth:'70%'}}>
                            <Image src="/img/ilustration/tiny/" layout="responsive" height='250px' width="250px"/>
                        </Col> */}
                        
                    </Row>
                    <Row>
                        <Col md={12} className="d-flex flex-wrap align-items-center justify-content-center g-2 text-start text-md-center mt-4 ">
                            <Link href="/gallery">
                                <a href="#" >
                                    <Button variant="secondary" className="border-0 shadow me-3 mb-3">See More In Gallery</Button>
                                </a>
                            </Link>
                            <a href="https://www.instagram.com/dots_dizzy/" target="_blank" rel="noreferrer" >
                                <Button variant="outline-secondary" className="border-0 shadow me-3 mb-3">
                                    <span className="me-1">See More Project</span> <AiOutlineInstagram/>
                                </Button>
                            </a>
                            <a href="https://www.shutterstock.com/g/dotsdizzy" target="_blank" rel="noreferrer">
                                <Button variant="outline-secondary" className="border-0 shadow me-3 mb-3">Buy My Stock in Shutterstock</Button>
                            </a>
                        </Col>
                    </Row>
                </motion.div>
            </Row>
        </Container>
    )
}

export default ProjectSection