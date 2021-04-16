// eslint:@typescript-eslint/no-explicit-any: "off"
import { useEffect, useCallback, RefObject } from "react";

const isRefArray = (r: RefObject<HTMLDivElement> | RefObject<HTMLDivElement>[]): r is RefObject<HTMLDivElement>[] =>  "length" in r;

const isTarget = (ref1: RefObject<any>, event: MouseEvent) =>  ref1 && ref1.current && ref1.current.contains(event.target);

const trueForAny = (array: React.RefObject<HTMLDivElement>[], condition: (props: RefObject<HTMLDivElement>) => boolean) =>

array.reduce((conditionAlreadyMet, value) =>  conditionAlreadyMet || condition(value)
  , false);

const useClickOutside = (
  ref: RefObject<HTMLDivElement> | RefObject<HTMLDivElement>[],
  onclick: () => void
) : RefObject<HTMLDivElement> | RefObject<HTMLDivElement>[]=> {
  const handleClick = useCallback(
    (click: MouseEvent) => {
      if (isRefArray(ref)) {
        if (trueForAny(ref, (ref2: RefObject<HTMLDivElement>) => isTarget(ref2, click))) {
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
