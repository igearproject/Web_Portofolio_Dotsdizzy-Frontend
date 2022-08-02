import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useState} from 'react';
import { BiDotsHorizontal, BiDotsVertical, BiUserCircle, BiChevronDown } from 'react-icons/bi';
import AccountMenu from './AccountMenu';
// import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarDashboard(props) {
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
        <AccountMenu userName="Gede Arya" className="d-md-none d-sm-block"/>
        
        <Navbar.Collapse id="navbarScroll" className="mb-4 mb-md-0">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '300px' }}
            navbarScroll
          >
            <Nav.Link href="#home">Project</Nav.Link>
            <Nav.Link href="#about">Category</Nav.Link>
            <Nav.Link href="#project">Images</Nav.Link>
            <Nav.Link href="#project">Email</Nav.Link>
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
          <AccountMenu userName="Gede Arya" className="d-none d-md-block"/>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default NavbarDashboard;