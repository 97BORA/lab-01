import Loader from '@/features/pageLoader/Loader';
import usePageLoader from '@/features/pageLoader/usePageLoader';

function App() {
    const { showPageLoader, pageLoaderPhase } = usePageLoader();
    return (
        <>
            {showPageLoader && <Loader phase={pageLoaderPhase} />}
            <main>
                <h1>Get started</h1>
            </main>
        </>
    );
}

export default App;
