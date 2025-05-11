import React, { useState } from 'react';
import { Database, UserPlus, Check } from 'lucide-react';
import manhourData from '../data/manhourData';
import DataTable from '../components/DataTable';
import InfoCard from '../components/InfoCard';

const AfcManhourSheet: React.FC = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [selectedTask, setSelectedTask] = useState(manhourData[0].jobTask);
  const [loggedHours, setLoggedHours] = useState(false);

  const manhourColumns = [
    { key: 'jobNumber', label: 'Job Number' },
    { key: 'jobTask', label: 'Job Task' },
    { key: 'laborQty', label: 'Labor Qty' },
    { key: 'exactManhour', label: 'Exact Manhour (min)' }
  ];

  const formattedManhourData = manhourData.map(item => ({
    jobNumber: item.jobNumber,
    jobTask: item.jobTask,
    laborQty: item.laborQty,
    exactManhour: item.exactManhour
  }));

  const handleLogHours = () => {
    if (employeeName.trim()) {
      setLoggedHours(true);
      setTimeout(() => {
        setLoggedHours(false);
        setEmployeeName('');
      }, 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <InfoCard 
        title="AFC Manhour Sheet" 
        icon={<Database className="h-5 w-5" />}
      >
        <div className="text-gray-700 mb-4">
          <p>Track manhours spent on AFC tasks based on predefined maintenance tasks.</p>
        </div>

        <div className="mb-8">
          <DataTable 
            columns={manhourColumns}
            data={formattedManhourData}
          />
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <UserPlus className="h-5 w-5 text-blue-600 mr-2" />
            Log New Manhour Entry
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee Name
              </label>
              <input 
                type="text" 
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter employee name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Job Task
              </label>
              <select 
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {manhourData.map((task) => (
                  <option key={task.jobNumber} value={task.jobTask}>
                    {task.jobTask}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleLogHours}
              disabled={!employeeName.trim()}
              className={`
                flex justify-center items-center px-4 py-2 rounded-md
                ${employeeName.trim() 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                transition-colors
              `}
            >
              {loggedHours ? <Check className="h-5 w-5 mr-2" /> : <UserPlus className="h-5 w-5 mr-2" />}
              {loggedHours ? 'Hours Logged Successfully!' : 'Log Hours'}
            </button>
          </div>

          {loggedHours && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
              Successfully logged hours for <span className="font-semibold">{employeeName}</span> on <span className="font-semibold">{selectedTask}</span>.
            </div>
          )}
        </div>
      </InfoCard>
    </div>
  );
};

export default AfcManhourSheet;