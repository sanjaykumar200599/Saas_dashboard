import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  BarChart3, 
  FileBarChart, 
  Settings, 
  X,
  Shield
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Contracts', href: '/dashboard', icon: FileText },
    { name: 'Insights', href: '/insights', icon: BarChart3 },
    { name: 'Reports', href: '/reports', icon: FileBarChart },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (href) => {
    return location.pathname === href;
  };

  const handleNavigation = (href) => {
    if (href === '/dashboard') {
      navigate(href);
    } else {
      // For demo purposes, just show an alert for non-implemented pages
      alert(`${href.slice(1).charAt(0).toUpperCase() + href.slice(2)} page is not implemented in this demo`);
    }
    onClose();
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex-grow flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`${
                      isActive(item.href)
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center w-full px-2 py-2 text-sm font-medium border-l-4 transition-colors`}
                  >
                    <Icon
                      className={`${
                        isActive(item.href) ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 h-5 w-5`}
                    />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;