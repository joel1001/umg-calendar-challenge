import './footer.css';

const Footer = () => {

    return(
        <footer className="footer">
            <div className="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
            <p>&copy; 2024 Universal Music. All rights reserved.</p>
        </footer>
    )
}

export default Footer;