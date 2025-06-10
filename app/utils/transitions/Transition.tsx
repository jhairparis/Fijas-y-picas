import React, { useRef, useEffect, useContext } from "react";
import { CSSTransition as ReactCSSTransition } from "react-transition-group";

const TransitionContext = React.createContext({
  parent: {} as any, // Added type for parent
});

function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

// CSSTransition component
function CSSTransition(props: any) {
  const {
    show,
    appear,
    // Expect 'unmount' from Features.tsx, map to unmountOnExit for ReactCSSTransition
    unmount,
    tag = "div",
    children,
    // Custom class logic props - expecting names from error messages
    enter = "",
    enterFrom = "", // Was enterStart
    enterTo = "",   // Was enterEnd
    leave = "",
    leaveFrom = "", // Was leaveStart
    leaveTo = "",   // Was leaveEnd
    beforeEnter,  // Was onEnterCb
    // All other props are in ...domOnlyProps
    ...domOnlyProps
  } = props;

  const unmountOnExit = unmount; // Use 'unmount' prop's value for unmountOnExit

  const enterClasses = enter.split(" ").filter((s: string) => s.length);
  const enterFromClasses = enterFrom.split(" ").filter((s: string) => s.length);
  const enterToClasses = enterTo.split(" ").filter((s: string) => s.length);
  const leaveClasses = leave.split(" ").filter((s: string) => s.length);
  const leaveFromClasses = leaveFrom.split(" ").filter((s: string) => s.length);
  const leaveToClasses = leaveTo.split(" ").filter((s: string) => s.length);

  const nodeRef = React.useRef<HTMLElement>(null); // Added type for nodeRef
  const Component = tag as React.ElementType; // Added type for Component

  function addClasses(node: HTMLElement | null, classesToAdd: string[]) {
    if (node && classesToAdd.length) node.classList.add(...classesToAdd);
  }

  function removeClasses(node: HTMLElement | null, classesToRemove: string[]) {
    if (node && classesToRemove.length) node.classList.remove(...classesToRemove);
  }

  return (
    <ReactCSSTransition
      appear={appear}
      nodeRef={nodeRef}
      unmountOnExit={unmountOnExit} // Use the mapped prop
      in={show}
      addEndListener={(done: () => void) => {
        nodeRef.current?.addEventListener("transitionend", done, false);
      }}
      onEnter={() => {
        if (nodeRef.current && !unmountOnExit) nodeRef.current.style.display = ""; // Use empty string for default display
        addClasses(nodeRef.current, [...enterClasses, ...enterFromClasses]);
        if (beforeEnter) beforeEnter();
      }}
      onEntering={() => {
        removeClasses(nodeRef.current, enterFromClasses);
        addClasses(nodeRef.current, enterToClasses);
      }}
      onEntered={() => {
        removeClasses(nodeRef.current, [...enterToClasses, ...enterClasses]);
      }}
      onExit={() => {
        addClasses(nodeRef.current, [...leaveClasses, ...leaveFromClasses]);
      }}
      onExiting={() => {
        removeClasses(nodeRef.current, leaveFromClasses);
        addClasses(nodeRef.current, leaveToClasses);
      }}
      onExited={() => {
        removeClasses(nodeRef.current, [...leaveToClasses, ...leaveClasses]);
        if (nodeRef.current && !unmountOnExit) nodeRef.current.style.display = "none";
      }}
    >
      <Component
        ref={nodeRef}
        {...domOnlyProps} // Spread only the remaining props intended for the DOM element
        style={{ 
          display: !unmountOnExit && !appear && !show ? "none" : "", // Use empty string
          ...domOnlyProps.style 
        }}
      >
        {children}
      </Component>
    </ReactCSSTransition>
  );
}

// Transition wrapper component
function Transition(props: any) {
  const {
    show,
    appear,
    unmount, // Expect 'unmount'
    // custom logic props that CSSTransition expects by these names
    enter,
    enterFrom,
    enterTo,
    leave,
    leaveFrom,
    leaveTo,
    beforeEnter,
    ...rest // these are the domOnlyProps for CSSTransition's Component
  } = props;

  const { parent } = useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  // Determine effective props, prioritizing direct props, then parent context
  const effectiveShow = isChild ? parent.show : show;
  const effectiveAppear = isChild ? (parent.appear || !parent.isInitialRender) : appear;
  const effectiveUnmount = isChild ? parent.unmount : unmount;
  const effectiveEnter = isChild ? parent.enter : enter;
  const effectiveEnterFrom = isChild ? parent.enterFrom : enterFrom;
  const effectiveEnterTo = isChild ? parent.enterTo : enterTo;
  const effectiveLeave = isChild ? parent.leave : leave;
  const effectiveLeaveFrom = isChild ? parent.leaveFrom : leaveFrom;
  const effectiveLeaveTo = isChild ? parent.leaveTo : leaveTo;
  const effectiveBeforeEnter = isChild ? parent.beforeEnter : beforeEnter;

  const transitionProps = {
    show: effectiveShow,
    appear: effectiveAppear,
    unmount: effectiveUnmount, // Pass 'unmount'
    enter: effectiveEnter,
    enterFrom: effectiveEnterFrom,
    enterTo: effectiveEnterTo,
    leave: effectiveLeave,
    leaveFrom: effectiveLeaveFrom,
    leaveTo: effectiveLeaveTo,
    beforeEnter: effectiveBeforeEnter,
    ...rest, // Pass through other DOM props
  };

  if (isChild) {
    return <CSSTransition {...transitionProps} />;
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
          unmount, // Store 'unmount' in context
          enter, enterFrom, enterTo, leave, leaveFrom, leaveTo, beforeEnter, // Store all in context
        },
      }}
    >
      <CSSTransition {...transitionProps} />
    </TransitionContext.Provider>
  );
}

export default Transition;
