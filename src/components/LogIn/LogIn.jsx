import { useContext, useState } from 'react';
import { UserContext } from '../../UserContext/UserContext';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



export const LogIn = () => {


    const {  handleLogin, username,setUsername, email, setEmail, password, setPassword, error, usuarios, setUsuario, permisos, setPermisos, handleButtonLogIn } = useContext(UserContext);
    

    return (
        <div className='contenedorLogIn'>
            <Form className='formLogIn' onSubmit={handleLogin}>
                <h2 className='text-center'>DIGESTIÓN</h2>
              {/*   <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" placeholder="USUARIO" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group> */}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Constraseña</Form.Label>
                    <Form.Control type="password" placeholder="CONTRASEÑA" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button onClick={handleButtonLogIn} variant="primary" type="submit">
                    Ingresar
                </Button>
                {error === 'Request failed with status code 500' ? <p>Invalid username or password </p>: <p>{error}</p>}
            </Form>
        </div>
    );


}