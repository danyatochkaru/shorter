"use client"

import React, {useState} from "react";
import classNames from "classnames";
import s from './PasswordInput.module.scss'
import {OpenEyeIcon} from "@/assets/OpenEye";
import {ClosedEyeIcon} from "@/assets/ClosedEye";

export function PasswordInput({title, className, ...props}: React.InputHTMLAttributes<HTMLInputElement>) {
    const [showPassword, setShowPassword] = useState(false)

    return <div className={s.password_input}>
        {title && <label htmlFor={title} className={"w-fit"}>{title}</label>}
        <input type={showPassword ? "text" : "password"} id={title}
               placeholder={"Введите пароль"}
               className={classNames(className)}
        />
        <label htmlFor={title} className={s.icon}>
            <OpenEyeIcon className={classNames({
                [s.active]: showPassword
            })} onClick={() => setShowPassword(v => !v)}/>
            <ClosedEyeIcon className={classNames({
                [s.active]: !showPassword
            })} onClick={() => setShowPassword(v => !v)}/>
        </label>
    </div>
}
