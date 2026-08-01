// React의 useEffect 기능을 가져옴
// useEffect는 컴포넌트가 렌더링된 뒤에 특정 작업을 실행할 때 사용
import { useEffect } from 'react';

// Loader 컴포넌트에 적용할 CSS 파일을 가져옴
import './Loader.css';

// PageLoaderPhase 타입만 가져옴
// 실제 값이 아니라 'loading' | 'intro' | 'fadeOut' 같은 타입 규칙만 가져오는 것
import type { PageLoaderPhase } from '@/features/pageLoader/usePageLoader';

// Loader 컴포넌트가 받을 props 객체의 타입을 정함
type LoaderProps = {
    // phase prop은 PageLoaderPhase 타입이어야 함
    // 즉 'loading', 'intro', 'fadeOut' 중 하나만 받을 수 있음
    phase: PageLoaderPhase;
};

// Loader 컴포넌트
// 부모가 넘겨준 props 객체에서 phase 값을 꺼내서 사용함
function Loader({ phase }: LoaderProps) {
    // 컴포넌트가 화면에 렌더링된 뒤 실행되는 코드
    // 뒤의 [] 때문에 처음 렌더링된 뒤 한 번만 실행됨
    useEffect(() => {
        // index.html 쪽에서 미리 실행 중이던 initial loader 타이머를 취소함
        // window.__initialLoaderTimers가 없으면 ?. 때문에 undefined가 되고 에러 없이 지나감
        window.clearTimeout(window.__initialLoaderTimers?.[0]);

        // HTML 문서에서 id가 initial-loader인 요소를 찾음
        const initialLoader = document.getElementById('initial-loader');

        // initialLoader를 못 찾았으면 여기서 useEffect 함수 종료
        // 아래의 classList.add, remove 코드를 실행하지 않음
        if (!initialLoader) return;

        // initial-loader 요소에 initial-loader--hidden 클래스를 추가함
        // 보통 CSS에서 이 클래스로 투명해지거나 사라지는 애니메이션을 줌
        initialLoader.classList.add('initial-loader--hidden');

        // 300ms 뒤에 initial-loader 요소를 실제 DOM에서 제거하도록 예약함
        const removeTimerId = window.setTimeout(() => {
            // initialLoader 요소를 문서에서 제거함
            initialLoader.remove();
        }, 300);

        // useEffect의 cleanup 함수를 반환함
        // 컴포넌트가 사라지거나, 같은 effect가 다시 실행되기 직전에 React가 실행함
        return () => {
            // 아직 실행되지 않은 remove 타이머가 있다면 취소함
            window.clearTimeout(removeTimerId);
        };
    }, []);

    // Loader 컴포넌트가 화면에 보여줄 JSX를 반환함
    return (
        <section
            // 기본 className은 page-loader
            // phase가 'fadeOut'이면 fade-out 클래스를 추가함
            // phase가 'fadeOut'이 아니면 빈 문자열을 추가함
            className={`page-loader ${phase === 'fadeOut' ? 'fade-out' : ''}`}
        >
            {/* phase가 'loading'인지 확인함 */}
            {phase === 'loading' ? (
                // phase가 'loading'이면 점 3개짜리 로딩 UI를 반환함
                <div className="page-loader-dots">
                    {/* CSS 애니메이션용 빈 span 3개 */}
                    <span />
                    <span />
                    <span />
                </div>
            ) : (
                // phase가 'loading'이 아니면 intro 또는 fadeOut 상태
                // 이때는 본문 콘텐츠 UI를 반환함
                <div className="page-loader-content">
                    <h1>PageLoader section</h1>
                </div>
            )}
        </section>
    );
}

// 다른 파일에서 Loader를 import해서 쓸 수 있게 내보냄
export default Loader;
