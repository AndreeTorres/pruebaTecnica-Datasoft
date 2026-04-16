import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function AppNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="app-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/books">Datasoft Books</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navigation" />
        <Navbar.Collapse id="main-navigation">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link as={NavLink} to="/books">Libros</Nav.Link>
            {token ? (
              <button className="nav-action" type="button" onClick={handleLogout}>
                Cerrar sesion
              </button>
            ) : (
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
