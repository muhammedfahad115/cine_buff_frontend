import { createContext, useEffect, useState } from "react";

const myContext = createContext();

function Context({ children }) {
    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
        const storedActiveTab = localStorage.getItem('activeTab');
        if (storedActiveTab) {
            setActiveTab(storedActiveTab);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [ activeTab ])

    return (
        <>
            <myContext.Provider value={{ activeTab, setActiveTab }}>
                {children}
            </myContext.Provider>
        </>
    )
}

export { myContext }
export default Context