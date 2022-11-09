import { createContext, useCallback, useContext, useState} from 'react'

const ErrorContext = createContext()

export function useContextError() {
    return useContext(ErrorContext)
}

const ErrorContextInitializer = ({ children }) => {
    const [messages, setMessages] = useState(new Set())

    const removeMessage = useCallback((msg) => {
        setMessages((currentValue) => {
           const newValue = new Set(currentValue)
           newValue.delete(msg)
           return newValue
        })
    },[])

    const addMessage = useCallback((msg) => {
        setMessages((currentValue) => {
            const newValue = new Set(currentValue)
            newValue.add(msg)
            return newValue
        })
    },[])

    return (
        <ErrorContext.Provider value={{ messages, removeMessage, addMessage }}>
            {children}
        </ErrorContext.Provider>
    )
}

export default ErrorContextInitializer

