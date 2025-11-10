import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageToggle = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {currentLang?.flag} {currentLang?.name}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-[140px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                currentLanguage === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              } ${lang === languages[0] ? 'rounded-t-lg' : ''} ${lang === languages[languages.length - 1] ? 'rounded-b-lg' : ''}`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;