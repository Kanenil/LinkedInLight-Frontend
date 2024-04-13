import {createContext, useContext, useState} from "react";

export const AlertContext = createContext({});

const AlertProvider = ({children}) => {
    const [alerts, setAlerts] = useState([]);

    const setupAlter = (alert, timeout) => {
        const {id} = alert;

        setAlerts(prev => [
            ...prev,
            alert
        ])

        setTimeout(() => {
            setAlerts(prev => [
                ...prev.filter(v => v.id !== id)
            ])
        }, timeout * 1000)
    }

    return (
        <AlertContext.Provider
            value={{
                success: (text, timeout = 1) => {
                    const alert = {
                        id: crypto.randomUUID(),
                        message: text,
                        status: 'success'
                    };

                    setupAlter(alert, timeout);
                },
                error: (text, timeout = 1) => {
                    const alert = {
                        id: crypto.randomUUID(),
                        message: text,
                        status: 'error'
                    };

                    setupAlter(alert, timeout);
                },
                clear: (id) => {
                    setAlerts(prev => [
                        ...prev.filter(v => v.id !== id)
                    ])
                },
                alerts
            }}
        >
            {children}
        </AlertContext.Provider>
    )
}

export const useAlertContext = () => useContext(AlertContext);

export default AlertProvider;
