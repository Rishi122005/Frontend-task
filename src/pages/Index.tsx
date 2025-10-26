import ProfileWidget from "@/components/ProfileWidget";
import GalleryWidget from "@/components/GalleryWidget";


const Index = () => {
  return (
   
      
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left side - Empty */}
        <div className="hidden lg:block" />

        {/* Right side - Widgets */}
        <div className="flex flex-col justify-center gap-6 p-8 lg:pr-16">
          <ProfileWidget />
          <GalleryWidget />
        </div>
      </div>
  );
};

export default Index;
