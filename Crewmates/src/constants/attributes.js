export const CATEGORIES = {
  'Tactical Operations': {
    name: 'Tactical Operations',
    description: 'Defense, perimeter security, and fireteam combat tactics.',
    badgeColor: 'from-rose-500 to-red-600',
    iconName: 'Shield',
    roles: ['Security Specialist', 'Heavy Vanguard', 'Scout Recon', 'Tactical Officer'],
    weapons: ['Plasma Blaster', 'Particle Cannon', 'Energy Shield', 'Combat Blade']
  },
  'Engineering & Tech': {
    name: 'Engineering & Tech',
    description: 'Ship propulsion, hull repair, life support systems, and hacking.',
    badgeColor: 'from-cyan-500 to-blue-600',
    iconName: 'Wrench',
    roles: ['Warp Drive Engineer', 'System Technician', 'Cyber Hacker', 'Energy Specialist'],
    weapons: ['Hydro-Spanner', 'Nanite Repair Ray', 'EMP Disruptor', 'Plasma Torch']
  },
  'Medical & Bio': {
    name: 'Medical & Bio',
    description: 'Biological research, crew health monitoring, and alien pathogen containment.',
    badgeColor: 'from-emerald-500 to-teal-600',
    iconName: 'HeartPulse',
    roles: ['Chief Medical Officer', 'Geneticist', 'Xenobiologist', 'Trauma Specialist'],
    weapons: ['Bio-Scanner', 'Stim Injector', 'Cryo Gun', 'Decontamination Beam']
  },
  'Command & Intel': {
    name: 'Command & Intel',
    description: 'Strategic planning, navigation through hyperspace, and fleet communications.',
    badgeColor: 'from-amber-500 to-purple-600',
    iconName: 'Crown',
    roles: ['Fleet Captain', 'Operations Commander', 'Navigation Expert', 'Intel Officer'],
    weapons: ['Tactical Command Pad', 'Drone Controller', 'Sub-space Comms', 'Target Painter']
  }
};

export const COLOR_OPTIONS = [
  { name: 'Red', hex: '#EF4444', border: '#DC2626', glow: 'rgba(239, 68, 68, 0.4)', description: 'Fiery Crimson' },
  { name: 'Blue', hex: '#3B82F6', border: '#2563EB', glow: 'rgba(59, 130, 246, 0.4)', description: 'Electric Cobalt' },
  { name: 'Green', hex: '#10B981', border: '#059669', glow: 'rgba(16, 185, 129, 0.4)', description: 'Bio Emerald' },
  { name: 'Yellow', hex: '#F59E0B', border: '#D97706', glow: 'rgba(245, 158, 11, 0.4)', description: 'Solar Flare' },
  { name: 'Purple', hex: '#8B5CF6', border: '#7C3AED', glow: 'rgba(139, 92, 246, 0.4)', description: 'Nebula Purple' },
  { name: 'Cyan', hex: '#06B6D4', border: '#0891B2', glow: 'rgba(6, 182, 212, 0.4)', description: 'Quantum Cyan' },
  { name: 'Orange', hex: '#F97316', border: '#EA580C', glow: 'rgba(249, 115, 22, 0.4)', description: 'Plasma Flame' },
  { name: 'Pink', hex: '#EC4899', border: '#DB2777', glow: 'rgba(236, 72, 153, 0.4)', description: 'Supernova Pink' },
  { name: 'Lime', hex: '#84CC16', border: '#65A30D', glow: 'rgba(132, 204, 22, 0.4)', description: 'Toxic Lime' },
  { name: 'Obsidian', hex: '#475569', border: '#334155', glow: 'rgba(71, 85, 105, 0.4)', description: 'Stealth Black' }
];

export const SPEED_OPTIONS = [
  { value: 1.0, label: '1.0 mph', tier: 'Tactical Crawler', desc: 'Precise, heavy armor step' },
  { value: 2.5, label: '2.5 mph', tier: 'Standard Patrol', desc: 'Balanced pace for exploration' },
  { value: 5.0, label: '5.0 mph', tier: 'Rapid Response', desc: 'Swift maneuverability' },
  { value: 7.5, label: '7.5 mph', tier: 'Hyperdrive Sprinter', desc: 'High mobility in hazard zones' },
  { value: 10.0, label: '10.0 mph', tier: 'Light-Speed Velocity', desc: 'Unmatched evasive speed' }
];
