import s from './SubmitButton.module.scss'
import {LoadingIcon} from "@/assets/LoadingIcon";
import {useStore} from "@/store/app";

export function SubmitButton() {
    const loading = useStore(state => state.loading)
    return <button
        className={s.submit_button} disabled={loading}><LoadingIcon/><p>Сократить</p></button>
}
