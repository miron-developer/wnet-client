import { useState } from 'react';

import { Library } from 'constants/language';
import { MIN_ACCESS_YEAR } from 'constants/constants';
import { SubmitFormData, useInput } from 'functions/form';
import { UserOnline } from 'functions/user';
import { Notify } from 'common/app-notification/notification';
import { ClosePopup } from 'common/popup/popup';
import Input, { Label } from 'common/form-input/input';

import styled from 'styled-components';

const SChangeProfile = styled.div`
    margin: auto;
    padding: 2rem;

    & h2 {
        text-align: center;
    }
`;

const SChangeGender = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SGenderWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`;

const SChangeWithTextarea = styled.div`
    display: flex;
    flex-direction: column;

    & textarea {
        width: 100%;
        color: #000000;
        resize: none;
        border: 1px solid var(--onHoverColor);
    }
`;

const SChangeSubmit = styled.input`
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem auto;
    padding: 1rem;
    font-size: 1rem;
    color: var(--onHoverColor);
    background: var(--purpleColor);
    border-radius: 5px;
    border: none;
    box-shadow: 2px 2px 2px 0 #00000061;
    transition: var(--transitionApp);
    cursor: pointer;

    &:hover {
        background: #40365C;
    }
`;

let afterStyles = [];

const localLib = {
    'somethingError': Library.getText('profile.change-profile.somethingError'),
    'dataChanged': Library.getText('profile.change-profile.dataChanged'),
    'changeData': Library.getText('profile.change-profile.changeData'),
    'changeWhatYouWant': Library.getText('account.settings.settings.changeWhatYouWant'),
    'genderDefault': Library.getText('profile.change-profile.genderDefault'),
    'genderMale': Library.getText('profile.change-profile.genderMale'),
    'genderFemale': Library.getText('profile.change-profile.genderFemale'),
    'nick': Library.getText('profile.data.nick'),
    'lName': Library.getText('profile.data.lName'),
    'fName': Library.getText('profile.data.fName'),
    'gender': Library.getText('profile.data.gender'),
    'dob': Library.getText('profile.data.dob'),
    'title': Library.getText('profile.data.title'),
    'aboutMe': Library.getText('profile.data.aboutMe'),
    'description': Library.getText('profile.data.description'),
    'change': Library.getText('profile.change-profile.change'),
}

export default function ChangeProfile({id, nickname, lName, fName, dob, gender, aboutMe, title, cdate, description, isUser}) {
    // user's fields
    const [newGender, setGender] = useState(gender);

    const userOrGroup = isUser ? 'user' : 'group';
    const newNick = useInput(nickname);
    const newLName = useInput(lName);
    const newFName = useInput(fName);
    const newDob = useInput(dob);
    const newAboutMe = useInput(aboutMe);
    
    // group's fields
    const newTitle = useInput(title);
    const newCDate = useInput(cdate);
    const newDescription = useInput(description);

    const fields = [newFName, newLName, newDob, newNick, newAboutMe, newTitle, newCDate, newDescription];

    const onFail = text => Notify('fail', localLib.somethingError + text); 
    const onSuccess = async() => {
        Notify('success', localLib.dataChanged);
        if (isUser) await UserOnline(id);
        ClosePopup();
    }

    return (
        <SChangeProfile>
            <h2>{localLib.changeData}</h2>
            <h3>{localLib.changeWhatYouWant}</h3>

            <form action={`/e/${userOrGroup}`} onSubmit={ e => {
                afterStyles = SubmitFormData(e, afterStyles, fields, undefined, onSuccess, onFail);
            }}>
                <input type="text" hidden name="id" value={id} />
                {
                    isUser
                    ? <>
                        <Input index="1" id="change-name-first" type="text" name="firstName" base={newFName.base} labelText={localLib.fName + ":"}
                            minLength="3" maxLength="20" placeholder="type first name"
                        />
                        <Input index="2" id="change-name-last" type="text" name="lastName" base={newLName.base} labelText={localLib.lName + ":"}
                            minLength="3" maxLength="20" placeholder="type last name"
                        />
                        <Input index="3" id="change-dob" type="date" name="dob" base={newDob.base} labelText={localLib.dob + ":"}
                            min={`${MIN_ACCESS_YEAR}-01-01`}
                        />
                        <Input index="4" id="change-nickname" type="text" name="nickname" base={newNick.base} labelText={localLib.nick + ":"}
                            minLength="3" maxLength="20" placeholder="type nickname"
                        />

                        <SChangeGender>
                            <Label labelText={localLib.gender + ":"}></Label>
                            <SGenderWrapper>
                                <label className="change-gender-label">
                                    {localLib.genderDefault}:
                                    <input type="radio" name="gender" onChange={()=>setGender("Default")} checked={newGender === "Default"} value="Default" />
                                </label>

                                <label className="change-gender-label">
                                    {localLib.genderMale}:
                                    <input type="radio" name="gender" onChange={()=>setGender("Male")} checked={newGender === "Male"} value="Male" />
                                </label>
                                
                                <label className="change-gender-label">
                                    {localLib.genderFemale}:
                                    <input type="radio" name="gender" onChange={()=>setGender("Female")} checked={newGender === "Female"} value="Female" />
                                </label>
                            </SGenderWrapper>
                        </SChangeGender>

                        <SChangeWithTextarea className="form-field-5">
                            <Label labelText={localLib.aboutMe + ":"}></Label>
                            <textarea className="form-input" cols="30" rows="10"
                                maxLength="400" minLength="10" name="aboutMe" {...newAboutMe.base}
                            ></textarea>
                            <div className="form-input-notification"></div>
                        </SChangeWithTextarea>
                    </>
                    
                    : <>
                        <Input index="5" id="change-title" type="text" name="title" base={newTitle.base} labelText={localLib.title + ":"}
                            minLength="3" maxLength="20" placeholder="type title"
                        />
                        <SChangeWithTextarea className="form-field-8">
                            <Label labelText={localLib.description + ":"}></Label>
                            <textarea className="form-input" cols="30" rows="10"
                                maxLength="400" minLength="10" name="description" {...newDescription.base}
                            ></textarea>
                            <div className="form-input-notification"></div>
                        </SChangeWithTextarea>
                    </>
                }
                <SChangeSubmit type="submit" value={localLib.change} />
            </form>
        </SChangeProfile>
    )
}