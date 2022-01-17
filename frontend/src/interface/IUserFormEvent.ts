interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

export interface IUserFormEvent extends HTMLFormElement {
    readonly elements: FormElements
}

