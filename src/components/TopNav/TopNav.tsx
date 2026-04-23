import { NavLink } from 'react-router-dom';
import { stages } from '../../config/stages';
import './TopNav.css';

export default function TopNav() {
  return (
    <nav className="top-nav">
      <div className="top-nav__brand">ELDA</div>
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
    </nav>
  );
}
