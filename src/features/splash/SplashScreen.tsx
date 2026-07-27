import type { SplashScreenPhase } from '@/features/splash/useSplashScreen';
// SplashScreenPhase 타입만 가져온다. / 실제 값을 가져오는 것이 아니다.

type SplashScreenProps = {
    phase: SplashScreenPhase;
};

// SplashScreen 컴포넌트가 받을 props의 타입을 정한다.
// phase라는 props가 있어야 하고, 그 값은 'loading', 'intro', 'fadeOut' 중 하나여야 한다.

function SplashScreen({ phase }: SplashScreenProps) {
    // SplashScreen 함수는 phase라는 값을 받을 준비를 한다.
    // 실제 phase 값은 누군가 SplashScreen을 사용할 때 들어온다.
    return <div>{phase}</div>;
}

export default SplashScreen;
