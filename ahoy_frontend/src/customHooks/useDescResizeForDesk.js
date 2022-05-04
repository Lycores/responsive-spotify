import useWindowSize from "./useWindowSize";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import useRerender from "./useRerender";

const breakPoint = 250;
const useDescResizeForDesk = () => {
  let [windowWidth, windowHeight] = useWindowSize();
  let overviewCoverRef = useRef(null);
  let descRef = useRef(null);
  let breakPointUsingJS = useRef(0);
  let shouldJSEngage = useRef(false);
  let descWidthStateForDesk = useRef(0);
  let descWidthStateForMobile = useRef(0);
  let trackListWidthStateForDesk = useRef(0);
  let trackListWidthStateForMobile = useRef(0);
  let [forceUpdate] = useRerender();
  useLayoutEffect(() => {
    if (windowWidth != 0 && overviewCoverRef.current && descRef.current) {
      let coverWidth = overviewCoverRef.current.offsetWidth;
      if (coverWidth <= breakPoint) {
        //record the width of desc
        breakPointUsingJS.current = descRef.current;
        //if right now the width of desc is smaller and equal to threshold,
        if (descRef.current <= breakPointUsingJS.current) {
          // do this
          shouldJSEngage.current = true;
          descWidthStateForDesk.current = windowWidth - 320 - coverWidth;
          descWidthStateForMobile.current = windowWidth - coverWidth;
        } else {
          shouldJSEngage.current = false;
        }
      }
      trackListWidthStateForDesk.current = windowWidth - 300;
      trackListWidthStateForMobile.current = windowWidth - 20;
      console.log(
        trackListWidthStateForDesk.current,
        trackListWidthStateForMobile.current
      );
      forceUpdate();
    }
  }, [windowWidth]);

  return [
    overviewCoverRef,
    descRef,
    descWidthStateForDesk.current,
    descWidthStateForMobile.current,
    trackListWidthStateForDesk.current,
    trackListWidthStateForMobile.current,
    shouldJSEngage.current,
  ];
};

export default useDescResizeForDesk;
