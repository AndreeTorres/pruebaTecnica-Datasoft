import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getBookById } from '../api/booksApi.js';
import { getBookImage } from '../assets/bookImages.js';

function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadBook() {
      setLoading(true);
      setError('');

      try {
        const data = await getBookById(id);
        setBook(data);
      } catch {
        setError('No se pudo cargar el detalle del libro');
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [id]);

  if (loading) {
    return (
      <Container className="page-container">
        <div className="loading-state">
          <Spinner animation="border" role="status" />
          <span>Cargando detalle...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="page-container">
        <Alert variant="danger">{error}</Alert>
        <Button as={Link} to="/books" className="secondary-action">
          Regresar a libros
        </Button>
      </Container>
    );
  }

  return (
    <Container className="page-container">
      <Row className="detail-layout g-4">
        <Col lg={5}>
          <div
            className="detail-image"
            style={{ backgroundImage: `linear-gradient(180deg, rgba(19, 42, 53, 0.12), rgba(19, 42, 53, 0.5)), url(${getBookImage(book.id)})` }}
            aria-label={book.title}
          />
        </Col>
        <Col lg={7}>
          <section className="detail-content">
            <Badge className="genre-badge mb-3">{book.genre?.name || 'Sin genero'}</Badge>
            <h1>{book.title}</h1>
            <p className="detail-author">Autor: {book.author}</p>
            <p className="detail-description">{book.description || 'Sin descripcion disponible.'}</p>
            <div className="detail-meta">
              <span>ISBN: {book.isbn || 'No registrado'}</span>
              <span>Anio: {book.publishedYear || 'No registrado'}</span>
              <span>Precio: {book.price ? `$${Number(book.price).toFixed(2)}` : 'No registrado'}</span>
            </div>
            <Button as={Link} to="/books" className="secondary-action">
              Regresar a libros
            </Button>
          </section>
        </Col>
      </Row>
    </Container>
  );
}

export default BookDetailPage;
