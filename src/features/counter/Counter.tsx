import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount((currentCount) => {
            if (currentCount >= 7) return 7;

            return currentCount + 1;
        });
    };

    const handleResetClick = () => {
        setCount(0);
    };

    return (
        <div>
            <button type="button" onClick={handleResetClick}>
                Reset
            </button>

            <div onClick={handleClick}>{count}</div>
        </div>
    );
}

export default Counter;
