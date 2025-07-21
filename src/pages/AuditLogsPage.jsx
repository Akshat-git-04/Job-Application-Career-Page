import { getAuditLogs } from '../utils/audit';

export default function AuditLogsPage() {
  const logs = getAuditLogs();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>
      {logs.length === 0 ? (
        <p>No activity logged yet.</p>
      ) : (
        <ul className="space-y-3">
          {logs.map((log, idx) => (
            <li
              key={idx}
              className="border p-4 rounded-lg shadow bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-lg text-blue-700">{log.action}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>

              {/* Display details in a formatted, colorized JSON */}
              {Object.keys(log.details).length > 0 && (
                <div className="mt-3 bg-gray-50 rounded p-3 text-sm font-mono overflow-x-auto">
                  {Object.entries(log.details).map(([key, value]) => (
                    <div key={key} className="flex">
                      <span className="text-purple-600">"{key}"</span>
                      <span className="mx-1 text-gray-500">:</span>
                      <span className="text-green-700">
                        {typeof value === 'string'
                          ? `"${value}"`
                          : JSON.stringify(value, null, 2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
