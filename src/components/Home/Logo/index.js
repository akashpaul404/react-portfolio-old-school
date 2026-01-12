import "./index.scss";
import LogoS from "../../../assets/images/logo-s.png";
import { ReactComponent as FullASVG } from "../../../assets/images/logo-lines-2.svg";
import { useEffect, useRef } from "react";
import DrawSVGPlugin from "gsap-trial/DrawSVGPlugin";
import gsap from "gsap-trial";

const Logo = () => {
  const bgRef = useRef();
  const outlineLogoRef = useRef();
  const solidLogoRef = useRef();
  const didAnimate = useRef(false); // Add this useRef to track if animation has already run

  useEffect(() => {
    if (didAnimate.current) return; // Check if animation has run before, if yes, do nothing
    didAnimate.current = true;
    gsap.registerPlugin(DrawSVGPlugin);

    // Query all paths within the SVG
    const paths = outlineLogoRef.current.querySelectorAll("path");

    gsap
      .timeline()
      .to(bgRef.current, {
        duration: 1,
        opacity: 1,
      })
      .from(paths, {
        drawSVG: 0,
        duration: 10,
        // stagger: 0.1,
      });

    gsap.fromTo(
      solidLogoRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: 4,
        duration: 4,
      }
    );
  }, []);

  return (
    <div className="logo-container" ref={bgRef}>
      <img ref={solidLogoRef} height={400} className="solid-logo" src={LogoS} />

      <FullASVG
        width="559pt"
        height="897pt"
        viewBox="0 0 559 897"
        xmlns="http://www.w3.org/2000/svg"
        className="svg-container"
        transform="translate(0 457) scale(.1 -.1)"
        fill="none"
        ref={outlineLogoRef}
      />
    </div>
  );
};

export default Logo;
