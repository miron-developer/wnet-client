import { useState } from "react";

import { Library } from "constants/language";
import { USER } from "constants/constants";
import { useInput, useTogglePassword } from "functions/form";
import { PreloadFile, UploadFile } from "functions/file";
import { Notify } from "common/app-notification/notification";
import Input from "common/form-input/input";
import PasswordField from "common/password-field/password";
import SubmitBtn from "common/submit-btn/submit";

import styled from "styled-components";

const SAccTypeBtn = styled.label`
    padding: 1rem;
    margin: 1rem;
    color: var(--onHoverColor);
    background: rgba(3, 0, 167, 0.2);
    border-radius: 50px;
    box-shadow: var(--boxShadow);
    transition: var(--transitionApp);
    cursor: pointer;

    &:hover {
        background: #0300A7;
    }
`;

const SAccType = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem 0;

    & span {
        color: var(--onHoverColor);
        text-transform: capitalize;
    }

    & input {
       display: none; 
    }

    & input:checked + ${SAccTypeBtn}{
        background: #0300A7;
        transition: var(--transitionApp);
    }
`;

const SUploadAvaWrapper = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
    color: var(--onHoverColor);
    cursor: pointer;

    & img {
        width: 100%;
        height: 100%;
    }
`;

const SAccTypeHint = styled.div`
    display: flex;
    flex-direction: column;
    color: red;
`;

export default function AccountSettigns({ Wrapper, saveSettings }) {
    const currentAccountSettings = {
        'email': USER.email,
        'password': "",
        'isPrivate': USER.isPrivate,
        'avatar': USER.avatar,
    }

    const email = useInput(currentAccountSettings.email);
    const pass = useInput('');
    const passToggle = useTogglePassword('');
    const passRep = useInput('');
    const passRepToggle = useTogglePassword('');
    passRep.isEqual = () => pass.base.value === passRep.base.value ? true: false;
    const [isPrivate, setPrivate] = useState(currentAccountSettings.isPrivate);

    const [avatarSrc, setAvatarSrc] = useState(currentAccountSettings.avatar);
    const [avatarFile, setAvatarFile] = useState();
    const preloadCB = (file, src) => setAvatarSrc(src) || setAvatarFile(file);

    // custom validation 
    const customValidation = () => {
        const resIndexs = [];
        if (pass.base.value !== ""){
            if (!(/[a-z]+/g.test(pass.base.value) && /[A-Z]+/g.test(pass.base.value) && /[0-9]+/g.test(pass.base.value)))
                resIndexs.push(4);
            if (!passRep.isEqual()) resIndexs.push(5);
        }
        return resIndexs;
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if (customValidation().length > 0) return Notify('fail', Library.getText('functions.form.wrongInputValidation'));
        const set = {
            'email': email.base.value,
            'password': pass.base.value,
            'avatar': avatarSrc,
            'isPrivate': isPrivate
        };
        if (!(await UploadFile('photo', avatarFile, 'user'))) return Notify('fail', Library.getText('profile-path.settings.account.canNotUploadAvatar'));
        saveSettings(set, currentAccountSettings);
    }

    return (
        <Wrapper onSubmit={onSubmit} >
            <SUploadAvaWrapper>
                <span>{Library.getText('profile-path.settings.account.avatar')}: ({Library.getText('profile-path.gallery.upload.clickToChange')})</span>
                <div className="ava-change" onClick={() => PreloadFile('image/*', preloadCB)}>
                    <img src={avatarSrc} alt="user avatar"/>
                </div>
            </SUploadAvaWrapper>

            <Input type="text" base={email.base} required={false} labelText="Email" minLength="9" maxLength="30" placeholder="a@dot.com" />
            <PasswordField id="settings-pass" labelText={Library.getText('signs.sign-in.pass')} placeholder="User1234" 
                pass={pass}    passToggle={passToggle} required={false}
            /> 
            <PasswordField id="settings-pass-rep" labelText={Library.getText('signs.sign-up.repPass')} placeholder="User1234" 
                pass={passRep} passToggle={passRepToggle} required={false}
            />

            <SAccType>
                <span >{Library.getText('common.routes.profile.settings.account')}: </span>

                <input id="settings-private"   type="radio" name="isPrivate" checked={isPrivate ? true : false} onChange={() => setPrivate(1)} />
                <SAccTypeBtn htmlFor="settings-private">{Library.getText('profile-path.settings.account.private')}</SAccTypeBtn>

                <input id="settings-unprivate" type="radio" name="isPrivate" checked={!isPrivate ? true : false} onChange={() => setPrivate(0)} />
                <SAccTypeBtn htmlFor="settings-unprivate">{Library.getText('profile-path.settings.account.public')}</SAccTypeBtn>
            </SAccType>
            <SAccTypeHint>
                <span>{Library.getText('profile-path.settings.account.privateHint')}</span>
                <span>{Library.getText('profile-path.settings.account.publicHint')}</span>
            </SAccTypeHint>

            <SubmitBtn value={Library.getText('profile-path.settings.account.change')} />
        </Wrapper>
    )
}