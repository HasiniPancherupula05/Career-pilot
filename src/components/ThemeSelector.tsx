import React, { useState, useRef, useEffect } from 'react';
import { useTheme, THEME_PRESETS, ThemeName } from '../context/ThemeContext';
import { Palette, Sun, Moon, Leaf, Sparkles, Flame, Check, ChevronDown } from 'lucide-react';

export const ThemeSelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { theme, setTheme, currentPreset } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (iconName: string, className = 'w-4 h-4') => {
    switch (iconName) {
      case 'Sun':
        return <Sun className={className} />;
      case 'Moon':
        return <Moon className={className} />;
      case 'Leaf':
        return <Leaf className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      default:
        return <Palette className={className} />;
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 rounded-xl border theme-secondary-btn flex items-center gap-2 text-xs font-semibold cursor-pointer shadow-sm"
        title="Change Whole Theme"
      >
        <span
          className="w-2.5 h-2.5 rounded-full inline-block shadow-sm"
          style={{ backgroundColor: currentPreset.previewColor }}
        />
        <div className="flex items-center gap-1.5">
          {getIcon(currentPreset.icon, 'w-3.5 h-3.5 text-[var(--primary)]')}
          {!compact && <span className="hidden lg:inline">{currentPreset.name}</span>}
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl theme-card shadow-2xl z-50 p-2 animate-fade-in border border-[var(--border-main)]">
          <div className="px-3 py-2 border-b border-[var(--border-main)] mb-1 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[var(--primary)]" />
              Select Theme Preset
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md theme-badge font-mono">5 Themes</span>
          </div>

          <div className="space-y-1">
            {THEME_PRESETS.map((preset) => {
              const isSelected = theme === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setTheme(preset.id as ThemeName);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--primary-light)] text-[var(--text-heading)] font-bold border border-[var(--primary)]/30'
                      : 'hover:bg-[var(--bg-card-hover)] text-[var(--text-main)] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: preset.previewColor }}
                    >
                      {getIcon(preset.icon, 'w-4 h-4 text-white')}
                    </div>
                    <div>
                      <div className="font-semibold flex items-center gap-1.5">
                        {preset.name}
                        {isSelected && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[var(--primary)] text-white font-normal">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] line-clamp-1">
                        {preset.description}
                      </p>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[var(--primary)] shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
