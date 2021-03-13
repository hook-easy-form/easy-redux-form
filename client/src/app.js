import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';

import { test, test2 } from '../../lib';

function App(props) {
    const [counter, setCounter] = useState(0)

    return (
        <>
            <div>
                {counter}

                <div>
                    {test(10, counter)}
                </div>
                <div>
                    {test2(10, counter)}
                </div>
            </div>
            <button onClick={() => setCounter(counter + 1)}>Testing</button>
        </>
    );
}

export default hot(App);