import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from "next/link"
import {useEffect, useState} from 'react';
import { BiDotsHorizontal, BiDotsVertical } from 'react-icons/bi';
import AccountMenu from './AccountMenu';
import { useRouter } from 'next/router';
// import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarDashboard(props) {
  const [showMore,setShowMore]=useState(false);
  const router=useRouter();
  
  const path=router.pathname.split('/')[2]||"/"

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
            <li className="nav-item">
              <Link href="/dashboard" >
                <a className={path==="/"?("nav-link active"):("nav-link")} aria-current="page" href="#">Project</a>
              </Link>
              
            </li>
            <li className="nav-item">
              <Link href="/dashboard/category" >
                <a className={path==="category"?("nav-link active"):("nav-link")} aria-current="page" href="#">Category</a>
              </Link>
              
            </li>
            <li className="nav-item">
              <Link href="/dashboard/images" >
                <a className={path==="images"?("nav-link active"):("nav-link")} aria-current="page" href="#">Images</a>
              </Link>
              
            </li>
            <li className="nav-item">
              <Link href="/dashboard/email" >
                <a className={path==="email"?("nav-link active"):("nav-link")} aria-current="page" href="#">Email</a>
              </Link>
              
            </li>
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