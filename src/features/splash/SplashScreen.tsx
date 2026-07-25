import { useEffect, useState } from 'react';

export type SplashScreenPhase = 'loading' | 'intro' | 'fadeOut';

const LOADING_TEST = true;

const LOADING_TEST_TIME = 3000;

const INTRO_TIME = 3000;
const FADEOUT_TIME = 1500;

function useSplashScreen() {
    const [showSplashScreen, setShowSplashScreen] = useState(true);

    const [splashScreenPhase, setSplashScreenPhase] =
        useState<SplashScreenPhase>(() => {
            if (LOADING_TEST) return 'loading';

            return document.readyState === 'complete' ? 'intro' : 'loading';
        });

    useEffect(() => {
        if (splashScreenPhase !== 'loading') return;

        if (LOADING_TEST) {
            const loadingTimerId = window.setTimeout(() => {
                setSplashScreenPhase('intro');
            }, LOADING_TEST_TIME);

            return () => {
                window.clearTimeout(loadingTimerId);
            };
        }

        const handleLoad = () => {
            setSplashScreenPhase('intro');
        };

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, [splashScreenPhase]);

    useEffect(() => {
        if (splashScreenPhase !== 'intro') return;

        const introTimerId = window.setTimeout(() => {
            setSplashScreenPhase('fadeOut');
        }, INTRO_TIME);

        return () => {
            window.clearTimeout(introTimerId);
        };
    }, [splashScreenPhase]);

    useEffect(() => {
        if (splashScreenPhase !== 'fadeOut') return;

        const removeTimerId = window.setTimeout(() => {
            setShowSplashScreen(false);
        }, FADEOUT_TIME);

        return () => {
            window.clearTimeout(removeTimerId);
        };
    }, [splashScreenPhase]);

    return {
        showSplashScreen,
        splashScreenPhase,
    };
}

export default useSplashScreen;
