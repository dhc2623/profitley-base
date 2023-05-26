import { useState, useEffect } from "react";

const useNetworkStatus = () => {
    const [status, setStatus] = useState();
    
    useEffect(() => {
        setStatus(navigator.onLine);
    }, [status]);

    useEffect(() => {
        const setOnline = () => {
            setStatus(true);
        };

        const setOffline = () => {
            setStatus(false);
        };

        window.addEventListener("online", setOnline);
        window.addEventListener("offline", setOffline);

        return () => {
            window.removeEventListener("online", setOnline);
            window.removeEventListener("offline", setOffline);
        };
    }, []);
    return status;
};

export default useNetworkStatus;