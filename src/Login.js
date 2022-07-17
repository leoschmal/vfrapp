import { Stack, Container, Form, Button, FloatingLabel } from "react-bootstrap";
import firebaseApp from "./credenciales";
import "bootstrap/dist/css/bootstrap.min.css";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
const auth = getAuth(firebaseApp);

const Login = () => {

const submitHandler = (e)=>{
    e.preventDefault();
    const correo = e.target.formBasicEmail.value;
    const contra = e.target.formBasicPassword.value;
    
    signInWithEmailAndPassword(auth, correo, contra)
    .then((userCredential) => {        
        const user = userCredential.user;
        console.log(user.user);        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert('Error');
      });    
}

  return (
    <>
    
  

    <Container>
      <Stack className="contenedorForm">
          <h1 className="text-center">VFR Nav Planner</h1>          
        <Form onSubmit={submitHandler} >
          <Form.Group className="mb-3" controlId="formBasicEmail">            
            <FloatingLabel controlId="formBasicEmail" label="Correo">
              <Form.Control size="sm" type="email" placeholder="Ingrese email" />
            </FloatingLabel>            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel controlId="formBasicPassword" label="Password">
              <Form.Control  size="sm" type="password" placeholder="Password" />
            </FloatingLabel>
          </Form.Group>
          <div className="d-flex">
          <Button variant="primary" type="submit" className="botonlog sombra">
            Iniciar Sesión
          </Button>
          </div>
        </Form>         
      </Stack>
    </Container>
    
    </>
  );
};

export default Login;