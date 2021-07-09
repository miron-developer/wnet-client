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

const localLib = {
    'sign': Library.getText('common.routes.signs.sign'),
    'fail': Library.getText('signs.sign-up.fail'),
    'submit': Library.getText('signs.sign-in.submit'),
    'pass': Library.getText('signs.sign-in.pass'),
    'forgot': Library.getText('signs.reset.forgot'),
    're': Library.getText('common.routes.signs.re'),
    'reSubmit': Library.getText('signs.reset.submit'),
    's': Library.getText('common.routes.signs.s'),
    'verificationMsg': Library.getText('signs.sign-up.verificationMsg'),
    'fName': Library.getText('profile.data.fName'),
    'lName': Library.getText('profile.data.lName'),
    'dob': Library.getText('profile.data.dob'),
    'repPass': Library.getText('signs.sign-up.repPass'),
    'haveAcc': Library.getText('signs.sign-in.haveAcc'),
    'in': Library.getText('common.routes.signs.in'),
    'singIn': Library.getText('signs.sign-in.sign-in'),
}

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
        Notify('success', localLib.verificationMsg)
        history.push('/'+ localLib.sign + '/' + localLib.s);
    }
    const onFail = (err) => Notify('fail', localLib.fail + ':' + err);

    return (
        <>
            <form action="/sign/up" onSubmit={async(e) => {
                afterStyles = await SubmitFormData(e, afterStyles, fields, customValidation, onSuccess, onFail);
            }}>
                <Input index="1" id="sign-up-name-first" type="text" name="firstName" base={fName.base} labelText={localLib.fName+":"}
                    minLength="3" maxLength="20" placeholder="Miron"
                />
                <Input index="2" id="sign-up-name-last" type="text" name="lastName" base={lName.base} labelText={localLib.lName+":"}
                    minLength="3" maxLength="20" placeholder="Arystan"
                />
                <Input index="3" id="sign-up-dob" type="date" name="dob" base={dob.base} labelText={localLib.dob+":"}
                    min={`${MIN_ACCESS_YEAR}-01-01`}
                />
                <Input index="4" id="sign-up-email" type="email" name="email" base={email.base} labelText="Email:"
                    minLength="9" maxLength="30" placeholder="a@dot.com"
                />
                <PasswordField index="5" id="sign-up-password"   name="pass" labelText={localLib.pass}
                    placeholder="User1234" pass={pass} passToggle={passToggle} 
                />
                <PasswordField index="6" id="sign-up-password-repeat" labelText={localLib.repPass}
                    placeholder="User1234" pass={passRep} passToggle={passRepToggle} 
                />
                
                <SubmitBtn value={localLib.submit} />
            </form>

            <Actions actions={[{
                'actionText': localLib.haveAcc,
                'linkTo'    : '/' + localLib.sign + '/' + localLib.in,
                'linkText'  : localLib.singIn,
            },{
                'actionText': localLib.forgot,
                'linkTo'    : '/' + localLib.sign + '/' + localLib.re,
                'linkText'  : localLib.reSubmit,
            }]} />

            <Oauth signType="up" />
        </>
    )
}
