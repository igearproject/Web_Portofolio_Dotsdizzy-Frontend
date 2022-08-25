import { useState } from 'react';
import {Col, Button, Row, Modal, Form, InputGroup, Spinner} from 'react-bootstrap';
import {BiSearch,BiX,BiFilter, BiSave} from 'react-icons/bi';

const SearchEmail = ({optionGetData,setOptionGetData}) => {

    const [showSearch,setShowSearch]=useState(false);
    const [loadingSearch,setLoadingSearch]=useState(false);
    
    const changeOption=(name,value)=>{
        setOptionGetData(prev=>({...prev, [name]:value}));
    }
    const handleSearch=async(e)=>{
        setLoadingSearch(true);
        e.preventDefault();
        changeOption('searchKey',e.target.elements.searchKey.value)
        setLoadingSearch(false);
    }

    const handleFilter=async(e)=>{
        e.preventDefault();
        setLoadingSearch(true);
        changeOption( 'limit',e.target.elements.limit.value);
        // changeOption( 'searchBy',e.target.elements.searchBy.value);
        // changeOption( 'sortOption',e.target.elements.sortOption.value);
        // changeOption( 'sortBy',e.target.elements.sortBy.value);
        setLoadingSearch(false);
    }

    const handleResetSearch=async()=>{
        changeOption( 'searchKey',"")
    }
    const showSearchModal=async()=>{
        setShowSearch(true);
    }
    const hideSearchModal=async()=>{
        setShowSearch(false)
    }

    return (
        <>
            <form onSubmit={handleSearch}>
                <Row>
                    <Col sm={12}>
                    <InputGroup className="mb-3 shadow" size="lg">
                        <Button variant="outline-secondary" className="border-0" onClick={showSearchModal} type="button">
                            <BiFilter/>
                        </Button>
                        <Form.Control
                        placeholder="Keyword"
                        name="searchKey"
                        aria-label="Keyword"
                        aria-describedby="basic-addon2"
                        className="border-0"
                        />
                        <Button variant="outline-secondary" className="border-0" onClick={handleResetSearch} type="reset">
                            <BiX/>
                        </Button>
                        <Button variant="outline-primary" className="border-0" type="submit">
                            <BiSearch/>
                        </Button>
                    </InputGroup>
                    </Col>
                    
                </Row>
            </form>
            <Modal 
                show={showSearch} 
                fullscreen={false} 
                onHide={() => hideSearchModal()} 
                
                >
                <form onSubmit={handleFilter}>
                <Modal.Header closeButton
                >
                    <Modal.Title>Filter & Sort</Modal.Title>
                </Modal.Header>
                <Modal.Body 
                    style={{
                        maxHeight:"70vh",
                        overflowY:"auto",
                    }}
                >
                    {/* <Alert status={msg.status} msg={msg.msg}/>  */}
                    <Form.Group className="mb-3" controlId="formLimit">
                        <Form.Label>Limit</Form.Label>
                        <Form.Control
                            placeholder="Limit"
                            name="limit"
                            type="number"
                            min={1}
                            max={20}
                            defaultValue={optionGetData.limit}
                            aria-label="Keyword"
                            aria-describedby="basic-addon2"
                            className="border-0"
                        />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="formSearchBy">
                        <Form.Label>Search By</Form.Label>
                        <Form.Select defaultValue={optionGetData.searchBy} name="searchBy" aria-label="Select search by">
                            <option>Select search by</option>
                            <option value="alt_text">Alt text</option>
                            <option value="fileName">File name</option>
                        </Form.Select> 
                    </Form.Group> */}

                    {/* <Form.Group className="mb-3" controlId="formSortOption">
                        <Form.Label>Sort Setting</Form.Label>
                        <InputGroup>
                            <Form.Select defaultValue={optionGetData.sortBy} name="sortBy" aria-label="Select sort by">
                                <option>Select sort by column</option>
                                <option value="createdAt">Created at</option>
                                <option value="updatedAt">Updated at</option>
                            </Form.Select>
                            <Form.Select defaultValue={optionGetData.sortOption} name="sortOption" aria-label="Select sort by">
                                <option>Select sort option</option>
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </Form.Select>
                        </InputGroup>
                    </Form.Group>                      */}
                    
                </Modal.Body>
                <Modal.Footer 
                    className="d-flex justify-content-between bg-white"
                    style={{
                        maxHeight:"100px",
                        overflow:"auto",
                    }}
                >
                    <Button variant="primary"  type="submit" disabled={loadingSearch} onClick={hideSearchModal} size="lg" className="shadow">
                        {loadingSearch&&(<Spinner animation="border" size="sm"/>)} <BiSave/> Set Filter
                    </Button>
                </Modal.Footer>
            </form>
            </Modal>
        </>
    )
}

export default SearchEmail