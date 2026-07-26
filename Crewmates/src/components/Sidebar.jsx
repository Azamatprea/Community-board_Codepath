import React from 'react';
import { NavLink } from 'react-router-dom';
import { CrewmateAvatar } from './CrewmateAvatar';

export const Sidebar = ({ onOpenDbModal }) => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink
          to="/"
          className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
          end
        >
          Home
        </NavLink>

        <NavLink
          to="/create"
          className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
        >
          Create a Crewmate!
        </NavLink>

        <NavLink
          to="/gallery"
          className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
        >
          Crewmate Gallery
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <CrewmateAvatar colorName="Yellow" size={48} />
      </div>
    </aside>
  );
};
