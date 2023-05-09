import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LogIn = () => {
    return (
        <div className='contenedorLogIn'>
            <Form className='formLogIn'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese Usuario" />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Constraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Ingresar
                </Button>
            </Form>
        </div>
    );
}