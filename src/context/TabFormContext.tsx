import { createContext, useContext, useState, type ReactNode } from "react";

interface IFormData {
    name: string;
    age: string;
    email: string;
    interests: string[];
    theme: string;
}

interface ITabFormContext {
    formData: IFormData
    setFormData: React.Dispatch<React.SetStateAction<IFormData>>
    error: Record<string,string | undefined>;
    setError: React.Dispatch<React.SetStateAction<Record<string,string | undefined>>>
}

interface ITabFormProvider {
    children: ReactNode
}

const TabFormContext = createContext<ITabFormContext | undefined>(undefined);

export const TabFormProvider = ({ children }: ITabFormProvider) => {
    const [formData, setFormData] = useState<IFormData>({
        name: "",
        age: "",
        email: "",
        interests: [],
        theme: ""
    });
    const [error,setError] = useState<Record<string ,string | undefined>>({});
    return <TabFormContext.Provider value={{ formData, setFormData,error,setError }}>{children}</TabFormContext.Provider>
}

export const useTabForm = () => {
    const context = useContext(TabFormContext);
    if (!context) {
        throw new Error("useTabForm must be used within TabFormProvider")
    }
    return context
}