import React, { useState, useRef, useLayoutEffect } from "react";
import {
    Navbar,
    Nav,
    NavDropdown,
    NavItem,
    NavLink,
    Dropdown,
    Form,
    FormControl,
    Button,
    Container,
    Col,
    Row,
} from "react-bootstrap"

import variables from "styles/_variables.module.scss"

/**
 * For example, if variables.sidebarBorderWidth is "2px",
 * we need to truncate the "px".
 */
const sidebarBorderWidth = variables.sidebarBorderWidth.slice(0, -2)

const MySidebar = () => {
    const mainCol = useRef(null);
    const btnCol = useRef(null);
    const btn = useRef(null);

    const [isExpanded, setIsExpanded] = useState(true)
    const [widthInput, setWidthInput] = useState("")
    const [width, setWidth] = useState(242)

    const submitWidth = (e) => {
        e.preventDefault();
        console.log("submitWidth")
        setWidth(widthInput)
    }
    const widthChange = (e) => {
        console.log("widthChange")
        setWidthInput(e.target.value)
    }

    useLayoutEffect(() => {
        if (isExpanded) {
            mainCol.current.style.width = width + "px"
            btnCol.current.style.marginLeft = "-" + sidebarBorderWidth + "px"
            btn.current.style.marginLeft = "-15px"
        }
        else {
            mainCol.current.style.width = "0px"
            btnCol.current.style.marginLeft = "24px"
            btn.current.style.marginLeft = (-15 - sidebarBorderWidth / 2) + "px"
        }
    }, [isExpanded, width])

    return (
        <Row className="my-sidebar" noGutters>
            <Col ref={mainCol} xs="auto" xl="auto" sm="auto" md="auto" lg="auto">
                <Navbar variant="dark" expand="true">
                    <Nav className="flex-column">
                        <Nav.Link style={{ "marginTop": "20px" }} href="#full-list">Full list</Nav.Link>
                        <Nav.Link href="#my-score">My score</Nav.Link>
                        <Nav.Link href="#banking">Banking</Nav.Link>

                        <NavDropdown title="Analysis">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link href="#item-1">Item 1</Nav.Link>
                        <Nav.Link href="#item-2">Item 2</Nav.Link>
                        <Nav.Link href="#item-3">Item 3</Nav.Link>

                        <Form inline className="form" onSubmit={submitWidth}>
                            <FormControl type="text" placeholder="Width (default: 242)"
                                onChange={widthChange} />
                        </Form>
                        <Button variant="outline-light" onClick={submitWidth}>Submit</Button>
                        <Nav.Link href="#item-3">Item 4</Nav.Link>
                        <Nav.Link href="#item-3">Item 5</Nav.Link>

                    </Nav>

                </Navbar>
            </Col>
            <Col ref={btnCol} className="btn-col" xs="auto" xl="auto" sm="auto" md="auto" lg="auto">
                <Button ref={btn} onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? "<" : ">"}</Button>
            </Col>
        </Row>
    );
};
export default MySidebar