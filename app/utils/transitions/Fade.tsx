import React, { FC, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { FadeProps } from "../../helpers/type";

const Fade: FC<FadeProps> = (props) => {
  const nodeRef = useRef(null);
  const timeout = props.time || 500; // Default timeout for the transition

  return (
    <SwitchTransition>
      <CSSTransition
        nodeRef={nodeRef}
        key={props.in ? "Goodbye" : "Hello"}
        timeout={timeout} // Added timeout prop
        classNames="fade"
        unmountOnExit
      >
        <div ref={nodeRef}>{props.children}</div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default Fade;
