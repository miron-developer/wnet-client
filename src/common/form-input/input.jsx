import { Library } from 'constants/language';

import styled from 'styled-components';

const SFormField = styled.div`
    margin-bottom: .5rem;
`;

const SFormInputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: .5rem;
`;

const SFormInputLabel = styled.label`
    white-space: nowrap;
    color: var(--onHoverColor);

    &.required::after {
        content: '*';
        color: var(--redColor);
    }
`;

const SFormInput = styled.input`
    margin-left: 1rem;
    padding: .5rem;
    width: 100%;
    font-size: 1rem;
    color: var(--onHoverColor);
    background: none;
    border: none;
    border-radius: 5px;
    outline: none;
    border-bottom: 1px solid var(--onHoverColor);
    box-shadow: 4px 4px 3px 0 #00000029;

    &::placeholder{
        color: var(--offHoverColor);
    }
`;

const SFormInputNotification = styled.div`
    color: var(--darkRedColor);
`;

const localLib = {
    'from': Library.getText('search.filter.from'),
    'to': Library.getText('search.filter.to'),
    'required': Library.getText('common.form-input.required'),
    'length': Library.getText('common.form-input.length'),
    'values': Library.getText('common.form-input.values'),
}

const minmaxNotif = (notifType, min, max) => {
    if (min || max) {
        let notif = notifType + " ";
        if (min) notif += localLib.from + " " + min;
        if (max) notif += " " + localLib.to + " " + max;
        return notif;
    }
    return undefined;
}

export const Label = ({required, id, labelText}) => 
    <SFormInputLabel className={required?'required':''} htmlFor={id} > {labelText} </SFormInputLabel>

export default function Input({index, id, type = "text", name, labelText, base, minLength, maxLength, min, max, required = true, placeholder = ""}) {
    let nots = []; // notifications
    if (required) nots.push(localLib.required);
    nots.push(minmaxNotif(localLib.length, minLength, maxLength));
    nots.push(minmaxNotif(localLib.values, min, max));
    nots = nots.filter(not => not);

    return (
        <SFormField className={'form-field-'+index}>
            <SFormInputWrapper>
                <Label required={required} id={id} labelText={labelText} />
                <SFormInput 
                    className="form-input" 
                    id={id} 
                    type={type} 
                    name={name}
                    required={required} 
                    min={min} 
                    max={max} 
                    minLength={minLength} 
                    maxLength={maxLength}
                    placeholder={placeholder} 
                    {...base} 
                />
            </SFormInputWrapper>
            <SFormInputNotification className="form-input-notification">{nots.join(", ")}</SFormInputNotification>
        </SFormField>
    )
}