// src/components/form/ProgressBar.jsx
export default function ProgressBar({ totalSteps, currentStep }) {
  const percentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-500 h-2.5 rounded-full transition-all"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
