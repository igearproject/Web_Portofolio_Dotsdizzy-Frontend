import Head from "next/head";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import NavbarDashboard from "../../components/dashboard/NavbarDashboard";
import Footer from "../../components/Footer";
import { BiPlus } from "react-icons/bi";
import CardProjects from "../../components/CardProjects";

const DashboardHome=()=>{
    return(
        <>
            <Head>
                <title>Dashboard - DotsDizzy</title>
            </Head>
            <NavbarDashboard fluid={true} bgC="dark" variant="dark"/>
            <Container fluid={true} style={{alignItems:'center',marginTop:'64px',paddingTop:"1.5rem"}}>
                <Stack direction="horizontal" gap={3}>
                    <h1>Dashboard</h1>
                    <Button variant="primary" className="ms-auto d-flex p-3 align-items-center"><BiPlus/> <span className="d-none d-md-block ms-2">Add Project</span></Button>
                </Stack>
                <hr/>    
            </Container>
            <Container fluid={true} style={{minHeight:'80vh'}} className="bg-light">
                <Row className="g-3 py-4">
                    {Array.from({ length: 12 }).map((_, idx) => (
                        <Col md={3} key={idx}>
                            <CardProjects/>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer/>
        </>
    );
}

export default DashboardHome;