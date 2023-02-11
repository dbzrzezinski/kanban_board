import React, { FC, ReactElement } from "react";

type CardLabelProps = {
  priority: number;
};

const CardLabel: FC<CardLabelProps> = ({ priority }): ReactElement => {
  const prioritySettings = [
    { label: "Low Priority", color: "from-blue-700 to-blue-600" },
    { label: "Medium Priority", color: "from-lime-800 to-lime-700" },
    { label: "High Priority", color: "from-red-700 to-red-600" },
  ];

  return (
    <label
      className={`bg-gradient-to-r rounded-md py-1 px-2 mr-2 text-xs text-white ${prioritySettings[priority].color}`}
    >
      {prioritySettings[priority].label}
    </label>
  );
};

export default CardLabel;
