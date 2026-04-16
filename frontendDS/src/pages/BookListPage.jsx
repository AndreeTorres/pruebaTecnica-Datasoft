import { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { getBooks, getGenres } from '../api/booksApi.js';
import BookCard from '../components/BookCard.jsx';

function BookListPage() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadGenres() {
      try {
        const genreData = await getGenres();
        setGenres(genreData);
      } catch {
        setError('No se pudieron cargar los generos');
      }
    }

    loadGenres();
  }, []);

  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      setError('');

      try {
        const bookData = await getBooks(selectedGenre);
        setBooks(bookData);
      } catch {
        setError('No se pudieron cargar los libros');
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, [selectedGenre]);

  return (
    <Container className="page-container">
      <section className="section-heading">
        <div>
          <span className="eyebrow">Catalogo</span>
          <h1>Libros disponibles</h1>
          <p>Filtra por genero y abre el detalle de cada libro con una sesion activa.</p>
        </div>
        <Form.Select
          className="genre-select"
          value={selectedGenre}
          onChange={(event) => setSelectedGenre(event.target.value)}
          aria-label="Filtrar por genero"
        >
          <option value="">Todos los generos</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </Form.Select>
      </section>

      <div className="filter-buttons">
        <Button
          className={!selectedGenre ? 'filter-action active' : 'filter-action'}
          onClick={() => setSelectedGenre('')}
        >
          Todos
        </Button>
        {genres.map((genre) => (
          <Button
            key={genre.id}
            className={String(selectedGenre) === String(genre.id) ? 'filter-action active' : 'filter-action'}
            onClick={() => setSelectedGenre(String(genre.id))}
          >
            {genre.name}
          </Button>
        ))}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="loading-state">
          <Spinner animation="border" role="status" />
          <span>Cargando libros...</span>
        </div>
      ) : (
        <Row className="g-4">
          {books.map((book) => (
            <Col key={book.id} sm={6} lg={4}>
              <BookCard book={book} />
            </Col>
          ))}
          {!books.length && (
            <Col>
              <Alert variant="info">No hay libros para el filtro seleccionado.</Alert>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
}

export default BookListPage;
