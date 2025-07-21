// src/utils/audit.js
export const AUDIT_KEY = 'auditLogs';

export function logAction(action, details = {}) {
  const logs = JSON.parse(localStorage.getItem(AUDIT_KEY)) || [];
  logs.push({
    action,
    details,
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem(AUDIT_KEY, JSON.stringify(logs));
}

export function getAuditLogs() {
  return JSON.parse(localStorage.getItem(AUDIT_KEY)) || [];
}
