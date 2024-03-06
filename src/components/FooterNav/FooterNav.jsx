import Nav from 'react-bootstrap/Nav';

export const FooterNav = () => {
    return (
        <>
            <Nav className="justify-content-center bg-dark" activeKey="/home">
                <Nav.Item>
                    <Nav.Link className='text-white' href="/home">| DiGestión |</Nav.Link>
                </Nav.Item>
            </Nav>
            <Nav className="justify-content-center bg-dark" >
                <Nav.Item>
                    <Nav.Link className='text-white' eventKey="link-1">PROVEEDORES</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='text-white' eventKey="link-2">REMITOS</Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    );
}
