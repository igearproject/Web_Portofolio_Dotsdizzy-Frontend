import { Card, Button, ButtonGroup } from "react-bootstrap";
import {BiEdit, BiTrash} from "react-icons/bi";
import {MdOutlineUnpublished, MdOutlinePublishedWithChanges} from "react-icons/md"

const CardProjects = () => {
    return (
        <Card className="shadow-lg border-0">
            <Card.Header className="text-muted d-flex align-content-between align-items-center">
                <span className="flex-grow-1">2 days ago</span>
                <MdOutlineUnpublished/>
                {/* <MdOutlinePublishedWithChanges/> */}
            </Card.Header>
            <Card.Img variant="top" src="/img/ilustration/tiny/10v2.png" />
            <Card.Body>
                <Card.Title>Card title</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle> */}
                <Card.Text>
                    Ssjdhhsjd jsdjasjdask sjdkasjdsajnd sdjhsakdksjd djhagksdhasjd jsdjj djshdh jdaskdhj
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
            <Card.Footer>
                {/* <span>Header</span> */}
                <ButtonGroup className="d-flex align-content-between">
                    <Button variant="primary"><BiEdit/></Button>
                    <Button variant="outline-danger" className="ms-3"><BiTrash/></Button>
                </ButtonGroup>
            </Card.Footer>
        </Card>
    )
}

export default CardProjects