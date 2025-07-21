// src/pages/AuditLogsPage.jsx
import { motion } from 'framer-motion';
import { getAuditLogs } from '../utils/audit';

export default function AuditLogsPage() {
  const logs = getAuditLogs();

  return (
    <motion.div
      className="p-8 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
        Audit Logs
      </h1>

      {logs.length === 0 ? (
        <motion.p
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          No activity logged yet.
        </motion.p>
      ) : (
        <ul className="space-y-6">
          {logs.map((log, idx) => (
            <motion.li
              key={idx}
              className="p-6 rounded-xl bg-white/70 backdrop-blur-md shadow-lg border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-lg text-blue-700">{log.action}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>

              {Object.keys(log.details).length > 0 && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4 text-sm font-mono overflow-x-auto shadow-inner">
                  {Object.entries(log.details).map(([key, value]) => (
                    <div key={key} className="flex space-x-2">
                      <span className="text-purple-600">"{key}"</span>
                      <span className="text-gray-500">:</span>
                      <span className="text-green-700 break-all">
                        {typeof value === 'string'
                          ? `"${value}"`
                          : JSON.stringify(value, null, 2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
