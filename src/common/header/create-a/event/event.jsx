import { useState } from "react";
import { withRouter } from "react-router";

import { Library } from "constants/language";
import { useInput } from "functions/form";
import { IsTwoDigit } from "functions/content";
import Input from "common/form-input/input";
import ChooseList from 'common/choose-list/list';
import SubmitBtn from "common/submit-btn/submit";

import FieldTextarea from 'common/header/create-a/field-textarea/textarea';
import styled from "styled-components";

const SNoteText = styled.div`
    position: fixed;
    right: 12vw;
    top: 50%;
    color: var(--onHoverColor);
    background: red;
    padding: .5rem;
    border-radius: 5px;
`;

const customValidation = (title, description, choosenGroups = []) => {
    if (title.length <= 0) return Library.getText('common.header.create-a.event.fillTitle');
    if (description.length <= 0) return Library.getText('common.header.create-a.event.fillDescription');
    if (choosenGroups.length === 0) return "choose atleast 1 group";
}

const getParams = async(title, description, datetime, choosenGroups = []) => ({
    'type': 'event',
    'title': title,
    'description': description,
    'datetime': Date.parse(datetime),
    'choosenGroups': choosenGroups.map(group => group.id)
})

const CreateEvent = ({ Wrapper, history, onSubmit = ()=>{} }) => {
    const now = new Date();
    const min = `${now.getFullYear()}-${IsTwoDigit(now.getMonth()+1)}-${IsTwoDigit(now.getDate())}`+
                'T'+
                `${IsTwoDigit(now.getHours())}:${now.getMinutes()}`;

    const title = useInput('');
    const datetime = useInput(min);
    const description = useInput('');
    const [choosenGroups, setChoosenGroups] = useState([]);
    const [noteText, setText] = useState('');

    const add = id =>  setChoosenGroups([...choosenGroups, { 'id': id }]);
    const remove = id => setChoosenGroups(choosenGroups.filter(group => group.id !== id));

    return (
        <Wrapper onSubmit={e => 
            onSubmit(
                e, history, 'event', 
                getParams(title.base.value, description.base.value, datetime.base.value, choosenGroups),
                customValidation(title.base.value, description.base.value, choosenGroups),
                setText
            )
        }>
            { noteText.length === 0 ? null : <SNoteText>{noteText}</SNoteText> }

            <Input type="text" base={title.base} labelText={Library.getText('common.event-item.event.title') + ":"} 
                minLength="9" maxLength="30" placeholder="My journay" 
            />

            <Input type="datetime-local" base={datetime.base} labelText={Library.getText('common.event-item.event.datetime') + ":"} min={min} />

            <ChooseList type="groups" choosenList={choosenGroups} params={{'type': 'all'}} add={add} remove={remove} 
                title="Choose groups where you publish event:"
            />

            <FieldTextarea title={Library.getText('profile.data.description')} textareaBase={description.base} />

            <SubmitBtn value={Library.getText('common.header.create-a.create') + "!"} />
        </Wrapper>
    )
}

export default withRouter(CreateEvent);