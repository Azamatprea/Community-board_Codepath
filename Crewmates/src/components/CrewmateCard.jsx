import React from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Info, Gauge, Shield, Zap, Clock } from 'lucide-react';
import { CrewmateAvatar } from './CrewmateAvatar';
import { CATEGORIES, COLOR_OPTIONS } from '../constants/attributes';

export const CrewmateCard = ({ crewmate }) => {
  const { id, name, speed, color, category, role, weapon, created_at } = crewmate;

  const categoryObj = CATEGORIES[category] || CATEGORIES['Engineering & Tech'];
  const colorObj = COLOR_OPTIONS.find(c => c.name.toLowerCase() === (color || '').toLowerCase()) || COLOR_OPTIONS[0];

  const formattedDate = created_at 
    ? new Date(created_at).toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Recent';

  return (
    <div className="glass-panel glass-panel-hover p-5 flex flex-col justify-between relative group overflow-hidden border-cyan-500/20">
      
      {/* Background Color Accent Glow */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-40"
        style={{ backgroundColor: colorObj.hex }}
      />

      <div>
        {/* Top Header: Category & Creation Date */}
        <div className="flex items-center justify-between gap-2 mb-4 text-xs">
          <span 
            className={`px-3 py-1 rounded-full font-semibold font-mono tracking-wider text-white bg-gradient-to-r ${categoryObj.badgeColor} shadow-sm`}
          >
            {category || 'General'}
          </span>
          <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
            <Clock className="w-3 h-3 text-slate-500" />
            {formattedDate}
          </span>
        </div>

        {/* Avatar & Name Section */}
        <div className="flex items-center gap-4 mb-5">
          <Link to={`/crewmate/${id}`} className="group-hover:scale-105 transition-transform cursor-pointer">
            <CrewmateAvatar colorName={color} size={85} />
          </Link>
          <div className="flex-1 min-w-0">
            <Link 
              to={`/crewmate/${id}`}
              className="text-lg font-bold font-heading text-white hover:text-cyan-400 transition-colors truncate block text-decoration-none"
            >
              {name}
            </Link>
            <p className="text-xs text-slate-300 font-medium flex items-center gap-1.5 mt-0.5">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: colorObj.hex }} />
              <span>{role || 'Crew Member'}</span>
            </p>
            <p className="text-xs text-slate-400 mt-1 truncate">
              {colorObj.description} Suit
            </p>
          </div>
        </div>

        {/* Attribute Pills Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-5 bg-[#0a0e1a]/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 text-slate-300">
            <Gauge className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Speed</span>
              <span className="font-semibold text-white">{speed} mph</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Zap className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 uppercase block">Equipped</span>
              <span className="font-semibold text-white truncate block">{weapon || 'Scanner'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
        <Link
          to={`/crewmate/${id}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 transition-colors border border-slate-700/60"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Details</span>
        </Link>

        <Link
          to={`/edit/${id}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit</span>
        </Link>
      </div>

    </div>
  );
};
