import { useState, useRef } from "react";
import { HelpCircle, ChevronLeft, ChevronRight, Plus } from "lucide-react";

// NOTE: These imports will fail if 'swiper' is not installed in your project.
// Run: `npm install swiper` or `bun install swiper` in your terminal.
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperCore } from 'swiper/types';

// ** NEW: GridIcon placeholder for the drag handle. **
// Assuming you have a component named GridIcon defined elsewhere, 
// if not, you must import or define it. For this example, I'll define a simple one
// to make the component runnable.

/**
 * Placeholder for the GridIcon component (should be imported from GridIcon.tsx 
 * if this file is located in the same project).
 */
const GridIcon = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      width="32" 
      height="32" 
      viewBox="0 0 32 32" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-muted-foreground hover:text-foreground transition-colors cursor-grab active:cursor-grabbing ${className}`}
    >
      <rect x="8" y="6" width="4" height="4" fill="currentColor" stroke="currentColor" strokeWidth="2" rx="1" ry="1"/>
      <rect x="16" y="6" width="4" height="4" fill="currentColor" stroke="currentColor" strokeWidth="2" rx="1" ry="1"/>
      <rect x="8" y="14" width="4" height="4" fill="currentColor" stroke="currentColor" strokeWidth="2" rx="1" ry="1"/>
      <rect x="16" y="14" width="4" height="4" fill="currentColor" stroke="currentColor" strokeWidth="2" rx="1" ry="1"/>
      <rect x="8" y="22" width="4" height="4" fill="currentColor" stroke="currentColor" strokeWidth="2" rx="1" ry="1"/>
      <rect x="16" y="22" width="4" height="4" fill="currentColor" stroke="currentColor" strokeWidth="2" rx="1" ry="1"/>
    </svg>
  );
};


interface GalleryImage {
  id: string;
  url: string;
}

const GalleryWidget = () => {
  const [images, setImages] = useState<GalleryImage[]>([
    { id: "1", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop" },
    { id: "2", url: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=400&h=400&fit=crop" },
    { id: "3", url: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&h=400&fit=crop" },
    // Added one more for a better carousel feel
    { id: "4", url: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&h=400&fit=crop" },
    { id: "5", url: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&h=400&fit=crop" },
  ]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const swiperRef = useRef<SwiperCore | null>(null);

  // 3. State to manage the disabled status of buttons
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        url: url,
      };
      setImages([...images, newImage]);
      // After adding, slide to the end
      swiperRef.current?.slideTo(images.length);
    }
  };

  // 4. Update functions to control the Swiper instance
  const handlePrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  // 5. Update button disabled state on slide change
  const onSlideChange = (swiper: SwiperCore) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="relative bg-widget rounded-3xl p-8 shadow-widget backdrop-blur-sm">
      {/* Help Circle Icon (fixed at top-left) */}
      <button className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-colors">
        <HelpCircle size={20} />
      </button>

      {/* MODIFIED HEADER LAYOUT AND STYLING */}
      <div className="flex items-center justify-between mb-8">
        
        {/* 1. Gallery Title styled to match the dark pill/tab in the profile widget */}
        {/* ADDED ml-10 to shift it away from the absolute positioned HelpCircle (24px left + ~16px for padding) */}
        <div className="bg-primary/50 text-foreground px-8 py-3 rounded-xl shadow-lg ml-10">
          <h2 className="text-foreground font-medium text-lg">Gallery</h2>
        </div>

        <div className="flex items-center gap-4">
          
          {/* 2. ADD IMAGE button with dark, frosted background */}
          <button
            onClick={handleAddImage}
            // Adjusted styles to match the dark, slightly transparent look
            className="bg-primary/30 backdrop-blur-sm hover:bg-primary/50 text-foreground px-5 py-2 rounded-xl text-base font-medium transition-all flex items-center gap-2 shadow-xl border border-white/5"
            style={{ 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                textShadow: '0 0 4px rgba(0, 0, 0, 0.7)'
            }}
          >
            <Plus size={18} />
            ADD IMAGE
          </button>

          {/* 3. Navigation Buttons styled with dark, frosted background */}
          <button
            onClick={handlePrevious}
            disabled={isBeginning}
            // Applied similar dark/frosted styles
            className="bg-primary/30 backdrop-blur-sm hover:bg-primary/50 text-foreground w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl border border-white/5"
            style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            disabled={isEnd}
            // Applied similar dark/frosted styles
            className="bg-primary/30 backdrop-blur-sm hover:bg-primary/50 text-foreground w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl border border-white/5"
            style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Grid Icon added here, positioned to the left of the images, and vertically centered */}
      <div className="flex">
        <div className="mr-4 flex items-center justify-center pt-2"> 
          <GridIcon className="w-8 h-8"/> 
        </div>

        <div className="w-full overflow-hidden flex-grow">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onAfterInit={(swiper) => onSlideChange(swiper)}
            onSlideChange={onSlideChange}
            
            modules={[Navigation]}
            slidesPerView={3} // Show 3 slides
            spaceBetween={16} // Corresponds to your `gap-4`
            loop={false} 
          >
            {images.map((image) => (
              <SwiperSlide key={image.id}>
                <div
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={image.url}
                    alt="Gallery"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
                    // Your cool 3D hover effect is preserved!
                    style={{
                      transform: "perspective(1000px) rotateY(0deg)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "perspective(1000px) rotateY(-8deg) rotateX(4deg) scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)";
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default GalleryWidget;
