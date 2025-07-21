import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { logAction } from '../utils/audit';

export default function ManagerReview() {
  const [drafts, setDrafts] = useState({});
  const [decisions, setDecisions] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('jobAppDrafts')) || {};
    setDrafts(stored);
  }, []);

  const handleDecision = (id, decision) => {
    logAction(`Application ${decision}`, { draftId: id, by: 'Manager' });
    setDecisions((prev) => ({ ...prev, [id]: decision }));
  };

  const renderFields = (data) => {
    return Object.entries(data).map(([key, value]) => (
      <div
        key={key}
        className="flex justify-between border-b last:border-none py-1 text-sm"
      >
        <span className="font-medium text-gray-700 capitalize">{key}:</span>
        <span className="text-gray-600 break-all">
          {typeof value === 'object' ? JSON.stringify(value) : value}
        </span>
      </div>
    ));
  };

  const total = Object.keys(drafts).length;
  const approved = Object.values(decisions).filter((d) => d === 'Approved').length;
  const rejected = Object.values(decisions).filter((d) => d === 'Rejected').length;

  // Sort drafts by ID descending (newest first)
  const sortedDrafts = Object.entries(drafts).sort(([idA], [idB]) => Number(idB) - Number(idA));

  return (
    <motion.div
      className="p-8 max-w-6xl mx-auto space-y-10"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Manager Dashboard
        </h1>
        <p className="text-gray-600 text-lg">Review and approve job applications</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Total Applications', value: total, color: 'from-blue-400 to-blue-600' },
          { label: 'Approved', value: approved, color: 'from-green-400 to-emerald-600' },
          { label: 'Rejected', value: rejected, color: 'from-red-400 to-pink-600' },
        ].map(({ label, value, color }) => (
          <motion.div
            key={label}
            className={`p-6 rounded-xl shadow-lg text-white bg-gradient-to-r ${color} flex flex-col items-center`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-lg">{label}</p>
            <p className="text-3xl font-bold">{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Applications List */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Applications</h2>
        {total === 0 ? (
          <motion.p
            className="text-gray-600 text-lg text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            No applications to review.
          </motion.p>
        ) : (
          <ul className="space-y-6">
            {sortedDrafts.map(([id, data], idx) => {
              const decision = decisions[id];
              return (
                <motion.li
                  key={id}
                  className="p-6 rounded-xl bg-white/70 backdrop-blur-md shadow-lg border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold text-gray-800">
                      Application <span className="text-blue-600">#{id}</span>
                    </p>
                    {decision && (
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium shadow ${
                          decision === 'Approved'
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-red-100 text-red-700 border border-red-300'
                        }`}
                      >
                        {decision}
                      </span>
                    )}
                  </div>

                  {/* Fields */}
                  <div className="bg-gray-50 rounded-lg p-4 shadow-inner text-sm">
                    {renderFields(data)}
                  </div>

                  {/* Action Buttons */}
                  {!decision && (
                    <div className="mt-5 flex gap-3">
                      <motion.button
                        onClick={() => handleDecision(id, 'Approved')}
                        className="flex-1 px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg shadow hover:shadow-lg transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Approve
                      </motion.button>
                      <motion.button
                        onClick={() => handleDecision(id, 'Rejected')}
                        className="flex-1 px-5 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-lg shadow hover:shadow-lg transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Reject
                      </motion.button>
                    </div>
                  )}
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
