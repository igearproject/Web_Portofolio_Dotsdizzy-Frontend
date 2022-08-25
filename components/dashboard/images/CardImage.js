import dayjs from "dayjs";
import { BiEdit } from "react-icons/bi";
import {Card, Button} from "react-bootstrap";

const CardImage = (props) => {
    return (
        <Card 
            // className="h-100"
        >
            <Card.Img variant="top" src={props.data.cdnUrl||process.env.NEXT_PUBLIC_SERVER_URL_IMAGE+props.data.fileName} />
            <Card.Body>
                <Card.Title>{props.data.alt_text?.substring(0,100)}</Card.Title>
                <Card.Text>
                    File Name : {props.data.fileName}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex align-items-center justify-content-between">
                <div className="text-muted">
                    {dayjs(props.data.createdAt).format('DD MMM YYYY')}
                </div>
                <Button variant="outline-primary border-0 shadow" onClick={()=>props.showModal(props.data)}>
                    <BiEdit/>
                </Button>
            </Card.Footer>
        </Card>
    )
}

export default CardImage