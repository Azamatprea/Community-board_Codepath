import React from 'react';
import { ShieldCheck, Activity, Zap, Users, Gauge, Award, Sparkles } from 'lucide-react';
import { COLOR_OPTIONS } from '../constants/attributes';

export const CrewStatsSection = ({ crewmates = [] }) => {
  const total = crewmates.length;

  if (total === 0) {
    return (
      <div className="glass-panel p-6 mb-8 text-center border-dashed border-cyan-500/20">
        <Users className="w-8 h-8 text-slate-500 mx-auto mb-2" />
        <h3 className="text-base font-semibold font-heading text-slate-300">Crew Analytics Offline</h3>
        <p className="text-xs text-slate-400 mt-1">Assemble your first crewmate to unlock fleet mission analytics and success metrics.</p>
      </div>
    );
  }

  // 1. Calculate Average Speed
  const avgSpeed = (crewmates.reduce((acc, c) => acc + (Number(c.speed) || 0), 0) / total).toFixed(1);

  // 2. Count Categories
  const categoryCounts = crewmates.reduce((acc, c) => {
    const cat = c.category || 'Engineering & Tech';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  // 3. Count Colors
  const colorCounts = crewmates.reduce((acc, c) => {
    const col = c.color || 'Red';
    acc[col] = (acc[col] || 0) + 1;
    return acc;
  }, {});

  // Find most popular color
  const topColorName = Object.keys(colorCounts).reduce((a, b) => colorCounts[a] > colorCounts[b] ? a : b, Object.keys(colorCounts)[0]);
  const topColorObj = COLOR_OPTIONS.find(c => c.name.toLowerCase() === (topColorName || '').toLowerCase()) || COLOR_OPTIONS[0];
  const topColorPct = Math.round((colorCounts[topColorName] / total) * 100);

  // 4. Mission Readiness Success Metric Calculation
  const uniqueCategories = Object.keys(categoryCounts).length;
  let score = 20; // Base score
  score += Math.min(total * 15, 45); // Up to 45 points for crew size (up to 3 crew members)
  score += uniqueCategories * 10; // Up to 40 points for category diversity
  if (parseFloat(avgSpeed) >= 4) score += 15;
  const successRate = Math.min(score, 100);

  // Success Metric Verdict
  let statusBadge = { title: 'DEFENSES LOW', color: 'from-amber-500 to-red-600', text: 'Needs more specialized roles & crew members.' };
  if (successRate >= 85) {
    statusBadge = { title: 'LEGENDARY FLEET READY', color: 'from-emerald-400 to-cyan-500', text: 'Optimal crew synergy. Ready for deep galaxy exploration!' };
  } else if (successRate >= 60) {
    statusBadge = { title: 'MISSION READY', color: 'from-cyan-500 to-blue-600', text: 'Balanced fleet with high survival probability.' };
  } else if (successRate >= 40) {
    statusBadge = { title: 'STABLE DEPLOYMENT', color: 'from-blue-500 to-purple-600', text: 'Adequate for standard orbital patrol.' };
  }

  return (
    <div className="glass-panel p-6 mb-8 border-cyan-500/30 relative overflow-hidden">
      
      {/* Background glow header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-heading text-white">Fleet Mission Analytics</h2>
            <p className="text-xs text-slate-400">Real-time telemetry & synergy report</p>
          </div>
        </div>

        {/* Stretch Feature 3: Success Metric Banner */}
        <div className="flex items-center gap-3 bg-[#070b14] px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-right">
            <span className="text-[10px] uppercase text-slate-400 block tracking-wider font-semibold">Predicted Success</span>
            <span className="text-lg font-extrabold font-heading text-cyan-400">{successRate}%</span>
          </div>
          <div className={`px-3 py-1 rounded-lg text-xs font-extrabold font-heading text-white bg-gradient-to-r ${statusBadge.color} shadow-lg shadow-cyan-500/10`}>
            {statusBadge.title}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        
        {/* Stat 1: Total Crew */}
        <div className="bg-[#080d1a]/80 p-4 rounded-xl border border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-semibold uppercase">Total Crewmates</p>
            <p className="text-xl font-bold font-heading text-white">{total} Active</p>
          </div>
        </div>

        {/* Stat 2: Avg Speed */}
        <div className="bg-[#080d1a]/80 p-4 rounded-xl border border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-semibold uppercase">Average Velocity</p>
            <p className="text-xl font-bold font-heading text-white">{avgSpeed} <span className="text-xs text-cyan-400 font-normal">mph</span></p>
          </div>
        </div>

        {/* Stat 3: Primary Color Distribution */}
        <div className="bg-[#080d1a]/80 p-4 rounded-xl border border-slate-800/80 flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-md"
            style={{ backgroundColor: topColorObj.hex }}
          >
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-semibold uppercase">Dominant Uniform</p>
            <p className="text-sm font-bold font-heading text-white truncate">
              {topColorName} ({topColorPct}%)
            </p>
          </div>
        </div>

        {/* Stat 4: Role Diversity */}
        <div className="bg-[#080d1a]/80 p-4 rounded-xl border border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-semibold uppercase">Category Synergy</p>
            <p className="text-sm font-bold font-heading text-white">
              {uniqueCategories} of 4 Sectors
            </p>
          </div>
        </div>

      </div>

      {/* Category breakdown bar */}
      <div className="mt-5 pt-4 border-t border-slate-800/60">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-slate-400 font-semibold">Division Allocation Breakdown</span>
          <span className="text-cyan-400 font-mono">{statusBadge.text}</span>
        </div>
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
          {Object.entries(categoryCounts).map(([cat, count], idx) => {
            const pct = (count / total) * 100;
            const colors = ['bg-cyan-500', 'bg-purple-500', 'bg-emerald-500', 'bg-amber-500'];
            return (
              <div 
                key={cat}
                style={{ width: `${pct}%` }}
                className={`h-full ${colors[idx % colors.length]}`}
                title={`${cat}: ${count} (${Math.round(pct)}%)`}
              />
            );
          })}
        </div>
      </div>

    </div>
  );
};
