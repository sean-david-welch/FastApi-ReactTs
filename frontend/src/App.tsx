import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/payment-success" element={<Success />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/:productId" element={<ProductPage />} /> */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
