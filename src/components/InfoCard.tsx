import React, { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ 
  title, 
  children, 
  icon, 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="bg-blue-700 px-4 py-3 flex items-center">
        {icon && <span className="text-white mr-2">{icon}</span>}
        <h3 className="text-lg font-medium text-white">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;