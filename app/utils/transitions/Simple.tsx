import React, { FC, useRef } from "react"; // Added useRef
import { CSSTransition } from "react-transition-group";
import { FadeProps } from "../../helpers/type";

const Simple: FC<FadeProps> = (props) => {
  const nodeRef = useRef(null); // Create a ref
  return (
    <CSSTransition
      nodeRef={nodeRef} // Pass the ref to nodeRef
      in={props.in}
      timeout={props.time || 300}
      classNames="fade"
      unmountOnExit
    >
      <div ref={nodeRef}>
        {props.children ? props.children : null} {/* Ensure children are explicitly null if undefined/falsy */}
      </div>
    </CSSTransition>
  );
};

export default Simple;
