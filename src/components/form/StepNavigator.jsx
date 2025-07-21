// src/components/form/StepNavigator.jsx
export default function StepNavigator({ currentStep, onBack }) {
  return (
    <div className="flex justify-start mt-6">
      <button
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        onClick={onBack}
        disabled={currentStep === 0}
      >
        Back
      </button>
    </div>
  );
}
