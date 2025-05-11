import React, { useState } from 'react';
import { Calculator, Clock, Save, Check } from 'lucide-react';
import manhourData from '../data/manhourData';
import InfoCard from '../components/InfoCard';

interface SelectedTask {
  jobNumber: string;
  jobTask: string;
  laborQty: string;
  exactManhour: number;
  noOfEqp: number;
  actualManpower: number;
}

const AfcTimeCalculation: React.FC = () => {
  const [bookInTime, setBookInTime] = useState('');
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>([]);
  const [schedule, setSchedule] = useState<string[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);

  const addTask = () => {
    if (selectedTasks.length < 10) {
      setSelectedTasks([...selectedTasks, {
        jobNumber: manhourData[0].jobNumber,
        jobTask: manhourData[0].jobTask,
        laborQty: manhourData[0].laborQty,
        exactManhour: manhourData[0].exactManhour,
        noOfEqp: '',
        actualManpower: ''
      }]);
    }
  };

  const removeTask = (index: number) => {
    setSelectedTasks(selectedTasks.filter((_, i) => i !== index));
  };

  const updateTask = (index: number, field: keyof SelectedTask, value: any) => {
    const updatedTasks = [...selectedTasks];
    if (field === 'jobTask') {
      const task = manhourData.find(t => t.jobTask === value);
      if (task) {
        updatedTasks[index] = {
          ...updatedTasks[index],
          jobNumber: task.jobNumber,
          jobTask: task.jobTask,
          laborQty: task.laborQty,
          exactManhour: task.exactManhour
        };
      }
    } else {
      updatedTasks[index] = { ...updatedTasks[index], [field]: value };
    }
    setSelectedTasks(updatedTasks);
  };

  const calculateSchedule = () => {
    if (!bookInTime || selectedTasks.length === 0) {
      return;
    }

    try {
      let currentTime = new Date(`2000-01-01 ${bookInTime}`);
      const schedule: string[] = [];

      // Add book in time
      schedule.push(`Book In Time: ${bookInTime}`);

      // Add briefing (5 minutes)
      const briefingEnd = new Date(currentTime.getTime() + 5 * 60000);
      schedule.push(`Briefing: ${formatTime(currentTime)} - ${formatTime(briefingEnd)}`);
      
      // Update current time after briefing and add 1-minute gap
      currentTime = new Date(briefingEnd.getTime() + 60000);

      // Calculate each task
      selectedTasks.forEach((task, index) => {
        const duration = Math.round((task.exactManhour * task.noOfEqp * parseInt(task.laborQty)) / task.actualManpower);
        const startTime = new Date(currentTime);
        const endTime = new Date(currentTime.getTime() + duration * 60000);
        
        schedule.push(`\nTask ${index + 1}: ${task.jobTask}\nDuration: ${duration} minutes\nTime: ${formatTime(startTime)} - ${formatTime(endTime)}`);
        
        // Add 1-minute gap after task
        currentTime = new Date(endTime.getTime() + 60000);
      });

      // Add book out time (5 minutes after last task)
      const bookOut = new Date(currentTime.getTime() + 5 * 60000);
      schedule.push(`\nBook Out Time: ${formatTime(bookOut)}`);

      setSchedule(schedule);
      setShowSchedule(true);
    } catch (error) {
      console.error('Error calculating schedule:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toTimeString().substring(0, 5);
  };

  const saveSchedule = () => {
    const content = schedule.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schedule_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <InfoCard 
        title="AFC Time Calculation"
        icon={<Clock className="h-5 w-5" />}
        className="mb-6"
      >
        <div className="text-gray-700 mb-4">
          <p className="mb-2">
            Calculate the total work order time for AFC maintenance tasks using the formula:
          </p>
          <div className="bg-blue-50 p-3 rounded-lg text-center mb-4">
            <p className="text-blue-800 font-semibold">
              Total Timing = (Exact Man Hr × No. of Eqp × Labor Req) ÷ Actual Manpower
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book In Time (24hr format)
            </label>
            <input
              type="time"
              value={bookInTime}
              onChange={(e) => setBookInTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-4">
            {selectedTasks.map((task, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Task {index + 1}</h3>
                  <button
                    onClick={() => removeTask(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Job Task
                    </label>
                    <select
                      value={task.jobTask}
                      onChange={(e) => updateTask(index, 'jobTask', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {manhourData.map((t) => (
                        <option key={t.jobNumber} value={t.jobTask}>
                          {t.jobTask}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Equipment
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={task.noOfEqp}
                      onChange={(e) => updateTask(index, 'noOfEqp', parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Actual Manpower
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={task.actualManpower}
                      onChange={(e) => updateTask(index, 'actualManpower', parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Required Labor</p>
                    <p className="text-lg font-semibold text-blue-800">{task.laborQty}</p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addTask}
              disabled={selectedTasks.length >= 10}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Add Task
            </button>
          </div>

          <button
            onClick={calculateSchedule}
            disabled={!bookInTime || selectedTasks.length === 0}
            className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Schedule
          </button>

          {showSchedule && (
            <div className="mt-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {schedule.join('\n')}
                </pre>
              </div>
              
              <button
                onClick={saveSchedule}
                className="w-full flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Schedule
              </button>
            </div>
          )}
        </div>
      </InfoCard>
    </div>
  );
};

export default AfcTimeCalculation;