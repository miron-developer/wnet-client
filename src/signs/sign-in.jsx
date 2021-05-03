import { Library } from 'constants/language';
import { SubmitFormData, useInput, useTogglePassword } from 'functions/form';
import { UserOnline } from 'functions/user';
import { Notify } from 'common/app-notification/notification';
import Input from 'common/form-input/input';
import PasswordField from 'common/password-field/password';
import SubmitBtn from 'common/submit-btn/submit';

import Actions from 'signs/sign-other-actions/actions';
import Oauth from 'signs/oauth2/oauth';

let afterStyles = []; // form handle all ::after notifications

export default function SignIn({history}) {
    const login = useInput();
    const pass = useInput();
    const passToggle = useTogglePassword();
    const fields = [ login, pass ];

    // custom validation
    const customValidation = () => 
    (!(/[a-z]+/g.test(pass.base.value) && /[A-Z]+/g.test(pass.base.value) && /[0-9]+/g.test(pass.base.value))) ? [1] : [];

    const onSuccess = async(data) => {
        const isOnline = await UserOnline(data.id);
        if (isOnline) {
            Notify('success', Library.getText('signs.sign-in.success'));
            history.push('/');
        } else Notify('fail', Library.getText('signs.sign-in.fail'))
    }
    const onFail = (err) => Notify('fail', Library.getText('signs.sign-in.fail')+ ' ' + err);

    return (
        <>
            <form action="/sign/in" onSubmit={async(e)=> {
                afterStyles = await SubmitFormData(e, afterStyles, fields, customValidation, onSuccess, onFail);
            }}>
                <Input index="1" id="sign-in-login" name="email" type="text" base={login.base} labelText="Email:"
                    minLength="9" maxLength="30" placeholder="a@dot.com" 
                />
                <PasswordField index="2" id="sign-in-password" name="password" labelText={Library.getText('signs.sign-in.pass')}
                    placeholder="User1234" pass={pass} passToggle={passToggle} 
                />
               
                <SubmitBtn value={Library.getText('signs.sign-in.submit')} />
            </form>

            <Actions actions={[{
                'actionText': Library.getText('signs.sign-up.createAcc'),
                'linkTo'    : '/'+Library.getText('common.routes.signs.sign')+'/'+Library.getText('common.routes.signs.up'),
                'linkText'  : Library.getText('signs.sign-up.sign-up'),
            },{
                'actionText': Library.getText('signs.reset.forgot'),
                'linkTo'    : '/'+Library.getText('common.routes.signs.sign')+'/'+Library.getText('common.routes.signs.re'),
                'linkText'  : Library.getText('signs.reset.submit'),
            }]} />

            <Oauth signType="in"/>
        </>
    )
}