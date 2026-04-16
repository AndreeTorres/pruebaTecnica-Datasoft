import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import BookDetailPage from './pages/BookDetailPage.jsx';
import BookListPage from './pages/BookListPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

function App() {
  return (
    <Router>
      <AppNavbar />
      <main className="app-shell">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/books" element={<BookListPage />} />
          <Route
            path="/books/:id"
            element={(
              <ProtectedRoute>
                <BookDetailPage />
              </ProtectedRoute>
            )}
          />
          <Route path="*" element={<Navigate to="/books" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
