import React, {useState} from "react";
import classNames from "classnames";

import s from './DropdownInput.module.scss'
import {FlatArrowIcon} from "@/assets/FlatArrowIcon";

export type DropdownItems = { value?: string | "off", title: string }

export function DropdownInput({
                                  className,
                                  disabled,
                                  title,
                                  items,
                                  onlyNumbers = false,
                                  value,
                                  setValue,
                                  ...props
                              }: React.InputHTMLAttributes<HTMLInputElement> & {
    items: DropdownItems[]
    onlyNumbers?: boolean,
    setValue: (value: any) => void,
}) {
    const [isShow, setIsShow] = useState(false)

    return <div className={s.dropdown_menu}>
        {title && <label htmlFor={title} className={"w-fit"}>{title}</label>}
        <input onFocus={() => setIsShow(true)} onBlur={() => setIsShow(false)} id={title} autoComplete={"none"}
               className={classNames({
                   [s.off]: value === ""
               }, className)}
               type={disabled ? "button" : "text"}
               value={items.find((i) => i.value === value)?.title ?? value}
               onChange={e => {
                   setValue(onlyNumbers ? e.target.value.match(/\d+/g)?.join("") ?? "" : e.target.value)
               }}
               {...props}
        />
        <label htmlFor={title} className={s.icon}><FlatArrowIcon/></label>
        <div
            className={classNames(s.list, {
                "visible opacity-100": isShow,
                "invisible opacity-0": !isShow,
            })}>
            {items?.map((item) => (
                <p
                    key={item.value}
                    className={classNames({
                        [s.selected]: items.find(i => i.value === value)?.title === item.title
                    })}
                    onClick={() => setValue(item.value ?? "")}>{item.title}
                </p>
            ))}
        </div>
    </div>
}
