import { Library } from 'constants/language';
import { SubmitFormData, useInput } from 'functions/form';
import { Notify } from 'common/app-notification/notification';
import Input from 'common/form-input/input';
import SubmitBtn from 'common/submit-btn/submit';

import Actions from 'signs/sign-other-actions/actions';

let afterStyles = []; // form handle all ::after notifications

export default function Restore({history}) {
    const email = useInput();
    const fields = [ email ];

    const onSuccess = () => {
        Notify('success', Library.getText('signs.reset.success'));
        history.push('/'+Library.getText('common.routes.signs.sign')+'/'+Library.getText('common.routes.signs.rst'));
    }
    const onFail = (err) => Notify('fail', Library.getText('signs.reset.fail') + ' ' + err);

    return (
        <>
            <form action="/sign/re" onSubmit={async(e)=> {
                afterStyles = await SubmitFormData(e, afterStyles, fields, undefined, onSuccess, onFail);
            }}>
                <Input index="1" id="reset-password-email" name="email" type="text" base={email.base} labelText="Email:"
                    minLength="9" maxLength="30" placeholder="a@dot.com"
                />
                
                <SubmitBtn value={Library.getText('signs.reset.submit')} />
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