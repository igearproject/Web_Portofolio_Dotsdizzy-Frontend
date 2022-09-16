import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useState} from 'react';
import { BiDotsHorizontal, BiDotsVertical } from 'react-icons/bi';
import Link from 'next/link';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter } from 'next/router';

function NavbarHome(props) {
  const [showMore,setShowMore]=useState(false);
  
  const router=useRouter();
  const path=router.pathname.split('/')[1]||"/"
  
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
        <Link href="/">
          <a className="navbar-brand" href="#">DotsDizzy</a>
        </Link>
        <Link href="/#contact">
          <a href="#">
            <Button variant="primary" className="d-md-none d-sm-block">Contact Me</Button>
          </a>
        </Link>
        
        <Navbar.Collapse id="navbarScroll" className="mb-4 mb-md-0">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '300px' }}
            navbarScroll
          >
            <li className="nav-item">
              <Link href="/#home">
                <a className="nav-link" href="#">Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/#about">
                <a className="nav-link" href="#">About</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/#project">
                <a className="nav-link"  href="#">Project</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/gallery">
                <a className={path==="gallery"?("nav-link active"):("nav-link")} href="#">Gallery</a>
              </Link>
            </li>
            <Nav.Link href="https://www.fiverr.com/padmayasa" target="_blank">Fiverr</Nav.Link>
            <Nav.Link href="https://www.shutterstock.com/g/dotsdizzy" target="_blank">Shutterstock</Nav.Link>
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
          <Link href="/#contact">
            <a href="#">
              <Button variant="primary" className="d-none d-sm-none d-md-block">Contact Me</Button>
            </a>
          </Link>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default NavbarHome;