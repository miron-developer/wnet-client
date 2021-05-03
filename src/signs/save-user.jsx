import { Library } from 'constants/language';
import { SubmitFormData, useInput } from 'functions/form';
import { Notify } from 'common/app-notification/notification';
import { UserOnline } from 'functions/user';
import Input from 'common/form-input/input';
import SubmitBtn from 'common/submit-btn/submit';

let afterStyles = []; // form handle all ::after notifications

export default function SignSave({history}) {
    const codeFromURI = decodeURI(window.location.pathname).split("/")[3]
    const code = useInput(codeFromURI);
    const fields = [ code ];

    const onSuccess = async(data) => {
        Notify('success', 'Profile is created!');
        await UserOnline(data.id);
        history.push('/');
    }
    const onFail = (err) => Notify('fail', err);

    return (
        <>
            <form action="/sign/s/" onSubmit={async(e)=> {
                afterStyles = await SubmitFormData(e, afterStyles, fields, undefined, onSuccess, onFail);
            }}>
                <Input index="1" id="restore-password-code" name="code" type="text" base={code.base} labelText={Library.getText('signs.restore.code')}
                    minLength="8" maxLength="8" placeholder="CxaUh4q"
                />

                <SubmitBtn value={Library.getText('signs.sign-in.submit')}/>
            </form>
        </>
    )
}