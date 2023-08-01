"use client"

import React, {useState} from "react";
import classNames from "classnames";
import s from './PasswordInput.module.scss'
import {OpenEyeIcon} from "@/assets/OpenEye";
import {ClosedEyeIcon} from "@/assets/ClosedEye";

export function PasswordInput({title, className, id}: React.InputHTMLAttributes<HTMLInputElement> & {
    id: string
}) {
    const [showPassword, setShowPassword] = useState(false)

    return <div className={s.password_input}>
        {title && <label htmlFor={id} className={"w-fit"}>{title}</label>}
        <input type={showPassword ? "text" : "password"} id={id}
               placeholder={"Введите пароль"}
               className={classNames(className)}
        />
        <label className={s.icon}>
            <OpenEyeIcon className={classNames({
                [s.active]: showPassword
            })} onClick={() => setShowPassword(v => !v)}/>
            <ClosedEyeIcon className={classNames({
                [s.active]: !showPassword
            })} onClick={() => setShowPassword(v => !v)}/>
        </label>
    </div>
}
