import { Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getBookImage } from '../assets/bookImages.js';

function BookCard({ book }) {
  return (
    <Card className="book-card h-100">
      <div
        className="book-image"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(19, 42, 53, 0.1), rgba(19, 42, 53, 0.55)), url(${getBookImage(book.id)})` }}
        aria-label={book.title}
      />
      <Card.Body className="d-flex flex-column">
        <div className="mb-3">
          <Badge className="genre-badge">{book.genre?.name || 'Sin genero'}</Badge>
        </div>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text className="book-author">{book.author}</Card.Text>
        <Button as={Link} to={`/books/${book.id}`} className="mt-auto primary-action">
          Ver detalle
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
