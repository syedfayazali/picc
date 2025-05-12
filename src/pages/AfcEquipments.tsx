import React, { useState } from 'react';
import { Database, BarChart, Search } from 'lucide-react';
import { equipmentData, equipmentTotals } from '../data/equipmentData';
import DataTable from '../components/DataTable';
import InfoCard from '../components/InfoCard';

const AfcEquipments: React.FC = () => {
  const [filterLine, setFilterLine] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const equipmentColumns = [
    { key: 'line', label: 'Line' },
    { key: 'stationName', label: 'Station Name' },
    { key: 'stationCode', label: 'Station Code' },
    { key: 'pdp', label: 'PDP' },
    { key: 'wideAisle', label: 'Wide Aisle' },
    { key: 'standardAisle', label: 'Standard Aisle' },
    { key: 'wideGate', label: 'Wide Gate' },
    { key: 'standardGate', label: 'Standard Gate'},
    { key: 'gate', label: 'Gate' },
    { key: 'tvm', label: 'TVM' },
    { key: 'tom', label: 'TOM' },
    { key: 'newTvm', label:'New TVM'},
    { key: 'newGate', label:'New Gate'}
  ];

  const totalsColumns = [
    { key: 'line', label: 'Line' },
    { key: 'pdp', label: 'PDP' },
    { key: 'wideAisle', label: 'Wide Aisle' },
    { key: 'standardAisle', label: 'Standard Aisle' },
    { key: 'wideGate', label: 'Wide Gate' },
    { key: 'standardGate', label: "Standard Gate"},
    { key: 'gateArray', label: 'Gate Array' },
    { key: 'gate', label: 'Gate' },
    { key: 'tvm', label: 'TVM' },
    { key: 'tom', label: 'TOM' },
    { key: 'newTvm', label: 'New TVM' },
    { key: 'newGate', label: 'New Gate' }
  ];

  const lineColors = {
    Red: 'bg-red-100 text-red-800',
    Green: 'bg-green-100 text-green-800',
    Gold: 'bg-yellow-100 text-yellow-800',
    'All Lines': 'bg-blue-100 text-blue-800'
  };

  // Filter equipment by line and search term
  const filteredEquipment = equipmentData.filter(equipment => {
    const matchesLine = filterLine === 'All' || equipment.line === filterLine;
    const matchesSearch = searchTerm === '' || 
      equipment.stationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.stationCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.line.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLine && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <InfoCard 
        title="AFC Equipments Sheet" 
        icon={<Database className="h-5 w-5" />}
      >
        <div className="text-gray-700 mb-4">
          <p>Inventory of AFC equipment across all lines with detailed counts by station.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by station name, code, or line..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="md:w-1/2 flex gap-2">
            {['All', 'Red', 'Green', 'Gold'].map(line => (
              <button
                key={line}
                onClick={() => setFilterLine(line)}
                className={`
                  flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
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
        </div>

        <div className="mb-8">
          <DataTable 
            columns={equipmentColumns}
            data={filteredEquipment.map(equipment => ({
              ...equipment,
              line: (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${lineColors[equipment.line as keyof typeof lineColors]}`}>
                  {equipment.line}
                </span>
              )
            }))}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
            <BarChart className="h-5 w-5 text-blue-600 mr-2" />
            Equipment Totals
          </h3>
          <DataTable 
            columns={totalsColumns}
            data={equipmentTotals.map(total => ({
              ...total,
              line: (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${lineColors[total.line as keyof typeof lineColors]}`}>
                  {total.line}
                </span>
              )
            }))}
          />
        </div>
      </InfoCard>
    </div>
  );
};

export default AfcEquipments;