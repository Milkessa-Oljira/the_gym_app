import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Camera, Calendar, Trash2 } from 'lucide-react';

export default function Gallery() {
  const { gallery } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(null);

  if (gallery.length === 0) {
    return (
      <div className="p-6 pt-24 text-center h-full flex flex-col items-center justify-center animate-in fade-in">
        <div className="w-16 h-16 bg-[#334155] rounded-full mx-auto flex items-center justify-center mb-4">
          <Camera className="w-8 h-8 text-[#94a3b8]" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">No Photos Yet</h2>
        <p className="text-[#94a3b8] max-w-[250px] mx-auto">Take your first progress picture after crushing a workout!</p>
      </div>
    );
  }

  return (
    <div className="p-6 pt-12 animate-in fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
          Gallery
        </h1>
        <p className="text-[#94a3b8]">Review your physique progress and AI advice.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {gallery.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedImage(item)}
            className="rounded-xl overflow-hidden aspect-[3/4] relative group cursor-pointer border border-[#334155] hover:border-[#3b82f6] transition-colors"
          >
            <img src={item.image} alt="Progress" className="w-full h-full object-cover" />
            
            {/* Overlay Date */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
              <p className="text-white text-xs font-semibold flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in zoom-in-95 duration-200">
          <div className="w-full max-w-sm flex flex-col max-h-[90vh]">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-white font-bold">
                 {new Date(selectedImage.date).toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric' })}
               </h3>
               <button onClick={() => setSelectedImage(null)} className="text-[#94a3b8] hover:text-white p-2">
                 Close
               </button>
             </div>
             
             <div className="rounded-2xl overflow-hidden bg-[#1e293b] shrink min-h-0 flex-1 flex justify-center">
               <img src={selectedImage.image} alt="Detail" className="w-auto h-full object-contain" />
             </div>

             {selectedImage.analysis && (
               <div className="mt-4 bg-[#1e293b] p-4 rounded-xl border-l-4 border-l-[#3b82f6] shrink-0 overflow-y-auto max-h-48">
                 <p className="text-sm text-white leading-relaxed">{selectedImage.analysis}</p>
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
}
