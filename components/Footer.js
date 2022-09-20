import { Button, Container, Row, Col, Stack } from "react-bootstrap"
import { BiCopyright, BiEnvelope, BiGlobe } from "react-icons/bi"
import { RiInstagramLine, RiTwitterLine } from "react-icons/ri"

const Footer = () => {
    const year=new Date().getFullYear()
    return (
        <Container fluid className="bg-dark text-secondary text-center text-md-start">
            <Row className="g-4 justify-content-between" style={{fontSize:'0.95rem'}}>
                <Col md={4} className="text-start">
                    <h2 style={{fontSize:"1.25rem",paddingBottom:'0rem'}}>DotsDizzy</h2>
                    <p>Illustrator from Indonesia, DotsDizzy can help you create cool and unique custom illustrations for your business.</p>
                    <ul style={{textDecoration:'none',listStyle:'none',paddingLeft:0}}>
                        <li><BiEnvelope /> dotsdizzy1@gmail.com</li>
                    </ul>                    
                </Col>
                <Col className="text-start">
                    <h2 style={{fontSize:"1.25rem"}}>Social Media</h2>
                    <Stack direction="horizontal" gap="2" className="flex-wrap"> 
                        <Button variant="outline-danger" className="border-0 mb-2"><RiInstagramLine/></Button>
                        <Button variant="outline-primary" className="border-0 mb-2"><RiTwitterLine /></Button>
                    </Stack>
                    {/* <ul style={{textDecoration:'none',listStyle:'none',paddingLeft:0}}>
                        <li>Instagram</li>
                        <li>Twitter</li>
                    </ul> */}
                </Col>
                <Col className="text-start">
                    <h2 style={{fontSize:"1.25rem"}}>Partner</h2>
                    <ul style={{textDecoration:'none',listStyle:'none',paddingLeft:0}}>
                        <li className="mb-2"><a href="https://sipintek.com" target="_blank" rel="noreferrer"><BiGlobe /> Sipintek </a></li>
                        <li className="mb-2"><a href="https://igedearya.sipintek.com" target="_blank" rel="noreferrer"><BiGlobe /> IGedeArya </a></li>
                    </ul>
                </Col>
                <Col className="text-start">
                    <h2 style={{fontSize:"1.25rem"}}>Hosted in</h2>
                    <ul style={{textDecoration:'none',listStyle:'none',paddingLeft:0}}>
                        <li className="mb-2"><a href="https://vercel.com" target="_blank" rel="noreferrer"><BiGlobe /> Vercel </a></li>
                        <li className="mb-2"><a href="https://www.client.webnesia.co.id/aff.php?aff=75" target="_blank" rel="noreferrer"><BiGlobe /> Webnesia </a></li>
                        <li className="mb-2"><a href="https://cloudinary.com" target="_blank" rel="noreferrer"><BiGlobe /> Cloudinary </a></li>
                        <li className="mb-2"><a href="https://mongodb.com" target="_blank" rel="noreferrer"><BiGlobe /> Mongo </a></li>
                    </ul>
                </Col>
            </Row>
            <hr/>
            <Row  className="py-4">
                <Col md={12} className="pb-3 pb-md-0 text-center"><BiCopyright /> 2022 {year>2022&&(`- ${year}`)} By Gede Made Padma Yasa. Created by <a href="https://igedearya.sipintek.com">I Gede_Arya</a></Col>
            </Row>
        </Container>
    )
}

export default Footer