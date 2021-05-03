import { Library } from 'constants/language';
import { SubmitFormData, useInput, useTogglePassword } from 'functions/form';
import { Notify } from 'common/app-notification/notification';
import Input from 'common/form-input/input';
import PasswordField from 'common/password-field/password';
import SubmitBtn from 'common/submit-btn/submit';

import Actions from 'signs/sign-other-actions/actions';

let afterStyles = []; // form handle all ::after notifications

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
        Notify('success', Library.getText('signs.restore.success'));
        history.push('/' + Library.getText('common.routes.signs.sign') + "/" + Library.getText('common.routes.signs.in'));
    }
    const onFail = (err) => Notify('fail', Library.getText('signs.restore.fail') + ' ' + err);

    return (
        <>
            <form action="/sign/rst/" onSubmit={async(e)=> {
                afterStyles = await SubmitFormData(e, afterStyles, fields, customValidation, onSuccess, onFail);
            }}>
                <Input index="1" id="restore-password-code" name="code" type="text" base={code.base} labelText={Library.getText('signs.restore.code')}
                    minLength="8" maxLength="8" placeholder="CxaUh4q"
                />
                <PasswordField index="2" id="restore-password-password" name="password" labelText={Library.getText('signs.restore.newPass')}
                    placeholder="User1234" pass={pass} passToggle={passToggle} 
                />

                <SubmitBtn value={Library.getText('signs.restore.submit')}/>
            </form>

            <Actions actions={[{
                'actionText': Library.getText('signs.sign-in.remember'),
                'linkTo'    : '/'+Library.getText('common.routes.signs.sign')+'/'+Library.getText('common.routes.signs.in'),
                'linkText'  : Library.getText('signs.sign-in.sign-in'),
            },{
                'actionText': Library.getText('signs.sign-up.createAcc'),
                'linkTo'    : '/'+Library.getText('common.routes.signs.sign')+'/'+Library.getText('common.routes.signs.up'),
                'linkText'  : Library.getText('signs.sign-up.sign-up'),
            }]} />
        </>
    )
}