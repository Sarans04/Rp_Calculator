import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';
import { PIDsProvider } from './components/PIDsContext'; // Import the PIDs context
import UserPage2 from './components/UserPage2';
import AdminPage2 from './components/AdminPage2'
import ViewMark from './components/ViewMark';

const App = () => {
    return (
        <PIDsProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/user2" element={<UserPage2 />} /> 
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="admin2" element={<AdminPage2 />} />
                    <Route path="/admin/marks" element={<ViewMark />} />
                </Routes>
            </Router>
        </PIDsProvider>
    );
};

export default App;