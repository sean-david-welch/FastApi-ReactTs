import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Router>
                    <AppRoutes />
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
