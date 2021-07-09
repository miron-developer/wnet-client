import { useHistory } from "react-router";

import { Library } from "constants/language";
import { USER } from "constants/constants";
import { SubmitFormData, useInput } from "functions/form";
import { UserOnline } from "functions/user";
import { Notify } from "common/app-notification/notification";
import Input from "common/form-input/input";
import SubmitBtn from "common/submit-btn/submit";

import styled from "styled-components";

let afterStyles

const SSettingsBody = styled.div`
    padding: 1rem;
    margin: 1rem;
    border-radius: 5px;
    background: rgba(0, 26, 75, 0.16);
`;

const STitle = styled.h2`
    color: var(--onHoverColor);
    text-align: center;
    text-transform: uppercase;
`;


export default function ConfirmChange() {
    const codeFromURI = decodeURI(window.location.pathname).split("/")[4]
    const code = useInput(codeFromURI);
    const fields = [ code ];
    const history = useHistory();

    const onSuccess = async() => {
        Notify('success', 'Profile is changed!');
        await UserOnline(USER.id);
        history.push('/');
    }
    const onFail = (err) => Notify('fail', err);

    return (
        <SSettingsBody>
            <STitle>{Library.getText('account.settings.confirm.confirmChange')}</STitle>

            <form action="/e/settings/c" onSubmit={async(e)=> {
                afterStyles = await SubmitFormData(e, afterStyles, fields, undefined, onSuccess, onFail);
            }}>
                <Input index="1" id="confirm-settings-code" name="code" type="text" base={code.base} labelText={Library.getText('signs.restore.code')}
                    minLength="8" maxLength="8" placeholder="CxaUh4q"
                />

                <SubmitBtn value={Library.getText('signs.sign-in.submit')}/>
            </form>
        </SSettingsBody>
    )
}