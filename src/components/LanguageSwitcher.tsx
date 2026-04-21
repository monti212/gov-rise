import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../i18n';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = SUPPORTED_LANGUAGES.find(l => l.code === i18n.language) || SUPPORTED_LANGUAGES[0];

  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('govrise-language', code);
    document.documentElement.dir = SUPPORTED_LANGUAGES.find(l => l.code === code)?.dir || 'ltr';
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Globe size={15} className="text-blue-600" />
        <span className="hidden md:inline">{current.nativeLabel}</span>
        <ChevronDown size={13} className="text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
          {SUPPORTED_LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${
                i18n.language === lang.code ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-700'
              }`}
            >
              <span>{lang.nativeLabel}</span>
              <span className="text-xs text-gray-400">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
