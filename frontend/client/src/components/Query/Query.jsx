import React, { useState, useEffect } from 'react'
import UserInput from './UserInput/UserInput';
import History from './History/History';

function Query() {
    const [history, setHistory] = useState([]);
    const handleSubmit = (input) => {
        setHistory([...history, input]);
    };

    return (
        <>
            <div className="flex flex-col justify-center mx-40">
                <p className="text-4xl font-manrope font-bold text-cyan-950">Hello, Kyle</p>
                <UserInput onSubmit={handleSubmit} />
                <History history={history} />
            </div>
        </>
    )
}

export default Query