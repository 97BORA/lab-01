import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount((currentCount) => {
            if (currentCount >= 7) return 7;

            return currentCount + 1;
        });
    };

    return <div onClick={handleClick}>{count}</div>;
}

export default Counter;
