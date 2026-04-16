import { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi.js';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: 'admin',
    password: 'admin123',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      navigate('/books');
    } catch {
      setError('Usuario o contrasena invalidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="page-container">
      <Row className="align-items-center g-4">
        <Col lg={6}>
          <section className="login-copy">
            <span className="eyebrow">Biblioteca Datasoft</span>
            <h1>Accede al catalogo de libros</h1>
            <p>Ingresa con tu usuario para consultar detalles y administrar la informacion de cada libro.</p>
          </section>
        </Col>
        <Col lg={5} className="ms-lg-auto">
          <section className="login-panel">
            <h2>Iniciar sesion</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="admin"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="password">
                <Form.Label>Contrasena</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="admin123"
                  required
                />
              </Form.Group>
              <Button className="primary-action w-100" type="submit" disabled={loading}>
                {loading ? 'Ingresando...' : 'Iniciar sesion'}
              </Button>
            </Form>
          </section>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
