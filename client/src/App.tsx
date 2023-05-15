import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CustomerProvider } from './context/CustomerContext';
import AppRoutes from './Routes';

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <CustomerProvider>
                    <Router>
                        <AppRoutes />
                    </Router>
                </CustomerProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
