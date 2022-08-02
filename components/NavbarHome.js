import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useState} from 'react';
import { BiDotsHorizontal, BiDotsVertical } from 'react-icons/bi';
// import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarHome(props) {
  const [showMore,setShowMore]=useState(false);
  return (
    <Navbar bg={props.bgC} variant={props.variant} expand="md" fixed="top">
      <Container fluid={props.fluid} className={"bg-"+props.bgC}>
        <Navbar.Toggle aria-controls="navbarScroll" onClick={()=>setShowMore(!showMore)}>
          {/* <box-icon name={!showMore?('dots-vertical'):('dots-horizontal')} onClick={()=>setShowMore(!showMore)} color="white"></box-icon> */}
          {!showMore?(
            <BiDotsVertical/>
          ):(
            <BiDotsHorizontal/>
          )}
        </Navbar.Toggle>
        <Navbar.Brand href="#">DotsDizzy</Navbar.Brand>
        <a href="#contact">
          <Button variant="primary" className="d-md-none d-sm-block">Contact Me</Button>
        </a>
        
        <Navbar.Collapse id="navbarScroll" className="mb-4 mb-md-0">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '300px' }}
            navbarScroll
          >
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#project">Project</Nav.Link>
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
          <a href="#contact">
            <Button variant="primary" className="d-none d-sm-none d-md-block">Contact Me</Button>
          </a>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default NavbarHome;