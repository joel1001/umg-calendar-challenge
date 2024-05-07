import AppRouter from './router/router';

import './app.css';
import Header from "./layout/header/header";
import Footer from "./layout/footer/footer";

function App() {
  return (
    <div className="app">
      <Header />
        <AppRouter/>
      <Footer />
    </div>
  );
}

export default App;
