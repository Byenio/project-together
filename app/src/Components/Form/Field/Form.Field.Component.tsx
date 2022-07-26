import React from 'react';
import { ErrorInterface, FormContextInterface, FormContext, ValuesInterface } from '../Form.Component';

type Editor = "textbox" | "textarea" | "dropdown" | "email" | "password";

export interface ValidationInterface {
  rule: (values: ValuesInterface, fieldName: string, args: any) => string;
  args?: any;
}

export interface FieldInterfaceProps {

  id: string,
  label?: string,
  editor?: Editor,
  options?: any[],
  value?: any,

  validation?: ValidationInterface

}

export const Field: React.FunctionComponent<FieldInterfaceProps> = ({
  id,
  label,
  editor,
  options,
  value
}) => {
  return (

    <FormContext.Consumer>
      {(context?: FormContextInterface) => (
        <div className="form-group">
          {label && <label htmlFor={id}>{label}</label>}

          {editor!.toLowerCase() === "textbox" && (
            <input
              id={id}
              type="text"
              value={value}
              onChange={
                (e: React.FormEvent<HTMLInputElement>) =>
                  context?.setValues({ [id]: e.currentTarget.value })
              }
              onBlur={() => context?.validate(id)}
              className="form-control"
            />
          )}

          {editor!.toLowerCase() === "email" && (
            <input
              id={id}
              type="email"
              value={value}
              onChange={
                (e: React.FormEvent<HTMLInputElement>) =>
                  context?.setValues({ [id]: e.currentTarget.value })
              }
              onBlur={() => context?.validate(id)}
              className="form-control"
            />
          )}

          {editor!.toLowerCase() === "textarea" && (
            <textarea
              id={id}
              value={value}
              onChange={
                (e: React.FormEvent<HTMLTextAreaElement>) =>
                  context?.setValues({ [id]: e.currentTarget.value })
              }
              onBlur={() => context?.validate(id)}
              className="form-control"
            />
          )}

          {editor!.toLowerCase() === "password" && (
            <input
              id={id}
              type="password"
              value={value}
              onChange={
                (e: React.FormEvent<HTMLInputElement>) =>
                  context?.setValues({ [id]: e.currentTarget.value })
              }
              onBlur={() => context?.validate(id)}
              className="form-control"
            />
          )}

          {editor!.toLowerCase() === "dropdown" && (
            <select
              id={id}
              name={id}
              onChange={
                (e: React.FormEvent<HTMLSelectElement>) =>
                  context?.setValues({ [id]: e.currentTarget.value })
              }
              onBlur={() => context?.validate(id)}
              className="form-control"
            >
              <option value="" selected disabled hidden>-</option>
              {options &&
                options.map(option => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
            </select>
          )}

        </div>
      )}
    </FormContext.Consumer>


  );
};
Field.defaultProps = {
  editor: "textbox"
};