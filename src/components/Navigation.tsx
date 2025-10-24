import { Link, useLocation } from 'react-router-dom';
import { getEnvironmentConfig } from '../config/environment';

const Navigation = () => {
  const location = useLocation();
  const config = getEnvironmentConfig();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/users', label: 'Users' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/profile', label: 'Profile' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <nav className={`${config.theme.primary} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-white text-xl font-bold">
                {config.branding.logo} {config.branding.title}
              </h1>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? `${config.theme.primary === 'bg-blue-600' ? 'bg-blue-700' : 'bg-green-700'} text-white`
                      : `${config.theme.primary === 'bg-blue-600' ? 'text-blue-100 hover:bg-blue-500' : 'text-green-100 hover:bg-green-500'} hover:text-white`
                  }`}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
