import SplitText from "../components/SplitText/SplitText";
import Particles from "../components/Particles/Particles";

function NoFoundPage() {
  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden z-5 bg-[rgb(6,0,16)]">
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={["#ffffffff", "#facc15","#22d3ee"]}
            particleCount={500}
            particleSpread={10}
            speed={0.3}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
            sizeRandomness={5}
          />
        </div>
        <div className=" flex flex-col items-center justify-center h-full z-10 pointer-events-none">
          <SplitText
            text="404"
            className="text-9xl text-center text-white"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          <SplitText
            text="NOT FOUND"
            className="text-9xl text-center text-white"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>
      </div>
    </>
  );
}

export default NoFoundPage;
