import { useEffect, useState } from "react";

/**
 * 반응형 상태를 관리하는 훅
 * @param {Object} breakpoints - 중단점 객체
 * @returns {Object} - { isMobile, isTablet, isDesktop, width, height, device }
 */

export function useResponsive(
    breakpoints = {
        mobile: 768, // 375~767
        tablet: 1024, // 768~1023
        desktop: 1920 // 1024~1920
    }
) {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { width } = windowSize;

    const isMobile = width < breakpoints.mobile;
    const isTablet = breakpoints.mobile <= width && width < breakpoints.tablet;
    const isDesktop = breakpoints.tablet <= width;

    // 현재 디바이스 타입을 문자열로 반환
    const device =
    isMobile ? 'mobile'
    : isTablet ? 'tablet'
    :'desktop';

    return {
        isMobile,
        isTablet,
        isDesktop,
        width: windowSize.width,
        height: windowSize.height,
        device,
    }
}