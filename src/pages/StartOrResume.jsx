import { useDispatch } from 'react-redux';
import { loadDraft, startNewForm, deleteDraft } from '../app/slices/formSlice';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FilePlus, PlayCircle, Trash2 } from 'lucide-react';

export default function StartOrResume() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState({});

  useEffect(() => {
    setDrafts(JSON.parse(localStorage.getItem('jobAppDrafts')) || {});
  }, []);

  const handleNewForm = () => {
    dispatch(startNewForm());
    navigate('/apply/personal');
  };

  const handleResume = (id) => {
    const data = drafts[id];
    dispatch(loadDraft({ id, data }));
    navigate('/apply/personal');
  };

  const handleDelete = (id) => {
    dispatch(deleteDraft(id));
    const updated = { ...drafts };
    delete updated[id];
    setDrafts(updated);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <motion.div
        className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Start or Resume Your Application
        </h2>

        {/* Start new application button */}
        <motion.button
          onClick={handleNewForm}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-medium shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl transition mb-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FilePlus className="w-5 h-5" />
          Start New Application
        </motion.button>

        {/* Drafts Section */}
        {Object.keys(drafts).length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Saved Drafts</h3>
            <ul className="space-y-4">
              {Object.entries(drafts).map(([id, draft], idx) => (
                <motion.li
                  key={id}
                  className="p-4 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 shadow hover:shadow-lg transition flex justify-between items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div>
                    <p className="text-gray-700 font-medium">
                      Draft ID: <span className="text-blue-600">{id}</span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      Last updated: {new Date(draft.updatedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => handleResume(id)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow hover:shadow-md transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PlayCircle className="w-4 h-4" />
                      Resume
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(id)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg shadow hover:shadow-md transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </motion.button>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
}
