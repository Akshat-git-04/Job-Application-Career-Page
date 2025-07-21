import { useDispatch } from 'react-redux';
import { loadDraft, startNewForm, deleteDraft } from '../app/slices/formSlice';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
    <div>
      <h2 className="text-xl font-bold mb-4">Start or Resume Your Application</h2>

      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleNewForm}
      >
        Start New Application
      </button>

      {Object.keys(drafts).length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Saved Drafts</h3>
          <ul className="space-y-2">
            {Object.entries(drafts).map(([id, draft]) => (
              <li key={id} className="flex justify-between items-center border p-2 rounded">
                <span>Last updated: {new Date(draft.updatedAt).toLocaleString()}</span>
                <div>
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                    onClick={() => handleResume(id)}
                  >
                    Resume
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
