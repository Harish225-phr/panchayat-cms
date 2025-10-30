import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AppRoutes from './routes/App-router';
import Modal from '../src/components/modal/modal';
import { ToastProvider } from '../src/components/toster/Toast';
import { useLocation } from 'react-router-dom';
import Copyright from './components/copyright/Copyright';

function App() {



  return (
    <ToastProvider>
      <Modal />
      {/* Routes */}
      <AppRoutes />
      <Copyright/>
    </ToastProvider>
  );
}

export default App;
