import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Layout } from './components/layout';
import { Dashboard, RolesList } from './components/features';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard totalRoles={8} totalPermissions={24} totalUsers={45} activeAssignments={120} />} />
            <Route path="/roles" element={<RolesList roles={[]} loading={false} error={null} onAddRole={async () => {}} />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
