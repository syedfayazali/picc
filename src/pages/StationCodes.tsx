import React, { useState } from 'react';
import { Phone, Search } from 'lucide-react';
import { stationData, additionalContacts } from '../data/stationData';
import DataTable from '../components/DataTable';
import InfoCard from '../components/InfoCard';

const StationCodes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLine, setFilterLine] = useState('All');

  const stationColumns = [
    { key: 'line', label: 'Line' },
    { key: 'stationName', label: 'Station Name' },
    { key: 'stationCode', label: 'Station Code' },
    { key: 'wired', label: 'Wired' },
    { key: 'wireless', label: 'Wireless' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'emailId', label: 'Email ID' }
  ];

  const contactColumns = [
    { key: 'role', label: 'Role' },
    { key: 'contact', label: 'Contact' }
  ];

  const lineColors = {
    Red: 'bg-red-100 text-red-800',
    Green: 'bg-green-100 text-green-800',
    Gold: 'bg-yellow-100 text-yellow-800'
  };

  // Filter stations by line and search term
  const filteredStations = stationData.filter(station => {
    const matchesLine = filterLine === 'All' || station.line === filterLine;
    const matchesSearch = station.stationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          station.stationCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          station.mobile.includes(searchTerm);
    return matchesLine && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <InfoCard 
        title="Station Codes and Phone Numbers" 
        icon={<Phone className="h-5 w-5" />}
      >
        <div className="text-gray-700 mb-4">
          <p>Complete directory of station codes and contact numbers for Red, Green, and Gold Lines.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search stations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <select
              value={filterLine}
              onChange={(e) => setFilterLine(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Lines</option>
              <option value="Red">Red Line</option>
              <option value="Green">Green Line</option>
              <option value="Gold">Gold Line</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {['All', 'Red', 'Green', 'Gold'].map(line => (
            <button
              key={line}
              onClick={() => setFilterLine(line)}
              className={`
                px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${line === 'All' 
                  ? (filterLine === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700')
                  : (filterLine === line 
                      ? lineColors[line as keyof typeof lineColors] 
                      : 'bg-gray-200 text-gray-700')
                }
              `}
            >
              {line} {line !== 'All' ? 'Line' : 'Lines'}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <DataTable 
            columns={stationColumns}
            data={filteredStations.map(station => ({
              ...station,
              line: (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${lineColors[station.line as keyof typeof lineColors]}`}>
                  {station.line}
                </span>
              )
            }))}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Additional Contacts</h3>
          <DataTable 
            columns={contactColumns}
            data={additionalContacts}
          />
        </div>
      </InfoCard>
    </div>
  );
};

export default StationCodes;