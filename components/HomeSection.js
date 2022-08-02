import {Container,Row,Button} from 'react-bootstrap';
import Image from 'next/image';
import { motion } from "framer-motion";

const HomeSection = () => {
    
    return (
        <Container fluid className="overflow-hidden">
            <Row style={{minHeight:'480px',alignItems:'center',marginTop:'64px'}}>
                <motion.div 
                    className="p-md-5 pt-4 mb-3 align-items-center col-md-6"
                    initial={{y:-300}}
                    animate={{y:0}}
                    transition={{ type: "spring", duration: 2 }}
                >
                    <span className="text-primary subheading">Illustration Designer</span>
                    <h1 className="mb-2">Let`&apos;s Make Unique Illustration<br/>With DotsDizzy</h1>
                    <p className="mb-4 descheading">I can help you in making illustration designs, so that your products are more attractive and easy to understand</p>
                    <a href="#about">
                        <Button variant="outline-primary">More About Me</Button>
                    </a>
                </motion.div>
                <motion.div 
                    className="col-md-6 mb-4 p-md-5"
                    initial={{y:300}}
                    animate={{y:0}}
                    transition={{ type: "spring" , duration: 2 }}
                >
                    <Image src='/img/ilustration/tiny/i am a illustrator.png' alt="illustration i a illustrator" layout="responsive" width="150px" height="150px" priority/>
                </motion.div>
            </Row>
        </Container>
    )
}

export default HomeSection;
