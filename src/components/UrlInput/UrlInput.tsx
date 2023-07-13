import React from "react";
import classNames from "classnames";
import s from './UrlInput.module.scss'

export function UrlInput({
                             className,
                             type = "url",
                             hasError = false,
                             ...props
                         }: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
    return <input type={type}
                  className={classNames(s.url_input, {
                      [s.error]: hasError
                  }, className)}
                  {...props}
    />
}
