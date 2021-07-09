import { useState } from "react";
import { useHistory } from "react-router";

import { Library } from "constants/language";
import { useInput } from "functions/form";
import { IsTwoDigit } from "functions/content";
import Input from "common/form-input/input";
import ChooseList from 'common/choose-list/list';
import SubmitBtn from "common/submit-btn/submit";

import FieldTextarea from 'common/header/create-a/field-textarea/textarea';

const localLib = {
    'fillTitle': Library.getText('common.header.create-a.fillTitle'),
    'fillDescription': Library.getText('common.header.create-a.fillDescription'),
    'notChoosenGroup': Library.getText('common.header.create-a.notChoosenGroup'),
    'nameTitle': Library.getText('common.event-item.event.title'),
    'datetime': Library.getText('common.event-item.event.datetime'),
    'chooseGroup': Library.getText('common.header.create-a.chooseGroup'),
    'description': Library.getText('profile.data.description'),
    'create': Library.getText('common.header.create-a.create'),
}

const customValidation = (title, description, choosenGroups = []) => {
    if (title.length <= 0) return localLib.fillTitle;
    if (description.length <= 0) return localLib.fillDescription;
    if (choosenGroups.length === 0) return localLib.notChoosenGroup;
}

const getParams = async(title, description, datetime, choosenGroups = []) => ({
    'type': 'event',
    'title': title,
    'description': description,
    'datetime': Date.parse(datetime),
    'choosenGroups': choosenGroups.map(group => group.id)
})

export default function CreateEvent({ Wrapper, onSubmit = ()=>{} }) {
    const now = new Date();
    const min = `${now.getFullYear()}-${IsTwoDigit(now.getMonth()+1)}-${IsTwoDigit(now.getDate())}`+
                'T'+
                `${IsTwoDigit(now.getHours())}:${now.getMinutes()}`;

    const title = useInput('');
    const datetime = useInput(min);
    const description = useInput('');
    const history = useHistory();
    const [choosenGroups, setChoosenGroups] = useState([]);
    
    const add = id =>  setChoosenGroups([...choosenGroups, { 'id': id }]);
    const remove = id => setChoosenGroups(choosenGroups.filter(group => group.id !== id));

    return (
        <Wrapper onSubmit={e => 
            onSubmit(
                e, history, 'event', 
                getParams(title.base.value, description.base.value, datetime.base.value, choosenGroups),
                customValidation(title.base.value, description.base.value, choosenGroups)
            )
        }>
            <Input type="text" base={title.base} labelText={localLib.nameTitle + ":"} 
                minLength="9" maxLength="30" placeholder="My journay" 
            />

            <Input type="datetime-local" base={datetime.base} labelText={localLib.datetime + ":"} min={min} />

            <ChooseList type="groups" choosenList={choosenGroups} params={{'type': 'all'}} add={add} remove={remove} 
                title={localLib.chooseGroup}
            />

            <FieldTextarea title={localLib.description} textareaBase={description.base} />

            <SubmitBtn value={localLib.create + "!"} />
        </Wrapper>
    )
}