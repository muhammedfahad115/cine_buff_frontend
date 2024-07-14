import { createContext, useEffect, useState } from "react";

const myContext = createContext();


function Context({ children }) {
    const [activeTab, setActiveTab] = useState('');
    // useefect to get active tab based on url pathname //
    useEffect(() => {
        const storedActiveTab = localStorage.getItem('activeTab');
        if (storedActiveTab) {
            setActiveTab(storedActiveTab);
        }
    }, []);

    // useefect to store active tab based on url pathname //
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