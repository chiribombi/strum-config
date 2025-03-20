
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showSearch?: boolean;
  onSearchClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false, 
  showSearch = false,
  onSearchClick
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const goBack = () => {
    if (location.pathname === '/') {
      return;
    }
    navigate(-1);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border safe-top">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="w-10">
          {showBackButton && (
            <button 
              onClick={goBack}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary active:bg-secondary/80 transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <h1 className="text-lg font-medium flex-1 text-center">{title}</h1>
        
        <div className="w-10">
          {showSearch && (
            <button 
              onClick={onSearchClick}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary active:bg-secondary/80 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
