// src/pages/ManagerReview.jsx
import { useState, useEffect } from 'react';
import { logAction } from '../utils/audit';

export default function ManagerReview() {
  const [drafts, setDrafts] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('jobAppDrafts')) || {};
    setDrafts(stored);
  }, []);

  const handleDecision = (id, decision) => {
    logAction(`Application ${decision}`, { draftId: id, by: 'Manager' });
    alert(`Application ${id} marked as ${decision}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Review Applications</h1>
      {Object.keys(drafts).length === 0 ? (
        <p>No applications to review.</p>
      ) : (
        <ul className="space-y-4">
          {Object.entries(drafts).map(([id, data]) => (
            <li key={id} className="p-4 border rounded shadow">
              <p><strong>ID:</strong> {id}</p>
              <p><strong>Data:</strong> {JSON.stringify(data)}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleDecision(id, 'Approved')}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecision(id, 'Rejected')}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
