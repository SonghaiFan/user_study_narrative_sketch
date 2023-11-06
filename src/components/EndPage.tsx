import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import MarkdownRenderer from "./common/MarkdownRenderer";
import type { Container, Engine } from "tsparticles-engine";
import options from "../utils/particlesConfig";

const EndPage = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );
  return (
    <div className="end-page-container">
      <MarkdownRenderer
        path="/user_study_narrative_sketch/markdown/end.md"
        className="md:w-1/2 m-auto mt-5 p-10 px-20"
      />
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={options}
        loaded={particlesLoaded}
      />
    </div>
  );
};

export default EndPage;
