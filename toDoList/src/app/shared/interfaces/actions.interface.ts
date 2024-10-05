export interface IActions {
    primary: IButtonAction;
    secondary: IButtonAction;
}

interface IButtonAction {
    label: string;
    callback: () => void;
}