import {Container, Row, ButtonGroup} from 'react-bootstrap';
import Image from 'next/image';
import {BsInstagram} from 'react-icons/bs';
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const AboutMeSection = () => {
    const {ref, inView}=useInView({
        threshold:0.5
    });
    const animation=useAnimation();
    const animationLeft=useAnimation();
    useEffect(()=>{
        if(inView){
            animation.start({
                x:0,
                transition:{
                    type:'spring',duration:1.5,bounce:0.3
                }
            });
            animationLeft.start({
                x:0,
                transition:{
                    type:'spring',duration:1.5,bounce:0.3
                }
            });
        }
        if(!inView){
            animation.start({
                x:'-100vw'
            });
            animationLeft.start({
                x:'100vw'
            });
        }

    },[inView]);

    return (
        <Container fluid className="bg-light overflow-hidden">
            <Row style={{minHeight:'480px',alignItems:'center'}} ref={ref} className="py-5">
                <motion.div animate={animation} className="col-md-6 mb-md-4 p-md-5 order-1 order-md-0">
                    <Image src='/img/ilustration/tiny/dotsdizzy me.png' alt="illustration about me" layout="responsive" width="150px" height="150px" priority/>
                </motion.div>
                <motion.div animate={animationLeft} className="col-md-6 p-md-5 pt-4 mb-3 align-items-center h-100 order-0 order-md-1">
                    <span className="text-primary subheading">About Me</span>
                    <h2 className="mb-2">My Name Is <br/>I Gede Made Padma Yasa</h2>
                    <p className="mb-4 descheading">I&apos;m a designer from Indonesia, you can call me Gede. I study at the Indonesian Art Institute (ISI) Bali. Now I focus on making illustrator designs. If you need a unique illustration design, you can contact me.</p>
                    <ButtonGroup>
                        <a href="#project" className="me-3 btn btn-outline-primary">See My Project</a>
                        <a href="https://www.instagram.com/dots_dizzy/" target="_blank" rel="noreferrer" className="me-3 btn btn-light">
                            {/* <box-icon type='logo' size="md" name='instagram' ></box-icon> */}
                            <BsInstagram/>
                        </a>
                    </ButtonGroup>
                </motion.div>
            </Row>
        </Container>
    )
}

export default AboutMeSection