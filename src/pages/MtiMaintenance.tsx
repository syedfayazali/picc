import React, { useState } from 'react';
import { Wrench, ClipboardList, AlertTriangle } from 'lucide-react';
import manhourData from '../data/manhourData';
import InfoCard from '../components/InfoCard';

const MtiMaintenance: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState(manhourData[0].jobTask);

  const selectedTaskData = manhourData.find(task => task.jobTask === selectedTask);

  // General maintenance steps that would be customized per equipment in a real system
  const maintenanceSteps = [
    "Perform visual inspection for physical damage and wear.",
    "Run diagnostic tests using the equipment software.",
    "Clean all sensors, readers, and moving parts.",
    "Inspect and test mechanical components for proper operation.",
    "Check and update firmware/software if applicable.",
    "Verify proper communication with central systems.",
    "Test all user-facing functions to ensure proper operation.",
    "Document maintenance performed and any issues found."
  ];

  // Safety guidelines
  const safetyGuidelines = [
    "Always wear appropriate PPE (Personal Protective Equipment).",
    "Ensure power is disconnected before opening equipment cabinets.",
    "Use proper tools and equipment for the maintenance task.",
    "Follow all lockout/tagout procedures when working on powered equipment.",
    "Report any safety hazards immediately to supervisors."
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <InfoCard 
        title="MTI for Maintenance" 
        icon={<Wrench className="h-5 w-5" />}
      >
        <div className="text-gray-700 mb-4">
          <p>Maintenance Task Instructions (MTI) for AFC systems.</p>
          <p className="text-sm text-gray-500 mt-1">Select a maintenance task to view detailed instructions.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Maintenance Task
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

        {selectedTaskData && (
          <div className="mt-6 bg-gray-50 rounded-lg p-5">
            <h3 className="text-xl font-medium text-blue-800 mb-2">
              {selectedTaskData.jobTask}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Job Number</p>
                <p className="text-lg font-semibold text-blue-800">{selectedTaskData.jobNumber}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Labor Quantity</p>
                <p className="text-lg font-semibold text-blue-800">{selectedTaskData.laborQty}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Exact Manhour</p>
                <p className="text-lg font-semibold text-blue-800">{selectedTaskData.exactManhour} minutes</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <ClipboardList className="h-5 w-5 text-blue-600 mr-2" />
                Maintenance Procedure
              </h4>
              
              <div className="space-y-3">
                {maintenanceSteps.map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-sm mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
              <h4 className="font-medium text-amber-800 flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                Safety Guidelines
              </h4>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {safetyGuidelines.map((guideline, index) => (
                  <li key={index} className="text-amber-700 text-sm">{guideline}</li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800">Quality Verification</h4>
              <p className="text-sm text-blue-700 mt-1">
                Upon completion of maintenance, verify that all functions are working properly by testing 
                each operation. Document all work performed, parts replaced, and any issues encountered.
                Sign off on the maintenance log and update the maintenance history in the system.
              </p>
            </div>
          </div>
        )}
      </InfoCard>
    </div>
  );
};

export default MtiMaintenance;