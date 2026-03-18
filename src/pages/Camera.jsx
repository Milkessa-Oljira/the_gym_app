import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Camera as CameraIcon, Check, X, RefreshCw, Loader2 } from 'lucide-react';

export default function Camera() {
  const { apiKey, addGalleryImage } = useAppContext();
  const navigate = useNavigate();
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [error, setError] = useState('');

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } // Usually front camera for physique
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError('');
    } catch (err) {
      console.error(err);
      setError('Could not access camera. Please check permissions.');
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  }, [stream]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageData);
      stopCamera();
    }
  };

  const retake = () => {
    setCapturedImage(null);
    setAnalysisResult('');
    startCamera();
  };

  const analyzeImage = async () => {
    if (!apiKey) {
      setError('Cannot analyze: No Gemini API Key provided in Settings.');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      // Clean base64 string
      const base64Data = capturedImage.split(',')[1];

      // Formulate Prompt context specific to the user
      const prompt = `
        You are an expert fitness coach and physiotherapist. 
        Context: The user is a 28-year-old male, 185 cm tall, 77 kg, Ethiopian living in Vancouver, aiming for a lean muscular build.
        Task: Analyze this latest progress picture. 
        1. Give a brief, encouraging assessment of current leanness and muscle definition (keep it to 1 sentence).
        2. Give 1 specific recommendation for their next workouts (Push/Core or Pull/Legs focus) or diet based on what you see.
        Keep the entire response under 3 sentences for easy reading in the app.
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inlineData: { mimeType: "image/jpeg", data: base64Data } }
            ]
          }]
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'Error from Gemini API');
      }

      const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text || "Analysis complete, but no text returned.";
      setAnalysisResult(textResult);

    } catch (err) {
      setError(`Analysis failed: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = () => {
    addGalleryImage({
      image: capturedImage,
      analysis: analysisResult
    });
    navigate('/gallery');
  };

  return (
    <div className="p-6 pt-12 h-full flex flex-col items-center justify-center animate-in fade-in relative">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-6 w-full text-left">
        Progress Picture
      </h1>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl text-red-200 text-sm mb-6 w-full">
          {error}
        </div>
      )}

      {/* Main viewport */}
      <div className="w-full relative aspect-[3/4] bg-[#1e293b] rounded-2xl overflow-hidden shadow-2xl mb-8 flex items-center justify-center">
        {!stream && !capturedImage ? (
           <button onClick={startCamera} className="flex flex-col items-center gap-4 text-[#94a3b8] hover:text-white transition-colors">
             <div className="bg-[#334155] p-6 rounded-full">
               <CameraIcon className="w-12 h-12" />
             </div>
             <span className="font-semibold">Start Camera</span>
           </button>
        ) : capturedImage ? (
          <img src={capturedImage} alt="Progress" className="w-full h-full object-cover" />
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover mirror-horizontally"
          />
        )}
        
        {/* Is Analyzing overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm flex flex-col items-center justify-center text-white z-20">
            <Loader2 className="w-12 h-12 animate-spin text-[#3b82f6] mb-4" />
            <p className="font-bold text-lg animate-pulse">Gemini is analyzing...</p>
          </div>
        )}
      </div>
      
      {/* Hidden Canvas to capture image */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Controls Container */}
      <div className="w-full">
        {stream && !capturedImage && (
          <button onClick={capturePhoto} className="w-full bg-white text-[#0f172a] hover:bg-gray-200 font-bold py-5 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all">
            Take Photo
          </button>
        )}

        {capturedImage && !analysisResult && !isAnalyzing && (
          <div className="grid grid-cols-2 gap-4">
             <button onClick={retake} className="btn-secondary">
               <RefreshCw className="w-4 h-4 mr-2" /> Retake
             </button>
             <button onClick={analyzeImage} className="btn-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]">
               Analyze w/ AI
             </button>
          </div>
        )}

        {/* AI Result View */}
        {analysisResult && (
          <div className="w-full animate-in slide-in-from-bottom-4">
            <div className="glass-panel p-5 mb-4 border-l-4 border-l-[#3b82f6]">
              <p className="text-sm text-white leading-relaxed">{analysisResult}</p>
            </div>
            
            <div className="grid gap-3">
              <button onClick={handleSave} className="btn-primary w-full">
                <Check className="w-4 h-4 mr-2" /> Save to Gallery
              </button>
              <button onClick={retake} className="btn-secondary w-full">
                <X className="w-4 h-4 mr-2" /> Discard
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
