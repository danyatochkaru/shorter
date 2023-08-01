import s from './ModalParams.module.scss'
import {DropdownInput, PasswordInput} from "@/components";
import {CLICKS_COUNT, TIMES_ALIVE} from "@/constants/options";
import React, {useEffect} from "react";
import {useStore} from "@/store/app";
import classNames from "classnames";
import {BackArrowIcon} from "@/assets/BackArrow";
import {useRouter, useSearchParams} from "next/navigation";

export function ModalParams({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
    const {
        password,
        setPassword,
        timeAlive,
        setTimeAlive,
        clickCount,
        setClickCount,
    } = useStore()

    const params = useSearchParams()
    const router = useRouter()
    const close = router.back

    useEffect(() => {
        if (params.get('window')) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [params])

    return <div className={classNames(s.overlay, className, {
        [s.show]: params.get('window') == "params"
    })} onClick={close} {...props}>
        <div className={s.content} onClick={(e) => e.stopPropagation()}>
            <div className={s.header}>
                <h2 className={s.title}>Параметры</h2>
                <button title={"Назад"} onClick={close}>
                    <span><BackArrowIcon/></span>
                    <span className={"sr-only"}>Close</span>
                </button>

            </div>
            <DropdownInput
                id={"window-timeAlive"}
                title={"Время жизни"}
                placeholder={"Не ограничено"}
                disabled
                items={TIMES_ALIVE}
                value={timeAlive}
                setValue={setTimeAlive}
                className={s.param}
            />
            <DropdownInput
                id={"window-clickCount"}
                title={"Переходы"}
                placeholder={"Сколько угодно"}
                onlyNumbers
                items={CLICKS_COUNT}
                value={clickCount}
                setValue={setClickCount}
                className={s.param}
            />
            <PasswordInput id={"window-Password"} title={"Ссылка с паролем"} value={password}
                           onChange={e => setPassword(e.target.value)}
                           className={s.param}
            />
        </div>
    </div>
}
