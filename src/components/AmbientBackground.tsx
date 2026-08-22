export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
      <div className="absolute top-[-5%] left-[-20%] w-[400px] h-[400px] md:w-[60vw] md:h-[60vw] rounded-full bg-[#D4AF37]/20 blur-[80px] md:blur-[150px] animate-float-slow" />
      <div className="absolute top-[40%] right-[-20%] w-[350px] h-[350px] md:w-[50vw] md:h-[50vw] rounded-full bg-white/15 blur-[80px] md:blur-[120px] animate-float-slower" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[-10%] left-[0%] w-[400px] h-[400px] md:w-[60vw] md:h-[60vw] rounded-full bg-[#D4AF37]/15 blur-[80px] md:blur-[150px] animate-float-slow" style={{ animationDelay: '4s' }} />
    </div>
  );
}
