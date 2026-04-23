import { NavLink, useNavigate } from 'react-router-dom';
import { stages } from '../../config/stages';
import './TopNav.css';

export default function TopNav() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/', { state: { resetScroll: Date.now() } });
  };

  return (
    <nav className="top-nav">
      <button
        className="top-nav__brand"
        onClick={handleLogoClick}
        aria-label="Go to main stage"
      >
        ELDA
      </button>
      <ul className="top-nav__list">
        {stages.map((stage) => (
          <li key={stage.id}>
            <NavLink
              to={stage.path}
              end={stage.path === '/'}
              className={({ isActive }) =>
                `top-nav__link ${isActive ? 'top-nav__link--active' : ''}`
              }
            >
              {stage.label}
            </NavLink>
          </li>
        ))}
      </ul>
      {/* Spacer to balance the logo on the left so nav stays centered */}
      <div className="top-nav__spacer" />
    </nav>
  );
}
