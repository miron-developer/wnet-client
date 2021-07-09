import { Library } from 'constants/language';
import { SubmitFormData, useInput } from 'functions/form';
import { Notify } from 'common/app-notification/notification';
import { UserOnline } from 'functions/user';
import Input from 'common/form-input/input';
import SubmitBtn from 'common/submit-btn/submit';

let afterStyles = []; // form handle all ::after notifications

const localLib = {
    'success': Library.getText('signs.sign-up.success'),
    'fail': Library.getText('signs.sign-up.fail'),
    'submit': Library.getText('signs.sign-in.submit'),
}

export default function SignSave({history}) {
    const codeFromURI = decodeURI(window.location.pathname).split("/")[3]
    const code = useInput(codeFromURI);
    const fields = [ code ];

    const onSuccess = async(data) => {
        Notify('success', localLib.success);
        await UserOnline(data.id);
        history.push('/');
    }
    const onFail = (err) => Notify('fail', localLib.fail + ':' + err);

    return (
        <>
            <form action="/sign/s/" onSubmit={async(e)=> {
                afterStyles = await SubmitFormData(e, afterStyles, fields, undefined, onSuccess, onFail);
            }}>
                <Input index="1" id="restore-password-code" name="code" type="text" base={code.base} labelText={localLib.code}
                    minLength="8" maxLength="8" placeholder="CxaUh4q"
                />

                <SubmitBtn value={localLib.submit}/>
            </form>
        </>
    )
}