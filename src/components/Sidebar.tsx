import React from 'react';
import { Home, Clock, FileText, Radio, PenTool as Tool, Database, Phone, X, Users, UserCircle, DoorOpen } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentPage, 
  setCurrentPage, 
  isOpen, 
  toggleSidebar,
  isAdmin
}) => {
  const menuItems = [
    { name: 'Profile', icon: <UserCircle className="h-5 w-5" /> },
    { name: 'Home', icon: <Home className="h-5 w-5" /> },
    ...(isAdmin ? [{ name: 'Admin Panel', icon: <Users className="h-5 w-5" /> }] : []),
    { name: 'AFC Time Calculation', icon: <Clock className="h-5 w-5" /> },
    { name: 'Task Briefing', icon: <FileText className="h-5 w-5" /> },
    { name: 'How to Use Tetra Communication/Radio', icon: <Radio className="h-5 w-5" /> },
    { name: 'Troubleshoot AFC Equipments', icon: <Tool className="h-5 w-5" /> },
    { name: 'AFC Manhour Sheet', icon: <Database className="h-5 w-5" /> },
    { name: 'Station Codes and Phone Numbers', icon: <Phone className="h-5 w-5" /> },
    { name: 'AFC Equipments Sheet', icon: <Database className="h-5 w-5" /> },
    { name: 'MTI for Maintenance', icon: <FileText className="h-5 w-5" /> },
    { name: 'Station Entries and Exits', icon: <DoorOpen className="h-5 w-5" /> }
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside 
        className={`
          fixed lg:sticky top-0 left-0 h-screen z-30 lg:z-10
          w-64 bg-blue-700 text-white transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto
        `}
      >
        <div className="flex justify-between items-center p-4 border-b border-blue-600 sticky top-0 bg-blue-700 z-10">
          <h2 className="text-xl font-bold">Pic Companion</h2>
          <button 
            className="lg:hidden p-1 rounded-full hover:bg-blue-600"
            onClick={toggleSidebar}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => {
                    setCurrentPage(item.name);
                    if (window.innerWidth < 1024) toggleSidebar();
                  }}
                  className={`
                    flex items-center w-full p-3 rounded-lg text-left
                    ${currentPage === item.name 
                      ? 'bg-blue-800 text-white' 
                      : 'text-blue-100 hover:bg-blue-600'
                    }
                    transition-colors duration-200
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;