import './header.css';
import UniversalLogo from '../../assets/images/universal-music-logo-2.png';

const Header = () => {

    return(
        <header className="header">            
            <div className="logo">
                <img src={UniversalLogo} alt="Universal Music Logo"/>
            </div>
        </header>
    )
}

export default Header;