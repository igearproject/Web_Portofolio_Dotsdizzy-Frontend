import {useState, useEffect} from 'react';
import {Button, Col, Row, Modal, Form, InputGroup, Spinner} from 'react-bootstrap';
import {BiSearch, BiX, BiFilter, BiSave} from 'react-icons/bi'
import categoryHandling from '../../../services/categoryHandling';
import errorHandling from '../../../services/errorHandling';


const SearchAndFilterProject = ({optionGetData,setOptionGetData, setMsg}) => {
    const [showSearch,setShowSearch]=useState(false);
    const [loadingSearch,setLoadingSearch]=useState(false);

    const [dataCategorys,setDataCategorys]=useState([]);
    useEffect(()=>{
        getCategorys();
    },[]);
    const getCategorys=async()=>{
        try{
            const response=await categoryHandling.getAll();
            // console.log("response",response);
            setDataCategorys(response.data.data);
            
        }catch(err){
            setMsg(errorHandling.getData("category",err));
        }
    }
    
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
        setOptionGetData(prev=>({...prev, limit:e.target.elements.limit.value}))
        setOptionGetData(prev=>({...prev, searchBy:e.target.elements.searchBy.value}))
        setOptionGetData(prev=>({...prev, category:e.target.elements.category.value}))
        setOptionGetData(prev=>({...prev, sortOption:e.target.elements.sortOption.value}))
        setOptionGetData(prev=>({...prev, sortBy:e.target.elements.sortBy.value}))        
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
                    placeholder="Search project "
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
                        <Form.Label>Show</Form.Label>
                        <Form.Control
                            placeholder="Limit"
                            name="limit"
                            type="number"
                            defaultValue={optionGetData.limit}
                            aria-label="Keyword"
                            aria-describedby="basic-addon2"
                            // className="border-0"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formcategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Select defaultValue={optionGetData.category} name="category" aria-label="Select search by">
                            <option value="">All category</option>
                            {dataCategorys.map((data,idx)=>{
                                return(
                                    <option value={data.name} key={idx}>{data.name}</option>
                                )
                            })}
                        </Form.Select> 
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formSearchBy">
                        <Form.Label>Search By</Form.Label>
                        <Form.Select defaultValue={optionGetData.searchBy} name="searchBy" aria-label="Select search by">
                            <option>Select search by</option>
                            <option value="title">title</option>
                            <option value="description">description</option>
                        </Form.Select> 
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSortOption">
                        <Form.Label>Sort Setting</Form.Label>
                        <InputGroup>
                            <Form.Select defaultValue={optionGetData.sortBy} name="sortBy" aria-label="Select sort by">
                                <option>Select sort by column</option>
                                <option value="createdAt">Created at</option>
                                <option value="updatedAt">Updated at</option>
                                {/* <option value="published">Published</option> */}
                                <option value="title">Title</option>
                            </Form.Select>
                            <Form.Select defaultValue={optionGetData.sortOption} name="sortOption" aria-label="Select sort by">
                                <option>Select sort option</option>
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </Form.Select>
                        </InputGroup>
                    </Form.Group>                     
                    
                </Modal.Body>
                <Modal.Footer 
                    className="d-flex justify-content-between bg-white"
                    style={{
                        maxHeight:"100px",
                        overflow:"auto",
                    }}
                >
                    <Button variant="primary"  type="submit" disabled={loadingSearch} onClick={hideSearchModal}>
                        {loadingSearch&&(<Spinner animation="border" size="sm"/>)} <BiSave/> Set Filter
                    </Button>
                </Modal.Footer>
            </form>
            </Modal>
        </>
    )
}

export default SearchAndFilterProject