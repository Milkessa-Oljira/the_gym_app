import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Save, AlertCircle } from 'lucide-react';

export default function Settings() {
  const { apiKey, setApiKey } = useAppContext();
  const [localKey, setLocalKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setApiKey(localKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 pt-12 space-y-8 animate-in fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Settings
        </h1>
        <p className="text-[#94a3b8]">Configure your Gym AI integration.</p>
      </div>

      <div className="glass-panel p-6 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Gemini API Key
        </h2>
        
        <p className="text-sm text-[#94a3b8] leading-relaxed mb-4">
          Provide your Google Gemini API key to enable AI physique analysis. 
          This key is stored <strong className="text-white">securely and only locally</strong> in your browser's storage. It is never sent to any server other than directly to Google.
        </p>

        <div className="space-y-4">
          <input
            type="password"
            value={localKey}
            onChange={(e) => setLocalKey(e.target.value)}
            placeholder="paste your key here... (AIzaSy...)"
            className="w-full bg-[#0f172a] border border-[#334155] focus:border-[#3b82f6] rounded-xl px-4 py-3 text-white outline-none transition-colors font-mono text-sm"
          />
          
          <button 
            onClick={handleSave}
            className={`w-full ${saved ? 'bg-[#22c55e]' : 'btn-primary'} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2`}
          >
            {saved ? (
              <>Saved Successfully</>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save API Key
              </>
            )}
          </button>
        </div>

        {!localKey && (
          <div className="mt-4 p-4 bg-[#eab308]/10 border border-[#eab308]/20 rounded-xl flex gap-3 text-sm text-[#eab308]">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>AI Features are disabled until an API key is provided.</p>
          </div>
        )}
      </div>

      <div className="text-center pt-8">
        <p className="text-xs text-[#64748b]">App Version 1.0.0 (Local First)</p>
      </div>
    </div>
  );
}
