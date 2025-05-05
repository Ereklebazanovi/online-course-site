import { FC, ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  icon: ReactNode;
  color?: string;
}

const SummaryCard: FC<Props> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start space-y-2">
      <div className={`text-3xl ${color}`}>{icon}</div>
      <div>
        <h3 className="text-xl font-semibold">{value}</h3>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
