import { useEffect, useState } from 'react';
import '../styles/Clock.css';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    
    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000)
        return()=> clearInterval(interval)
    }, [])

    return (
        <div className='current-time'>
            <div id='time'>{currentTime.toLocaleDateString}</div>

        </div>
    )
}
export default Clock