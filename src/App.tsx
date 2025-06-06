import React, { useState } from 'react';
import { Menu, Home, Radio, PenTool as Tool, Clock, Phone, Database, FileText, ChevronRight, DoorOpen } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import Profile from './pages/Profile';
import AfcTimeCalculation from './pages/AfcTimeCalculation';
import TaskBriefing from './pages/TaskBriefing';
import TetraCommunication from './pages/TetraCommunication';
import TroubleshootAfc from './pages/TroubleshootAfc';
import AfcManhourSheet from './pages/AfcManhourSheet';
import StationCodes from './pages/StationCodes';
import AfcEquipments from './pages/AfcEquipments';
import MtiMaintenance from './pages/MtiMaintenance';
import StationEntries from './pages/StationEntries';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogin = (isAdmin: boolean) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-right" />
        <Login onLogin={handleLogin} />
      </>
    );
  }

  const renderPage = () => {
    if (isAdmin && currentPage === 'Admin Panel') {
      return <AdminPanel />;
    }

    switch (currentPage) {
      case 'Profile':
        return <Profile />;
      case 'AFC Time Calculation':
        return <AfcTimeCalculation />;
      case 'Task Briefing':
        return <TaskBriefing />;
      case 'How to Use Tetra Communication/Radio':
        return <TetraCommunication />;
      case 'Troubleshoot AFC Equipments':
        return <TroubleshootAfc />;
      case 'AFC Manhour Sheet':
        return <AfcManhourSheet />;
      case 'Station Codes and Phone Numbers':
        return <StationCodes />;
      case 'AFC Equipments Sheet':
        return <AfcEquipments />;
      case 'MTI for Maintenance':
        return <MtiMaintenance />;
      case 'Station Entries and Exits':
        return <StationEntries />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
              <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">Welcome to Pic Companion</h1>
              <p className="text-gray-700 mb-6">
                Your comprehensive tool for AFC operations and maintenance management.
                Select an option from the sidebar to get started.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <HomeFeatureCard 
                  icon={<Clock className="h-6 w-6 text-blue-600" />}
                  title="Time Calculation"
                  description="Calculate maintenance timing based on equipment and personnel"
                  onClick={() => setCurrentPage('AFC Time Calculation')}
                />
                <HomeFeatureCard 
                  icon={<Tool className="h-6 w-6 text-blue-600" />}
                  title="Troubleshooting"
                  description="Step-by-step guides for resolving AFC equipment issues"
                  onClick={() => setCurrentPage('Troubleshoot AFC Equipments')}
                />
                <HomeFeatureCard 
                  icon={<Phone className="h-6 w-6 text-blue-600" />}
                  title="Station Directory"
                  description="Complete contact information for all stations and personnel"
                  onClick={() => setCurrentPage('Station Codes and Phone Numbers')}
                />
                <HomeFeatureCard 
                  icon={<FileText className="h-6 w-6 text-blue-600" />}
                  title="Maintenance Tasks"
                  description="Access detailed maintenance task instructions and tracking"
                  onClick={() => setCurrentPage('MTI for Maintenance')}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex min-h-screen bg-slate-100">
        <div className="lg:hidden fixed top-0 left-0 p-4 z-30">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <Sidebar 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          isAdmin={isAdmin}
        />

        <div className="flex-1 flex flex-col min-h-screen w-full">
          <header className="bg-white shadow-sm p-4 sticky top-0 z-20">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800 ml-16 lg:ml-0">
                {currentPage === 'Home' ? 'Pic Companion Dashboard' : currentPage}
              </h1>
            </div>
          </header>
          <main className="flex-1 p-4 overflow-x-hidden">
            {renderPage()}
          </main>
          <footer className="text-center text-gray-500 text-sm p-4 border-t bg-white mt-auto">
            <p>Pic Companion Webapp | Developed for AFC Operations | © 2025</p>
            <p className="mt-1">Made with ❤️ by Syed Fayaz ali - AFC Technician</p>
          </footer>
        </div>
      </div>
    </>
  );
}

const HomeFeatureCard = ({ icon, title, description, onClick }) => {
  return (
    <div 
      className="bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-blue-100"
      onClick={onClick}
    >
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-lg font-semibold text-blue-800 ml-2">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
      <div className="flex justify-end mt-2">
        <ChevronRight className="h-5 w-5 text-blue-600" />
      </div>
    </div>
  );
};

export default App;