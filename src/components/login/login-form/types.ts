export interface LoginFormProps {
    phone: string;
    password: string;
    setPhone: (val: string) => void;
    setPassword: (val: string) => void;
    handleClick: (e: React.MouseEvent) => void;
}
