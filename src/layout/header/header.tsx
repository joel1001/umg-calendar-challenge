import './header.css';
import UniversalLogo from '../../assets/images/universal-music-logo.png';

const Header = () => {

    return(
        <header className="header">
            <div className="logo">
                <img src={UniversalLogo} alt="Universal Music Logo"/>
            </div>
            <nav className="nav">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Artists</a></li>
                    <li><a href="#">Albums</a></li>
                    <li><a href="#">Events</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;