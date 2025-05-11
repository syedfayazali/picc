import React, { useState } from 'react';
import { PenTool as Tool, AlertCircle, CheckCircle } from 'lucide-react';
import InfoCard from '../components/InfoCard';

const TroubleshootAfc: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState("Gate Not Opening");

  const issues = [
    "Gate Not Opening", 
    "Ticket Reader Failure", 
    "Network Issue",
    "TVM Payment Issues",
    "PDP Display Problems",
    "Gate Sensor Malfunction"
  ];

  const troubleshootingGuides = {
    "Gate Not Opening": [
      "Check power supply to the gate controller.",
      "Inspect gate sensors for obstructions or dirt.",
      "Restart the gate controller using the service menu.",
      "Verify network connectivity to the central system.",
      "Check gate motor functionality and mechanical components.",
      "If issue persists, contact technical support and provide error codes."
    ],
    "Ticket Reader Failure": [
      "Clean the reader sensor using compressed air and cleaning cards.",
      "Verify ticket compatibility with the system.",
      "Check for foreign objects or debris in the reader slot.",
      "Update reader firmware if available.",
      "Test with a known good ticket to isolate the issue.",
      "Check the reader's connection cables and power supply."
    ],
    "Network Issue": [
      "Check network cables and connections for damage or disconnection.",
      "Verify router and switch functionality with indicator lights.",
      "Restart networking equipment if accessible.",
      "Contact IT support with specific error messages.",
      "Check if other connected devices are experiencing similar issues.",
      "Document when the issue started and any changes made prior."
    ],
    "TVM Payment Issues": [
      "Verify that the TVM is online and connected to the payment processor.",
      "Check for any error messages on the payment terminal display.",
      "Ensure the cash box, coin hoppers, and note recyclers are properly seated.",
      "Restart the payment module through the service menu.",
      "Test a small transaction to verify functionality.",
      "Check transaction logs for any declined payment patterns."
    ],
    "PDP Display Problems": [
      "Check power connection to the display unit.",
      "Restart the PDP system from the service panel.",
      "Verify network connection to ensure content updates are received.",
      "Check for visible damage to the display screen.",
      "Test content display functionality through the diagnostic menu.",
      "Verify that the scheduled content is properly configured."
    ],
    "Gate Sensor Malfunction": [
      "Inspect sensors for physical damage or misalignment.",
      "Clean sensor lenses with approved cleaning solution.",
      "Check sensor wiring connections in the gate controller.",
      "Test sensor functionality using the diagnostic mode.",
      "Calibrate sensors if they are detecting objects incorrectly.",
      "Replace sensor if cleaning and calibration do not resolve the issue."
    ]
  };

  return (
    <div className="max-w-4xl mx-auto">
      <InfoCard 
        title="Troubleshoot AFC Equipments" 
        icon={<Tool className="h-5 w-5" />}
      >
        <div className="text-gray-700 mb-4">
          <p>Select an issue to view the troubleshooting guide for AFC equipment.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
          {issues.map((issue) => (
            <button
              key={issue}
              onClick={() => setSelectedIssue(issue)}
              className={`
                px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${selectedIssue === issue 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}
              `}
            >
              {issue}
            </button>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-5">
          <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
            {selectedIssue}
          </h3>
          
          <div className="space-y-4">
            {troubleshootingGuides[selectedIssue as keyof typeof troubleshootingGuides].map((step, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-sm mr-3 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-4 flex">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800">Resolution Verification</h4>
              <p className="text-sm text-green-700 mt-1">
                After completing these steps, test the equipment to ensure the issue is resolved. 
                If the problem persists, escalate to the next support tier and provide documentation 
                of all steps attempted.
              </p>
            </div>
          </div>
        </div>
      </InfoCard>
    </div>
  );
};

export default TroubleshootAfc;