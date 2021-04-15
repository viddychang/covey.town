import { useEffect, useCallback, RefObject } from "react";

const isRefArray = (r: RefObject<any> | RefObject<any>[]): r is RefObject<any>[] =>  "length" in r;

const isTarget = (ref1: RefObject<any>, event: MouseEvent) =>  ref1 && ref1.current && ref1.current.contains(event.target);

const trueForAny = (array: any[], condition: (props: any) => boolean) => 

array.reduce((conditionAlreadyMet, value) =>  conditionAlreadyMet || condition(value)
  , false);

const useClickOutside = (
  ref: RefObject<any> | RefObject<any>[],
  onclick: () => void
) => {
  const handleClick = useCallback(
    (click: MouseEvent) => {
      if (isRefArray(ref)) {
        if (trueForAny(ref, (ref2: RefObject<any>) => isTarget(ref2, click))) {
          return;
        }
      } else if (isTarget(ref, click)) {
          return;
        }
      onclick();
    },
    [onclick, ref]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return ref;
};

export default useClickOutside;
