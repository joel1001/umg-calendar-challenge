
export interface UmgFormControlProps{
    handleClick: (e: number) => void;
    inputTitle: string;
    dropdownData: any[];
    defaultValue: string | number;
    returnItem?: boolean;
}
