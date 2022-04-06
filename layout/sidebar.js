import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Container} from 'react-bootstrap'
import Link from 'next/link';
function SidebarComponent(props) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand href="#home">Corona Tracking WebApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
            
                </Nav>
                <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link eventKey={2} href="/resources">
                        Resources
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default SidebarComponent;