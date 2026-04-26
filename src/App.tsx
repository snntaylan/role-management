import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Layout } from './components/layout';
import { Dashboard } from './components/features';
import './App.css';
import './index.css';
import { UsersPage } from './pages/UsersPage';
import RolesPage from './pages/RolesPage';
import PermissionsPage from './pages/PermissionsPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/roles" element={<RolesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/permissions" element={<PermissionsPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
