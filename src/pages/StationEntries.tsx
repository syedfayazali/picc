import React, { useState } from 'react';
import { DoorOpen, Search, MapPin, AlertTriangle } from 'lucide-react';
import InfoCard from '../components/InfoCard';

interface Station {
  line: string;
  entrances: string[];
  assembly_points: string[];
  emergency_exits: string[];
}

interface StationData {
  [key: string]: Station;
}

const stationData: StationData = {
  "Al Riffa": {
    line: "Green",
    entrances: [
      "Entrance 1: East (Dukhan Side)",
      "Entrance 2: West (Al Rayyan Stadium Side)",
      "Entrance 3: Mall Of Qatar Bridge"
    ],
    assembly_points: [
      "Entrance 1 (After EED)",
      "Entrance 2 (Stadium Side after Sliding Door)"
    ],
    emergency_exits: [
      "West BOH (SCR)",
      "East BOH (Pantry/Public Washroom Side)",
      "Entrance 1",
      "Entrance 2"
    ]
  },
  "Education City": {
    line: "Green",
    entrances: [
      "North Shelter: Entrance 1 (Main)",
      "South Shelter: Entrance 2 (South Underpass)"
    ],
    assembly_points: [
      "North (Above SCR) (Main AP)",
      "South (With Travelator)",
      "Switch Box (East)"
    ],
    emergency_exits: [
      "East BOH (SCR)",
      "West BOH (Public Washroom)",
      "South Underpass (Travelator)",
      "Switch Box (East) - Manlift"
    ]
  },
  "Qatar National Library": {
    line: "Green",
    entrances: [
      "Shelter 1/Entrance 1 (North)",
      "Shelter 2/Entrance 2 (South)"
    ],
    assembly_points: [
      "Entrance 1 (North)",
      "Entrance 2 (South)"
    ],
    emergency_exits: [
      "East Pop Up (SCR Side)",
      "West Pop Up (TVM Side)",
      "Entrance 1 (North)",
      "Entrance 2 (South)"
    ]
  },
  "Al Shaqab": {
    line: "Green",
    entrances: [
      "Entrance 1: Main Shelter",
      "Entrance 2: North Shelter",
      "Entrance 3: South Car Park"
    ],
    assembly_points: [
      "Between East and West Pop Up"
    ],
    emergency_exits: [
      "West Pop Up: West BOH (TVM Room)",
      "East Pop Up: East BOH (SCR Side)",
      "Main Shelter (Center/Gold Club Side)",
      "North Shelter (Walkalator)",
      "South Car Park (QNB ATM Machine)"
    ]
  },
  "Al Rayyan Al Qadeem": {
    line: "Green",
    entrances: [
      "Shelter 1/Entrance 1 (North)",
      "Shelter 2/Entrance 2 (South)"
    ],
    assembly_points: [
      "Behind North Shelter"
    ],
    emergency_exits: [
      "West BOH (SCR)",
      "East BOH (Public Washroom Side)",
      "North Shelter",
      "South Shelter"
    ]
  },
  "Al Messila": {
    line: "Green",
    entrances: [
      "North Shelter: Entrance 1 (Main)",
      "South Shelter: Entrance 2"
    ],
    assembly_points: [
      "Between West and East BOH Pop Up",
      "North Shelter"
    ],
    emergency_exits: [
      "West BOH (SCR Side)",
      "East BOH (Pantry Side)"
    ]
  },
  "Hamad Hospital": {
    line: "Green",
    entrances: [
      "Entrance 1: Lulu Hypermarket",
      "Entrance 2: Residence",
      "Entrance 3: Hamad Emergency (HMC)"
    ],
    assembly_points: [
      "Front of Entrance 1",
      "Between Entrance 1 and Pop Up 1"
    ],
    emergency_exits: [
      "East BOH (SCR Side) - Pop Up 2",
      "West BOH (Pantry Side) - Pop Up 1",
      "Entrance 1",
      "Entrance 2",
      "Entrance 3"
    ]
  },
  "The White Palace": {
    line: "Green",
    entrances: [
      "Entrance 1: East (Gulf Exchange Side/Going Hamad Hospital)",
      "Entrance 2: West (Clinics/Beside Gold Club)"
    ],
    assembly_points: [
      "Between Pop-Up 03 and Pop-up 04 (Entrance 1)",
      "Between Pop-Up 07 and Pop-up 08 (Entrance 2)"
    ],
    emergency_exits: [
      "Entrance 1",
      "Entrance 2",
      "West BOH (Public Washroom/Pantry Side)",
      "East BOH (SCR Side)"
    ]
  },
  "Al Mansoura": {
    line: "Green",
    entrances: [
      "Entrance 1: West Side (Gold Club Side)",
      "Entrance 2: East Side (SCR Side)"
    ],
    assembly_points: [
      "Outside Entrance 01: Pop Up 03 (Main AP)",
      "Outside Entrance 02: Pop Up 08"
    ],
    emergency_exits: [
      "East BOH: Staircase 02 (SCR Side)",
      "West BOH: Staircase 01 (Public Washroom Side)"
    ]
  }
};

const StationEntries: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const lineColors = {
    Green: 'bg-green-100 text-green-800',
    Red: 'bg-red-100 text-red-800',
    Gold: 'bg-yellow-100 text-yellow-800'
  };

  const filteredStations = Object.keys(stationData).filter(station =>
    station.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <InfoCard 
        title="Station Entries and Exits" 
        icon={<DoorOpen className="h-5 w-5" />}
      >
        <div className="text-gray-700 mb-4">
          <p>View detailed information about station entrances, assembly points, and emergency exits.</p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for a station..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {filteredStations.map(station => (
            <button
              key={station}
              onClick={() => setSelectedStation(station)}
              className={`p-4 rounded-lg border ${
                selectedStation === station 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              } text-left transition-colors`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{station}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  lineColors[stationData[station].line as keyof typeof lineColors]
                }`}>
                  {stationData[station].line} Line
                </span>
              </div>
            </button>
          ))}
        </div>

        {selectedStation && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{selectedStation}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  lineColors[stationData[selectedStation].line as keyof typeof lineColors]
                }`}>
                  {stationData[selectedStation].line} Line
                </span>
              </div>
            </div>

            <div className="p-4 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <DoorOpen className="h-4 w-4 mr-2" />
                  Entrances
                </h4>
                <ul className="space-y-2">
                  {stationData[selectedStation].entrances.map((entrance, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5 mr-2">
                        {index + 1}
                      </span>
                      <span className="text-gray-600">{entrance}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Assembly Points
                </h4>
                <ul className="space-y-2">
                  {stationData[selectedStation].assembly_points.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5 mr-2">
                        AP{index + 1}
                      </span>
                      <span className="text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency Exits
                </h4>
                <ul className="space-y-2">
                  {stationData[selectedStation].emergency_exits.map((exit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-red-100 text-red-800 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5 mr-2">
                        E{index + 1}
                      </span>
                      <span className="text-gray-600">{exit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </InfoCard>
    </div>
  );
};

export default StationEntries;