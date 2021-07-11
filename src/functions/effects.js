// change display between none & block
export const ChangeDisplay = (className, eventType = 1) => {
    if (eventType === 1) return document.querySelector('.' + className).style.display = "block";
    return document.querySelector('.' + className).style.display = "none";
}

// change classlist: remove & add
export const AddRemoveClass = (id, className, eventType = 1) => {
    const elem = document.querySelector(id);
    if (eventType === 1) return elem.classList.add(className);
    return elem.classList.remove(className);
}

// just debounce
export function Debounce(fn, ms) {
    let timeOut;
    return (...args) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => { fn(...args) }, ms)
    }
}

/** 
 * @param   ms debounce time.
 * @returns (fn, value) => fn(value)
 */
export const DebouncedFuctionWithValue = (ms = 1000) => Debounce(
    (fn, ...values) => fn(...values),
    ms
);

// show & hide password by changing input type
export const ShowAndHidePassword = (e, passElem, passwordToggle) => {
    const elem = e.target;
    passwordToggle.toggleType();
    elem.classList.toggle('fa-eye-slash');
    if (passwordToggle.state === "password") passElem.setAttribute('type', 'text');
    else passElem.setAttribute('type', 'password');
}

/**
 * for lazy load and keeping focus with scrolling
 * @param e event
 * @param isStopLoad stop load or no
 * @param className for getting priorEdgeChild
 * @param isScrollingToTop load on scroll to top or bottom
 * @param loadCallback what do after react edge
 */
export const ScrollHandler = Debounce(async(e, isStopLoad, isScrollingToTop = false, loadCallback = async() => {}) => {
    if (isStopLoad) return;

    const parent = e.target;
    const pRec = parent.getBoundingClientRect();
    if (
        (isScrollingToTop && parent.scrollTop === 0) ||
        (!isScrollingToTop && parent.scrollTop >= Math.round((parent.scrollHeight - pRec.height) * .75))
    ) {
        const priorEdgeChildNum = isScrollingToTop ? 0 : parent.childElementCount - 1;

        if (await loadCallback()) {
            setTimeout(() => {
                // smooth scroll
                const el = parent.childNodes[priorEdgeChildNum];
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }
}, 100);

const checkPermission = async(name) => {
    if (!navigator.permissions) return false;
    const result = await navigator.permissions.query({ 'name': name });
    if (!result.state) return false;
    if (result.state === 'granted') {
        return true;
    } else if (result.state === 'prompt') {
        return true;
    }
    return false;
}

export const CheckPermissions = async(names = []) =>
    (await Promise.all(names.map(async(name) => await checkPermission(name)))).every(res => res === true);