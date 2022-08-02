import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
    return (
        <Container fluid className="bg-dark text-secondary text-center text-md-start">
            <Row  className="py-4">
                <Col md={8} className="pb-3 pb-md-0">2022 By Gede Made Padma Yasa. Develop by <a href="https://igedearya.sipintek.com">I Gede_Arya</a></Col>
                <Col md={4} className="text-md-end">Hosted in Vercel</Col>
            </Row>
        </Container>
    )
}

export default Footer