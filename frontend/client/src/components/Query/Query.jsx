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
            <div className="mt-0">
                <UserInput onSubmit={handleSubmit} />
                <History history={history} />
            </div>
        </>
    )
}

export default Query