import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import { Sun, Moon, Globe } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇸🇻" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" }
  ];

  const currentLangDisplay = languages.find(l => l.code === language)?.code.toUpperCase() || "EN";

  useEffect(() => {
    const handleClickOutside = () => setShowLanguageMenu(false);
    if (showLanguageMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showLanguageMenu]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-lavishly text-2xl text-primary-blue">Chicuinaco</h1>
          </div>
          
          {/* Navigation - Hidden on mobile, visible on larger screens */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('story')}
              className="text-neutral-600 dark:text-neutral-300 hover:text-primary-blue dark:hover:text-primary-blue transition-colors"
            >
              {t('story.title')}
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="text-neutral-600 dark:text-neutral-300 hover:text-primary-blue dark:hover:text-primary-blue transition-colors"
            >
              {t('menu.title')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-neutral-600 dark:text-neutral-300 hover:text-primary-blue dark:hover:text-primary-blue transition-colors"
            >
              {t('contact.title')}
            </button>
          </nav>
          
          {/* Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Toggle */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLanguageMenu(!showLanguageMenu);
                }}
                className="flex items-center space-x-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border-neutral-200 dark:border-neutral-700"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{currentLangDisplay}</span>
              </Button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center space-x-2 ${
                        language === lang.code ? 'bg-neutral-100 dark:bg-neutral-700' : ''
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Dark Mode Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border-neutral-200 dark:border-neutral-700"
            >
              {theme === 'light' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
