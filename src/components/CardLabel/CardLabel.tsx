import React, { FC, ReactElement } from "react";

type CardLabelProps = {
  priority: number;
};

const CardLabel: FC<CardLabelProps> = ({ priority }): ReactElement => {
  const prioritySettings = [
    { label: "Low Priority", color: "from-blue-400 to-blue-500" },
    { label: "Medium Priority", color: "from-emerald-400 to-emerald-500" },
    { label: "High Priority", color: "from-red-400 to-red-500" },
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
