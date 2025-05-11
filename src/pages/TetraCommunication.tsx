import React from 'react';
import { Radio, Info } from 'lucide-react';
import InfoCard from '../components/InfoCard';

const TetraCommunication: React.FC = () => {
  const guideSteps = [
    {
      title: "Turn on the radio",
      description: "Press and hold the power button until you hear a beep and see the display light up."
    },
    {
      title: "Select the appropriate channel",
      description: "Use the channel selector knob or buttons to choose your assigned operational channel."
    },
    {
      title: "Press and hold the PTT (Push-to-Talk) button to speak",
      description: "Wait for a second after pressing before speaking to ensure the beginning of your message isn't cut off."
    },
    {
      title: "Release the PTT button to listen",
      description: "Remember that TETRA is a half-duplex system; you can either speak or listen, not both simultaneously."
    }
  ];

  const troubleshooting = [
    {
      problem: "No power",
      solution: "Ensure the battery is charged and properly connected."
    },
    {
      problem: "Poor reception",
      solution: "Check if the antenna is secure and undamaged; move to a better reception area if possible."
    },
    {
      problem: "Cannot access network",
      solution: "Verify that you're within network coverage and that your radio is registered on the system."
    },
    {
      problem: "Unclear audio",
      solution: "Adjust the volume level and ensure the microphone isn't obstructed."
    }
  ];

  const radioProtocol = [
    "Always identify yourself at the beginning of transmission",
    "Use standard phrases such as 'Over' (I've finished speaking) and 'Out' (End of conversation)",
    "Keep transmissions brief and to the point",
    "Use standard phonetic alphabet for spelling out difficult words",
    "Stay disciplined with radio protocols even during emergencies"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <InfoCard 
        title="How to Use Tetra Communication/Radio"
        icon={<Radio className="h-5 w-5" />}
      >
        <div className="text-gray-700 mb-4">
          <p>Guidelines for operating Tetra communication or radio systems.</p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-blue-800 mb-3">Basic Operation</h3>
            <div className="space-y-4">
              {guideSteps.map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{step.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-blue-800 mb-3">Troubleshooting</h3>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="space-y-3">
                {troubleshooting.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-800">{item.problem}</h4>
                    <p className="text-sm text-gray-600">{item.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-blue-800 mb-3">Radio Communication Protocol</h3>
            <ul className="list-disc pl-5 space-y-2">
              {radioProtocol.map((protocol, index) => (
                <li key={index} className="text-gray-700">{protocol}</li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 flex">
            <Info className="h-6 w-6 text-amber-500 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800">Important Note</h4>
              <p className="text-sm text-amber-700">
                Always keep your radio charged and maintain regular radio checks with your team during operations.
                Report any radio issues to the technical team immediately.
              </p>
            </div>
          </div>
        </div>
      </InfoCard>
    </div>
  );
};

export default TetraCommunication;