import React, { ReactElement } from 'react';

type CardLabelProps = {
  priority: number;
  className?: string;
};

const CardLabel: React.FC<CardLabelProps> = ({ priority, className }): ReactElement => {
  const prioritySettings = [
    { label: 'Low Prio', color: 'from-blue-400 to-blue-500' },
    { label: 'Medium Prio', color: 'from-emerald-400 to-emerald-500' },
    { label: 'High Prio', color: 'from-red-400 to-red-500' }
  ];

  return (
    <label
      className={`select-none bg-gradient-to-r rounded-md py-1 px-2 mr-2 text-xs text-white ${prioritySettings[priority].color} ${className}`}>
      {prioritySettings[priority].label}
    </label>
  );
};

export default CardLabel;
