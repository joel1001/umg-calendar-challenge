import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UMGCalendar from '../ui/organisms/umg-calendar/umg-calendar';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UMGCalendar />} />
                <Route path="/home" element={<UMGCalendar />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
