const HeroVideo = () => (
    <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl aspect-[16/9]">
      <iframe
        src="https://www.youtube.com/embed/Mg9yzpeICo4"
        title="Welcome to the Alternative World"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
  
  export default HeroVideo;
  