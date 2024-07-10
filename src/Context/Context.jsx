import { createContext, useState } from "react";

const myContext = createContext();

function Context({ children }) {
    const [activeTab, setActiveTab] = useState('');

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