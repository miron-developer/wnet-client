import { Library } from 'constants/language';
import { SubmitFormData, useInput } from 'functions/form';
import { Notify } from 'common/app-notification/notification';
import Input from 'common/form-input/input';
import SubmitBtn from 'common/submit-btn/submit';

import Actions from 'signs/sign-other-actions/actions';

let afterStyles = []; // form handle all ::after notifications

const localLib = {
    'success': Library.getText('signs.reset.success'),
    'sign': Library.getText('common.routes.signs.sign'),
    'rst': Library.getText('common.routes.signs.rst'),
    'fail': Library.getText('signs.reset.fail'),
    'submit': Library.getText('signs.reset.submit'),
    'remember': Library.getText('signs.sign-in.remember'),
    'in': Library.getText('common.routes.signs.in'),
    'singIn': Library.getText('signs.sign-in.sign-in'),
    'createAcc': Library.getText('signs.sign-up.createAcc'),
    'up': Library.getText('common.routes.signs.up'),
    'singUp': Library.getText('signs.sign-up.sign-up'),
}

export default function Restore({history}) {
    const email = useInput();
    const fields = [ email ];

    const onSuccess = () => {
        Notify('success', localLib.success);
        history.push('/'+ localLib.sign + '/' + localLib.rst);
    }
    const onFail = err => Notify('fail', localLib.fail + ':' + err);

    return (
        <>
            <form action="/sign/re" onSubmit={async(e)=> {
                afterStyles = await SubmitFormData(e, afterStyles, fields, undefined, onSuccess, onFail);
            }}>
                <Input index="1" id="reset-password-email" name="email" type="text" base={email.base} labelText="Email:"
                    minLength="9" maxLength="30" placeholder="a@dot.com"
                />
                
                <SubmitBtn value={localLib.submit} />
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