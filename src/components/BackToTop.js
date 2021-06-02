import * as React from "react";
import { Zoom, useScrollTrigger } from "@material-ui/core";

const style = {
  position: `fixed`,
  bottom: `50px`,
  right: `20px`,
  zIndex: `99`,
};

const BackToTop = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Zoom in={trigger}>
      <a href="#">
        {" "}
        <div role="presentation" style={style}>
          {children}
        </div>
      </a>
    </Zoom>
  );
};

export default BackToTop;
