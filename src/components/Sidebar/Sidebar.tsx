import { useState } from 'react';
import type { Section } from '../../config/stages';
import './Sidebar.css';

interface SidebarProps {
  sections: Section[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function Sidebar({ sections, activeIndex, onSelect }: SidebarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSelect = (index: number) => {
    onSelect(index);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="sidebar__hamburger"
        onClick={() => setDrawerOpen((prev) => !prev)}
        aria-label="Toggle section menu"
      >
        <span className={`sidebar__hamburger-icon ${drawerOpen ? 'sidebar__hamburger-icon--open' : ''}`} />
      </button>

      {/* Overlay for mobile drawer */}
      {drawerOpen && (
        <div className="sidebar__overlay" onClick={() => setDrawerOpen(false)} />
      )}

      {/* Sidebar itself */}
      <aside className={`sidebar ${drawerOpen ? 'sidebar--open' : ''}`}>
        <ul className="sidebar__list">
          {sections.map((section, i) => (
            <li key={section.id}>
              <button
                className={`sidebar__item ${i === activeIndex ? 'sidebar__item--active' : ''}`}
                onClick={() => handleSelect(i)}
              >
                <span className="sidebar__dot" />
                {section.title.split(' — ')[1] || section.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
