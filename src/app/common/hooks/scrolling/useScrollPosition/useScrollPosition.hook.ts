import { useRef, DependencyList, useLayoutEffect, useEffect } from 'react';
import getScrollPosition, { isBrowser } from "./useScrollPosition.utils";
import { ElementRefOrDefault, ScrollProps } from "./useScrollPosition";

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export const useScrollPosition = (
    effect: (props: ScrollProps) => void,
    deps?: DependencyList,
    element?: ElementRefOrDefault,
    useWindow?: boolean,
    wait?: number,
    boundingElement?: ElementRefOrDefault,
) => {
    const position = useRef(getScrollPosition(
        {
            useWindow,
            boundingElement
        }));

    let throttleTimeout: NodeJS.Timeout | null = null;

    const callBack = () => {
        const currentPos = getScrollPosition({
            element,
            useWindow,
            boundingElement
        });

        effect({ previousPos: position.current, currentPos });

        position.current = currentPos;
        throttleTimeout = null;
    };

    useIsomorphicLayoutEffect(() => {
        if (!isBrowser) {
            return;
        }

        const handleScroll = () => {
            if (wait) {
                if (throttleTimeout === null) {
                    throttleTimeout = setTimeout(callBack, wait);
                }
            } else {
                callBack();
            }
        };

        if (boundingElement) {
            boundingElement.current?.addEventListener('scroll', handleScroll, { passive: true });
        } else {
            window.addEventListener('scroll', handleScroll, { passive: true });
        }

        return () => {
            if (boundingElement) {
                boundingElement.current?.removeEventListener('scroll', handleScroll);
            } else {
                window.removeEventListener('scroll', handleScroll);
            }

            if (throttleTimeout) {
                clearTimeout(throttleTimeout);
            }
        };
    }, deps);
};

useScrollPosition.defaultProps = {
    deps: [],
    element: false,
    useWindow: false,
    wait: null,
    boundingElement: false,
};
