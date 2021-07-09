import { Library } from 'constants/language';
import { SubmitFormData, useInput, useTogglePassword } from 'functions/form';
import { Notify } from 'common/app-notification/notification';
import Input from 'common/form-input/input';
import PasswordField from 'common/password-field/password';
import SubmitBtn from 'common/submit-btn/submit';

import Actions from 'signs/sign-other-actions/actions';

let afterStyles = []; // form handle all ::after notifications

const localLib = {
    'success': Library.getText('signs.restore.success'),
    'sign': Library.getText('common.routes.signs.sign'),
    'fail': Library.getText('signs.restore.fail'),
    'submit': Library.getText('signs.restore.submit'),
    'remember': Library.getText('signs.sign-in.remember'),
    'in': Library.getText('common.routes.signs.in'),
    'singIn': Library.getText('signs.sign-in.sign-in'),
    'createAcc': Library.getText('signs.sign-up.createAcc'),
    'up': Library.getText('common.routes.signs.up'),
    'singUp': Library.getText('signs.sign-up.sign-up'),
    'code': Library.getText('signs.restore.code'),
    'newPass': Library.getText('signs.restore.newPass'),
}

export default function SignIn({history}) {
    const codeFromURI = decodeURI(window.location.pathname).split("/")[3]
    const code = useInput(codeFromURI);
    const pass = useInput();
    const passToggle = useTogglePassword();
    const fields = [ code, pass];

    // custom validation
    const customValidation = () => 
    (!(/[a-z]+/g.test(pass.base.value) && /[A-Z]+/g.test(pass.base.value) && /[0-9]+/g.test(pass.base.value))) ? [1] : [];

    const onSuccess = () => {
        Notify('success', localLib.success);
        history.push('/' + localLib.sign + "/" + localLib.in);
    }
    const onFail = err => Notify('fail', localLib.fail + ':' + err);

    return (
        <>
            <form action="/sign/rst/" onSubmit={async(e)=> {
                afterStyles = await SubmitFormData(e, afterStyles, fields, customValidation, onSuccess, onFail);
            }}>
                <Input index="1" id="restore-password-code" name="code" type="text" base={code.base} labelText={localLib.code}
                    minLength="8" maxLength="8" placeholder="CxaUh4q"
                />
                <PasswordField index="2" id="restore-password-password" name="password" labelText={localLib.newPass}
                    placeholder="User1234" pass={pass} passToggle={passToggle} 
                />

                <SubmitBtn value={localLib.submit}/>
            </form>

            <Actions actions={[{
                'actionText': localLib.remember,
                'linkTo'    : '/' + localLib.sign + '/' + localLib.in,
                'linkText'  : localLib.singIn,
            },{
                'actionText': localLib.createAcc,
                'linkTo'    : '/' + localLib.sign + '/' + localLib.up,
                'linkText'  : localLib.singUp,
            }]} />
        </>
    )
}