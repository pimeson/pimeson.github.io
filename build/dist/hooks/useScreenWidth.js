import {useEffect, useState} from "../../_snowpack/pkg/react.js";
export default () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => {
      console.log(`screen width: ${window.innerWidth}`);
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
};
