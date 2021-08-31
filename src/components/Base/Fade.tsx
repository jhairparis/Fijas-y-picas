import React, { FC } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { FadeProps } from "../../helpers/type";

const Fade: FC<FadeProps> = (props) => {
  return (
    <SwitchTransition>
      <CSSTransition
        key={props.in ? "Goodbye" : "Hello"}
        addEndListener={(node, done) =>
          node.addEventListener("transitionend", done, false)
        }
        classNames="fade"
      >
        <div>{props.children}</div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default Fade;
