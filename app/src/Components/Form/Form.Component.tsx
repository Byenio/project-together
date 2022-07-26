import React, { useContext } from 'react';
import { FieldInterfaceProps } from './Field/Form.Field.Component';
import { AuthContext } from '../../Contexts/Auth.Context';

export interface IFields {

    [key: string]: FieldInterfaceProps

}

interface FormInterface {

    action: string,
    render: () => React.ReactNode,
    fields: IFields,
    service: {
        success: string,
        error: string,
        invalid: string
    },
    method: string

}

export interface ValuesInterface {

    [key: string]: any;

}

export interface ErrorInterface {

    [key: string]: string;

}

export interface FormStateInterface {

    values: ValuesInterface,
    errors: ErrorInterface,
    submitSuccess?: boolean,

}

export interface FormContextInterface extends FormStateInterface {

    setValues: (values: ValuesInterface) => void;
    validate: (fieldName: string) => void;

}

export const FormContext = React.createContext<FormContextInterface | undefined>(undefined);

//! < Validation
export const required = (values: ValuesInterface, fieldName: string): string =>
    values[fieldName] === null ||
        values[fieldName] === ""
        ? "This must be populated"
        : "";

export const isEmail = (values: ValuesInterface, fieldName: string): string =>
    values[fieldName] &&
        values[fieldName].search(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
        ? "This must be in a valid email format"
        : "";

export const maxLength = (
    values: ValuesInterface,
    fieldName: string,
    length: number
): string =>
    values[fieldName] && values[fieldName].length > length
        ? `This can not exceed ${length} characters`
        : "";
//! Validation />

export class Form extends React.Component<FormInterface, FormStateInterface> {

    constructor(props: FormInterface) {
        super(props);

        const errors: ErrorInterface = {};
        const values: ValuesInterface = {};

        this.state = { errors, values }

    }

    private haveErrors(errors: ErrorInterface) {

        var haveError: boolean = false;
        Object.keys(errors).map((key: string) => {

            if (errors[key].length > 0) {
                haveError = true
            }

        });

        return haveError;

    }

    private handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {

        e.preventDefault();

        if (this.validateForm()) {

            const submitSuccess: boolean = await this.submitForm();
            this.setState({ submitSuccess });

        }

    }

    private validateForm(): boolean {
        return true;
    }

    private async submitForm(): Promise<boolean> {

        const auth: any = this.context;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        myHeaders.append('authorization', `Bearer ${auth.accessToken}`);
        myHeaders.append("x-refresh", `Bearer ${auth.refreshToken}`);

        try {
            const response = await fetch(this.props.action, {
                method: this.props.method,
                headers: myHeaders,
                body: JSON.stringify(this.state.values)
            });
            const data = await response.json();
            return response.ok;
        } catch (ex) {
            return false;
        }
    }

    private setValues = (values: ValuesInterface) => {
        this.setState({ values: { ...this.state.values, ...values } })
    }

    private validate = (fieldName: string): string => {
        let newError: string = "";

        if (
            this.props.fields[fieldName] &&
            this.props.fields[fieldName].validation
        ) {
            newError = this.props.fields[fieldName].validation!.rule(
                this.state.values,
                fieldName,
                this.props.fields[fieldName].validation!.args
            );
        }
        this.state.errors[fieldName] = newError;
        this.setState({
            errors: { ...this.state.errors, [fieldName]: newError }
        });
        return newError;
    };

    public render() {

        const { submitSuccess, errors } = this.state;
        const context: FormContextInterface = {
            ...this.state,
            setValues: this.setValues,
            validate: this.validate
        };

        const messages = this.props.service

        return (

            <FormContext.Provider value={context}>
                <form onSubmit={this.handleSubmit} noValidate={true}>
                    <div className="container">

                        {this.props.render()}

                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={this.haveErrors(errors)}
                            >
                                Submit
                            </button>
                        </div>

                        {submitSuccess && (
                            <div className="alert alert-info" role="alert">
                                {messages.success}
                            </div>
                        )}

                        {submitSuccess === false &&
                            !this.haveErrors(errors) && (
                                <div className="alert alert-danger" role="alert">
                                    {messages.invalid}
                                </div>
                            )}

                        {submitSuccess === false &&
                            this.haveErrors(errors) && (
                                <div className="alert alert-danger" role="alert">
                                    {messages.error}
                                </div>
                            )}

                    </div>
                </form>
            </FormContext.Provider>

        );

    }

}

Form.contextType = AuthContext;