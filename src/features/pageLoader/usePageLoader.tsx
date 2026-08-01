import { useEffect, useState } from 'react';

export type PageLoaderPhase = 'loading' | 'intro' | 'fadeOut';

// TEST
// 로딩 화면 테스트 모드 여부
const LOADING_TEST = true;

// TIME
// phase가 유지되는 시간(ms)
const LOADING_TIME = 3000;
const INTRO_TIME = 3000;
const FADEOUT_TIME = 3000;

function usePageLoader() {
    const [showPageLoader, setShowPageLoader] = useState(true);
    // showPageLoader => 로더 화면을 보여줄지 말지 결정하는 state 값
    // setShowPageLoader => showPageLoader 값을 바꾸는 함수
    // true => 처음에는 로더 화면을 보여준다

    const [pageLoaderPhase, setPageLoaderPhase] = useState<PageLoaderPhase>(
        () => {
            // useState lazy initializer
            // 첫 렌더링 때 초기 pageLoaderPhase 값을 정한다

            if (LOADING_TEST) return 'loading';
            // 테스트 모드면 무조건 loading부터 시작한다

            return document.readyState === 'complete' ? 'intro' : 'loading';
            // 이미 페이지 로딩이 끝났으면 intro부터 시작
            // 아직 로딩 중이면 loading부터 시작
        },
    );
    // pageLoaderPhase => 현재 로더 단계 state 값
    // setPageLoaderPhase => pageLoaderPhase 값을 바꾸는 함수
    // PageLoaderPhase => 'loading' | 'intro' | 'fadeOut' 중 하나만 가능

    useEffect(() => {
        if (pageLoaderPhase !== 'loading') return;
        // 현재 phase가 loading이 아니면 이 effect는 바로 종료한다

        if (LOADING_TEST) {
            const loadingTimerId = window.setTimeout(() => {
                setPageLoaderPhase('intro');
                // LOADING_TIME 뒤에 phase를 intro로 바꾼다
            }, LOADING_TIME);

            return () => {
                window.clearTimeout(loadingTimerId);
                // effect가 정리될 때 예약된 loading 타이머를 취소한다
            };
        }

        const handleLoad = () => {
            setPageLoaderPhase('intro');
            // load 이벤트가 발생하면 phase를 intro로 바꾼다
        };

        window.addEventListener('load', handleLoad);
        // 브라우저 load 이벤트를 기다린다

        return () => {
            window.removeEventListener('load', handleLoad);
            // effect가 정리될 때 등록했던 load 이벤트를 제거한다
        };
    }, [pageLoaderPhase]);
    // pageLoaderPhase 값이 바뀔 때마다 이 effect를 다시 확인한다

    useEffect(() => {
        if (pageLoaderPhase !== 'intro') return;
        // 현재 phase가 intro가 아니면 이 effect는 바로 종료한다

        const introTimerId = window.setTimeout(() => {
            setPageLoaderPhase('fadeOut');
            // INTRO_TIME 뒤에 phase를 fadeOut으로 바꾼다
        }, INTRO_TIME);

        return () => {
            window.clearTimeout(introTimerId);
            // effect가 정리될 때 예약된 intro 타이머를 취소한다
        };
    }, [pageLoaderPhase]);
    // pageLoaderPhase 값이 바뀔 때마다 이 effect를 다시 확인한다

    useEffect(() => {
        if (pageLoaderPhase !== 'fadeOut') return;
        // 현재 phase가 fadeOut이 아니면 이 effect는 바로 종료한다

        const fadeOutTimerId = window.setTimeout(() => {
            setShowPageLoader(false);
            // FADEOUT_TIME 뒤에 로더 화면을 숨긴다
        }, FADEOUT_TIME);

        return () => {
            window.clearTimeout(fadeOutTimerId);
            // effect가 정리될 때 예약된 fadeOut 타이머를 취소한다
        };
    }, [pageLoaderPhase]);
    // pageLoaderPhase 값이 바뀔 때마다 이 effect를 다시 확인한다

    return {
        showPageLoader,
        pageLoaderPhase,
    };
    // 이 hook을 호출한 컴포넌트에게 필요한 값을 객체로 반환한다
}

export default usePageLoader;
