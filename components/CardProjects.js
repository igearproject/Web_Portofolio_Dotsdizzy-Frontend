import dayjs from "dayjs";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import {BiEdit} from "react-icons/bi";
import {MdOutlineUnpublished, MdOutlinePublishedWithChanges} from "react-icons/md"
import Thumbnail from "./Thumbnail";

const CardProjects = (props) => {
    const handleOpenUpddate=async(data)=>{
        props.openUpdate();
        props.setData(data);
    }
    return (
        <Card className="shadow-lg border-0 h-100 clickable" onClick={()=>handleOpenUpddate(props.data)}>
            <Card.Header className="text-muted d-flex align-content-between align-items-center">
                <span className="flex-grow-1">{dayjs(props.data.createdAt).format('D MMM YYYY')}</span>
                {!props.data.published?(<MdOutlineUnpublished/>):(<MdOutlinePublishedWithChanges className="text-success"/>)}
            </Card.Header>
            {props.data.images&&(
                // props.data.images.map((data)=>{
                //     return(
                //         data.thumbnail===true&&(
                //             // fileName
                            
                //             <Card.Img variant="top" src={data.cdnUrl||process.env.NEXT_PUBLIC_SERVER_URL_IMAGE+data.fileName} key={data.fileName}/>
                //         )
                //     )
                // })
                <Thumbnail images={props.data.images}/>
            )}
            <Card.Body>
                <Card.Title>{props.data.title}</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle> */}
                <Card.Text>
                    {props.data.description.substring(0, 50)}
                </Card.Text>
                {props.data.categorys&&(
                    props.data.categorys.map((category,idx)=>{
                        return (
                            <Card.Link href="#" key={idx} className="p-2 shadow rounded">{category.name}</Card.Link>
                        )
                    })
                )}
            </Card.Body>
            {/* <Card.Footer> */}
                {/* <span>Header</span> */}
                {/* <ButtonGroup className="d-flex align-content-between"> */}
                    {/* <Button variant="outline-primary border-0 shadow" onClick={()=>handleOpenUpddate(props.data)}><BiEdit/></Button> */}
                    {/* <Button variant="outline-danger" className="ms-3"><BiTrash/></Button> */}
                {/* </ButtonGroup> */}
            {/* </Card.Footer> */}
        </Card>
    )
}

export default CardProjects