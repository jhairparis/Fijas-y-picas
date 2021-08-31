import React, { FC } from "react";
import { CSSTransition } from "react-transition-group";
import { FadeProps } from "../../helpers/type";

const Simple: FC<FadeProps> = (props) => {
  return (
    <CSSTransition
      in={props.in}
      timeout={props.time || 300}
      classNames="fade"
      unmountOnExit
    >
      <div>{props.children}</div>
    </CSSTransition>
  );
};

export default Simple;
