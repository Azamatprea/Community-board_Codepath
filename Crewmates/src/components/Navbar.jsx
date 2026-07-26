import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Users, PlusCircle, Database, ShieldAlert, Sparkles } from 'lucide-react';
import { isSupabaseConfigured } from '../client';

export const Navbar = ({ onOpenDbModal }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#090d16]/85 border-b border-cyan-500/20 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
              <Rocket className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold font-heading text-white tracking-wide flex items-center gap-2">
              GALACTIC <span className="text-cyan-400 font-extrabold">CREWMATES</span>
            </h1>
            <p className="text-xs text-slate-400 tracking-wider">SUPERHUMAN SPACE FLEET</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              isActive('/') 
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Crew Gallery</span>
          </Link>

          <Link
            to="/create"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              isActive('/create')
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Crewmate</span>
          </Link>

          {/* Database Connection Badge */}
          <button
            onClick={onOpenDbModal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
              isSupabaseConfigured
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20 animate-pulse'
            }`}
            title="Click to check Database Configuration & SQL setup"
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isSupabaseConfigured ? 'Supabase Connected' : 'Local Storage Mode'}
            </span>
            {!isSupabaseConfigured && (
              <span className="bg-amber-400 text-black font-bold px-1.5 py-0.5 rounded text-[10px]">
                Setup DB
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
