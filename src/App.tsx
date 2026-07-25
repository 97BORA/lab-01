import SplashScreen from '@/components/SplashScreen';
import useSplashScreen from '@/hooks/useSplashScreen';
import SideMenu from '@/pages/sideMenu/sideMenu';

import './App.css';

function App() {
    const { showSplashScreen, splashScreenPhase } = useSplashScreen();

    return (
        <>
            {showSplashScreen && <SplashScreen phase={splashScreenPhase} />}

            <SideMenu />

            <div className="home">
                <section className="home-hero">
                    home-hero <br /> {document.readyState}
                </section>
                <section className="home-main">home-main</section>
                <section className="home-extra">home-extra</section>
            </div>
        </>
    );
}

export default App;
