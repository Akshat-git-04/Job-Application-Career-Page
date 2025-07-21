// src/app/middleware/offlineMiddleware.js
const offlineQueue = [];

export const offlineMiddleware = (store) => (next) => (action) => {
  if (action.meta && action.meta.needsNetwork) {
    if (!navigator.onLine) {
      console.warn('Offline, queuing action:', action.type);
      offlineQueue.push(action);
      return;
    }

    // Try sending action (or API call) immediately
    sendToServer(action).catch(() => {
      offlineQueue.push(action);
    });
  }

  return next(action);
};

// Simulate sending to server (replace with actual API logic)
const sendToServer = async (action) => {
  console.log('Sending to server:', action);
  return new Promise((resolve) => setTimeout(resolve, 500));
};

// When we come back online, flush the queue
window.addEventListener('online', () => {
  console.log('Back online, flushing queue...');
  while (offlineQueue.length) {
    const action = offlineQueue.shift();
    sendToServer(action);
  }
});
