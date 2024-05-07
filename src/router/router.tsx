// router/router.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import UMGCalendar from '../ui/organisms/umg-calendar/umg-calendar';

const AppRouter = () => {
    return (
        <Router> {/* Use BrowserRouter here */}
            <Routes>
                <Route path="/" element={<UMGCalendar />} />
                <Route path="/home" element={<UMGCalendar />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
