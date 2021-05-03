import { MIN_ACCESS_YEAR } from 'constants/constants';
import { Library } from 'constants/language';
import { SubmitFormData, useInput, useTogglePassword} from 'functions/form';
import { Notify } from 'common/app-notification/notification';
import Input from 'common/form-input/input';
import PasswordField from 'common/password-field/password';
import SubmitBtn from 'common/submit-btn/submit';

import Oauth from 'signs/oauth2/oauth';
import Actions from 'signs/sign-other-actions/actions';

let afterStyles = []; // form handle all ::after notifications

export default function SignUp({history}) {
    const fName = useInput('');
    const lName = useInput('');
    const dob = useInput('');
    const email = useInput('');
    const pass = useInput('');
    const passToggle = useTogglePassword();
    const passRep = useInput('');
    const passRepToggle = useTogglePassword();
    passRep.isEqual = () => pass.base.value === passRep.base.value ? true: false;

    const fields = [ fName, lName, dob, email, pass, passRep ]; // fields for reset
    
    // custom validation 
    const customValidation = () => {
        const resIndexs = [];
        if (!(/[a-z]+/g.test(pass.base.value) && /[A-Z]+/g.test(pass.base.value) && /[0-9]+/g.test(pass.base.value)))
            resIndexs.push(4);
        if (!passRep.isEqual())
            resIndexs.push(5);
        return resIndexs;
    }

    const onSuccess = () => {
        Notify('success', 'Verification msg sended to your email. Check it')
        history.push('/'+Library.getText('common.routes.signs.sign')+'/'+Library.getText('common.routes.signs.s'));
    }
    const onFail = (err) => Notify('fail', 'Profile is not created! ' + err);

    return (
        <>
            <form action="/sign/up" onSubmit={async(e) => {
                afterStyles = await SubmitFormData(e, afterStyles, fields, customValidation, onSuccess, onFail);
            }}>
                <Input index="1" id="sign-up-name-first" type="text" name="firstName" base={fName.base} labelText={Library.getText('profile.data.fName')+":"}
                    minLength="3" maxLength="20" placeholder="Miron"
                />
                <Input index="2" id="sign-up-name-last" type="text" name="lastName" base={lName.base} labelText={Library.getText('profile.data.lName')+":"}
                    minLength="3" maxLength="20" placeholder="Arystan"
                />
                <Input index="3" id="sign-up-dob" type="date" name="dob" base={dob.base} labelText={Library.getText('profile.data.dob')+":"}
                    min={`${MIN_ACCESS_YEAR}-01-01`}
                />
                <Input index="4" id="sign-up-email" type="email" name="email" base={email.base} labelText="Email:"
                    minLength="9" maxLength="30" placeholder="a@dot.com"
                />
                <PasswordField index="5" id="sign-up-password"   name="pass" labelText={Library.getText('signs.sign-in.pass')}
                    placeholder="User1234" pass={pass} passToggle={passToggle} 
                />
                <PasswordField index="6" id="sign-up-password-repeat" labelText={Library.getText('signs.sign-up.repPass')}
                    placeholder="User1234" pass={passRep} passToggle={passRepToggle} 
                />
                
                <SubmitBtn value={Library.getText('signs.sign-in.submit')} />
            </form>

            <Actions actions={[{
                'actionText': Library.getText('signs.sign-in.haveAcc'),
                'linkTo'    : '/'+Library.getText('common.routes.signs.sign')+'/'+Library.getText('common.routes.signs.in'),
                'linkText'  : Library.getText('signs.sign-in.sign-in'),
            },{
                'actionText': Library.getText('signs.reset.forgot'),
                'linkTo'    : '/'+Library.getText('common.routes.signs.sign')+'/'+Library.getText('common.routes.signs.re'),
                'linkText'  : Library.getText('signs.reset.submit'),
            }]} />

            <Oauth signType="up" />
        </>
    )
}
