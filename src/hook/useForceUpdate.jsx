import { useState } from "react";

function useForceUpdate() {
  const [, setToggle] = useState(false);
  return () => setToggle((toggle) => !toggle);
}
export default useForceUpdate;
