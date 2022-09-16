import Head from "next/head";
import { Container, Row, Col, Stack, Button, Breadcrumb, Form, FloatingLabel, InputGroup, Modal, Spinner, Pagination } from "react-bootstrap";
import NavbarDashboard from "../../components/dashboard/NavbarDashboard";
import Footer from "../../components/Footer";
import { BiFilter, BiPlus, BiSave, BiSearch, BiTrash, BiUpload, BiX } from "react-icons/bi";
import CardProjects from "../../components/CardProjects";
import { useEffect, useState } from "react";
import projectHandling from "../../services/projectHandling";
import categoryHandling from "../../services/categoryHandling";
import errorHandling from "../../services/errorHandling";
import Alert from "../../components/Alert";
import SelectCategory from "../../components/dashboard/SelectCategory";
import Thumbnail from "../../components/Thumbnail";
import AddImageToProjectModal from "../../components/dashboard/projects/AddImageToProjectModal";

const DashboardHome=()=>{
    const [projects,setProjects]=useState([]);
    const [project,setProject]=useState({
        _id:"",
        title:"",
        description:"",
        tags:"",
        url:"",
        metaKeyword:"",
        metaDescription:"",
        published:false,
        showAtHome:false,
        createdAt:"",
        updatedAt:"",
        categorys:[],
        images:[]
    });
    const [loading,setLoading]=useState(true);
    const [pagging,setPagging]=useState([]);
    const [optionGetData,setOptionGetData]=useState({
        page:1,
        searchKey:'',
        category:'',
        searchBy:'title',
        sortBy:'createdAt',
        sortOption:'desc',
        limit:10
    });
    const changeOption=async(name,value)=>{
        setOptionGetData(prev=>({...prev, [name]:value}));
    }
    const prevOrNext=async(option,page)=>{
        if(option==="prev"){
            if(page>1){
                setOptionGetData(prev=>({...prev, page:page-1}));
            }
        }else{
            setOptionGetData(prev=>({...prev, page:page+1}));
        }
    }
    const [msg,setMsg]=useState({
        status:'',
        msg:'',
    });

    useEffect(()=>{
        getData();
    },[optionGetData]);

    
    const getData=async()=>{
        setLoading(true);
        try{
            const response=await projectHandling.getAll(optionGetData);
            setProjects(response.data.data);
            setPagging({
                "page":response.data.page,
                "limit":response.data.limit,
                "total":response.data.total,
                "totalPage":response.data.totalPage,
            })
            console.log("project=>",response)
        }catch(err){
            setMsg(errorHandling.getData("project",err));
        }
        setLoading(false);
    }
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

    const handleSearch=async(e)=>{
        e.preventDefault();
        setOptionGetData(prev=>({...prev, searchKey:e.target.elements.searchKey.value}))
    }

    const handleFilter=async(e)=>{
        e.preventDefault();
        setOptionGetData(prev=>({...prev, limit:e.target.elements.limit.value}))
        setOptionGetData(prev=>({...prev, searchBy:e.target.elements.searchBy.value}))
        setOptionGetData(prev=>({...prev, category:e.target.elements.category.value}))
        setOptionGetData(prev=>({...prev, sortOption:e.target.elements.sortOption.value}))
        setOptionGetData(prev=>({...prev, sortBy:e.target.elements.sortBy.value}))
    }

    const handleResetSearch=async()=>{
        setOptionGetData(prev=>({...prev, searchKey:""}))
    }

    const [showSearch,setShowSearch]=useState(false);
    const [loadingSearch,setLoadingSearch]=useState(false);

    const showSearchModal=async()=>{
        setShowSearch(true);
    }
    const hideSearchModal=async()=>{
        setShowSearch(false)
    }

    const [showAdd,setShowAdd]=useState(false);
    const [loadingAdd,setLoadingAdd]=useState(false);
    
    const [showImageToProject,setShowImageToProject]=useState(false);

    const handleChange=async(e)=>{
        if(e.target.name==="url"){
            e.target.value=e.target.value.toString().replace(/[ ]/g, '-');
            e.target.value=e.target.value.toString().replace(/[^a-zA-Z0-9-_]/g, '');
        }
        if(e.target.name==="tags"||e.target.name==="metaKeyword"){
            e.target.value=e.target.value.toString().replace(/[^a-zA-Z0-9, ]/g, '');
        }
        if(e.target.name==="published"||e.target.name==="showAtHome"){
            setProject(prev=>({...prev, [e.target.name]:e.target.checked}));
        }else{
            setProject(prev=>({...prev, [e.target.name]:e.target.value}));
        }

        // console.log(await project)
    }
    const handleAdd=async(e)=>{
        e.preventDefault();
        setLoadingAdd(true);
        try{
            const response=await projectHandling.addOne(project);
            getData();
            await setProject(response.data.data);
            // console.log(project);
            // e.target.reset();
            setMsg({
                status:"success",
                msg:"Add New Project Successfully"
            });
            setLoadingAdd(false);
        }catch(err){
            setLoadingAdd(false);
            setMsg(errorHandling.addData("project",err));
        }
    }

    const showAddModal=async()=>{
        setMsg({
            status:"",
            msg:""
        })
        setShowAdd(true);
    }
    const hideAddModal=async()=>{
        setShowAdd(false)
        setProject({
            title:"",
            description:"",
            tags:"",
            url:"",
            metaKeyword:"",
            metaDescription:"",
            published:false,
            showAtHome:false,
            categorys:[],
            images:[]
        });
        setMsg({
            status:"",
            msg:""
        })
    }

    const handleUpdate=async(e)=>{
        e.preventDefault();
        setLoadingAdd(true);
        try{
            const response=await projectHandling.updateOne(project);
            getData();
            let data={
                title:response.data.data.title,
                description:response.data.data.description,
                tags:response.data.data.tags,
                url:response.data.data.url,
                metaKeyword:response.data.data.metaKeyword,
                metaDescription:response.data.data.metaDescription,
                published:response.data.data.published,
                showAtHome:response.data.data.showAtHome,
                categorys:response.data.data.categorys,
            }
            setProject(prev=>({...prev,data}));
            
            // console.log(data);
            // e.target.reset();
            setMsg({
                status:"success",
                msg:"Update Project Successfully"
            });
            setLoadingAdd(false);
        }catch(err){
            setLoadingAdd(false);
            setMsg(errorHandling.updateData("project",err));
        }
    }

    // delete function
    const [showDelete,setShowDelete]=useState(false);
    const [loadingDelete,setLoadingDelete]=useState(false);

    const handleDelete=async(e)=>{
        e.preventDefault();
        setLoadingDelete(true);
        try{
            const response=await projectHandling.deleteOne(project._id);
            getData();
            setProject([]);
            setMsg({
                status:"success",
                msg:"Delete Project Successfully"
            });
            setLoadingDelete(false);
            hideDeleteModal();
        }catch(err){
            setLoadingDelete(false);
            setMsg(errorHandling.deleteData("project",err));
        }
    }

    const showDeleteModal=async()=>{
        setMsg({
            status:"",
            msg:""
        })
        setShowAdd(false);
        setShowDelete(true);
    }
    const hideDeleteModal=async()=>{
        setShowDelete(false)
        setProject({
            title:"",
            description:"",
            tags:"",
            url:"",
            metaKeyword:"",
            metaDescription:"",
            published:false,
            showAtHome:false,
            categorys:[],
            images:[]
        });
        setMsg({
            status:"",
            msg:""
        })
    }

    return(
        <>
            <Head>
                <title>Dashboard - DotsDizzy</title>
            </Head>
            <NavbarDashboard fluid={true} bgC="dark" variant="dark"/>
            <Container fluid={true} style={{alignItems:'center',marginTop:'64px',paddingTop:"1.5rem"}}>
                <Stack direction="horizontal" gap={3}>
                    <h1>Project</h1>
                    <Button variant="primary" className="ms-auto d-flex p-3 align-items-center" onClick={()=>showAddModal()}><BiPlus/> <span className="d-none d-md-block ms-2">Add Project</span></Button>
                </Stack>
                <hr/>    
            </Container>
            <Container fluid={true} style={{minHeight:'80vh'}} className="bg-light">
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
                                defaultValue={optionGetData.limit}
                                aria-label="Keyword"
                                aria-describedby="basic-addon2"
                                className="border-0"
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
                                    <option value="published">Published</option>
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
                        <Button variant="primary"  type="submit" disabled={loadingSearch} onClick={hideSearchModal} size="lg">
                            {loadingSearch&&(<Spinner animation="border" size="sm"/>)} <BiSave/> Set Filter
                        </Button>
                    </Modal.Footer>
                </form>
                </Modal>
                <Alert status={msg.status} msg={msg.msg} />
                <Row className="g-3 py-4">
                    {projects.map((data,index)=>{
                        return (
                            <Col md={3} key={index}>
                                <CardProjects data={data} openUpdate={showAddModal} setData={setProject}/>
                            </Col>
                        )
                    })}
                    {/* {Array.from({ length: 12 }).map((_, idx) => (
                        <Col md={3} key={idx}>
                            <CardProjects/>
                        </Col>
                    ))} */}
                </Row>
                <Row>
                    <Col sm={12}>
                    <Pagination>
                        {pagging.page>1&&(<Pagination.First onClick={()=>changeOption("page",1)}/>)}
                        {pagging.page>1&&(<Pagination.Prev onClick={()=>prevOrNext("prev",pagging.page)}/>)}
                        {Array.from({ length: pagging.totalPage }).map((_, idx) => (
                            <Pagination.Item key={idx} onClick={()=>changeOption("page",idx+1)} active={idx+1===pagging.page?(true):(false)}>{idx+1}</Pagination.Item>
                        ))}
                        {pagging.page<pagging.totalPage&&(<Pagination.Next onClick={()=>prevOrNext("next",pagging.page)}/>)}
                        {pagging.page<pagging.totalPage&&(<Pagination.Last onClick={()=>changeOption("page",pagging.totalPage)}/>)}
                    </Pagination>
                    </Col>
                </Row>
            </Container>
            <Modal 
                show={showAdd} 
                fullscreen={true} 
                onHide={() => hideAddModal()} 
                // scrollable={true}
                
            >
            <form onSubmit={project._id?((e)=>handleUpdate(e)):((e)=>handleAdd(e))}>
                <Modal.Header closeButton
                >
                    <Modal.Title>{!project._id?("Add New Project"):("Update Project")}</Modal.Title>
                </Modal.Header>
                <Modal.Body 
                    style={{
                        maxHeight:"70vh",
                        overflowY:"auto",
                    }}
                >
                    <Alert status={msg.status} msg={msg.msg}/>    
                        <Row>
                            <Col md={8}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Title"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" name="title" value={project.title&&(project.title)} maxLength="255" onChange={handleChange} required placeholder="name" />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Url"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" name="url" value={project.url&&(project.url)} maxLength="255" onChange={handleChange} required placeholder="name" />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Description"
                                    className="mb-3"
                                >
                                    <Form.Control type="text"  as="textarea" value={project.description&&(project.description)} name="description" onChange={handleChange} placeholder="description" style={{height:"250px"}}/>
                                </FloatingLabel>
                            </Col>
                            <Col md={4}>
                                {project._id&&(
                                    <div className="mb-3">
                                        <Thumbnail images={project.images}/>
                                        <div className="d-grid gap-2">
                                            <Button variant="outline-primary" onClick={()=>setShowImageToProject(true)}>
                                                <BiUpload/> Set Image
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                <Form.Group className="mb-3" controlId="formCategory">
                                    <Form.Label>Categorys</Form.Label>
                                    <SelectCategory result={setProject} value={project.categorys}/>
                                </Form.Group>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Check 
                                            type="switch"
                                            id="custom-switch"
                                            label="Published"
                                            name="published"
                                            onChange={handleChange}
                                            checked={project.published&&(project.published)}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check 
                                            type="switch"
                                            id="custom-switch2"
                                            label="Home"
                                            name="showAtHome"
                                            onChange={handleChange}
                                            checked={project.showAtHome&&(project.showAtHome)}
                                        />
                                    </Col>
                                </Row>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Tags"
                                    className="mb-3"
                                >
                                    <Form.Control type="text"  as="textarea" value={project.tags&&(project.tags)} name="tags" onChange={handleChange} placeholder="tags" style={{height:"100px"}}/>
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Meta Keyword"
                                    className="mb-3"
                                >
                                    <Form.Control type="text"  as="textarea" name="metaKeyword" value={project.metaKeyword&&(project.metaKeyword)} onChange={handleChange} placeholder="meta keyword" style={{height:"100px"}}/>
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Meta Description"
                                    className="mb-3"
                                >
                                    <Form.Control type="text"  as="textarea" name="metaDescription" value={project.metaDescription&&(project.metaDescription)} onChange={handleChange} placeholder="meta description" style={{height:"100px"}}/>
                                </FloatingLabel>
                            </Col>
                        </Row>
                       
                    
                </Modal.Body>
                <Modal.Footer 
                    className="d-flex justify-content-between bg-white"
                    style={{
                        maxHeight:"100px",
                        overflow:"auto",
                    }}
                >
                    <Button variant="primary"  type="submit" disabled={loadingAdd} size="lg">
                        {loadingAdd&&(<Spinner animation="border" size="sm"/>)} {!project._id?("Save"):("Save Changes")}
                    </Button>
                    {project._id&&(
                    <Button variant="outline-danger"  type="button" disabled={loadingAdd} onClick={showDeleteModal} size="lg">
                        <BiTrash/>
                    </Button>
                    )}

                </Modal.Footer>
            </form>
            </Modal>
            <Modal 
                show={showDelete} 
                fullscreen={true} 
                onHide={() => hideDeleteModal()} 
                // scrollable={true}
                
            >
            <form onSubmit={(e)=>handleDelete(e)}>
                <Modal.Header closeButton
                >
                    <Modal.Title>Delete Project</Modal.Title>
                </Modal.Header>
                <Modal.Body 
                    style={{
                        maxHeight:"70vh",
                        overflowY:"auto",
                    }}
                >
                    <Alert status={msg.status} msg={msg.msg}/>    
                    <h2>{project.title}</h2>
                    {project.categorys&&(
                        <Breadcrumb>
                            {project.categorys.map((data,index)=>{
                                return (
                                    <Breadcrumb.Item key={index} href="#">{data.name}</Breadcrumb.Item>
                                )
                            })}
                            <Breadcrumb.Item active>{project.url}</Breadcrumb.Item>
                        </Breadcrumb>
                    )}
                    <p>{project.description}</p>
                       
                    
                </Modal.Body>
                <Modal.Footer 
                    className="d-flex justify-content-between bg-white"
                    style={{
                        maxHeight:"100px",
                        overflow:"auto",
                    }}
                >
                    <Button variant="danger"  type="submit" disabled={loadingDelete} size="lg">
                        {loadingDelete&&(<Spinner animation="border" size="sm"/>)} <BiTrash/> Delete Project
                    </Button>
                    
                    <Button variant="secondary"  type="button" disabled={loadingDelete} onClick={hideDeleteModal} size="lg">
                        Cancel
                    </Button>

                </Modal.Footer>
            </form>
            </Modal>
            <AddImageToProjectModal 
                show={showImageToProject}
                setShow={setShowImageToProject}
                data={project}
                setData={setProject}
                msg={msg}
                setMsg={setMsg}
                reloadData={getData}
                // hideOtherModal={hideOtherModal}
            />
            <Footer/>
        </>
    );
}

export default DashboardHome;