import React, { useState } from 'react';
import { FileText, Check, Save } from 'lucide-react';
import InfoCard from '../components/InfoCard';

const TaskBriefing: React.FC = () => {
  const [taskDetails, setTaskDetails] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (taskDetails.trim()) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <InfoCard 
        title="Task Briefing"
        icon={<FileText className="h-5 w-5" />}
      >
        <div className="text-gray-700 mb-4">
          <p>This section provides a briefing for tasks related to AFC operations.</p>
          <p className="text-sm text-gray-500 mt-1">Enter task details, instructions, and important information for team briefings.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Details
            </label>
            <textarea
              value={taskDetails}
              onChange={(e) => setTaskDetails(e.target.value)}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Enter task details, instructions, and important information to brief the team..."
            />
          </div>

          <button
            onClick={handleSave}
            className="flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {saved ? <Check className="h-5 w-5 mr-2" /> : <Save className="h-5 w-5 mr-2" />}
            {saved ? 'Task Briefing Saved!' : 'Save Briefing'}
          </button>

          {saved && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
              Task briefing saved successfully! You can now share it with your team.
            </div>
          )}
        </div>
      </InfoCard>
    </div>
  );
};

export default TaskBriefing;