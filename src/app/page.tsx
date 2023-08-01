"use client"

import {
    DropdownInput,
    ErrorMessage,
    Footer,
    Header,
    ModalParams,
    Output,
    PasswordInput,
    SubmitButton,
    UrlInput
} from "@/components";
import React, {useEffect} from "react";
import {useStore} from "@/store/app";
import {CLICKS_COUNT, TIMES_ALIVE} from "@/constants/options";
import isURL from "validator/es/lib/isURL";
import {useHistory} from "@/store/history";
import s from './Home.module.scss'
import {ParamsIcon} from "@/assets/Params";
import classNames from "classnames";
import Link from "next/link";
import axios from "axios";

export default function Home() {
    const {
        url,
        setUrl,
        password,
        error,
        setPassword,
        setError,
        setResult,
        timeAlive,
        setTimeAlive,
        clickCount,
        setClickCount, setLoading
    } = useStore()

    const {history, append} = useHistory()

    useEffect(() => {
        useHistory.persist.rehydrate()
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setError(null)

        if (url.trim() === "") {
            setError("Вы не ввели ссылку")
            return;
        }

        if (!isURL(url)) {
            setError("Некорректаня ссылка")
            return;
        }

        setLoading(true)

        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/short`, {
            originalUrl: url.trim(),
            password,
            clickCount,
            timeAlive
        })
            .then(response => {
                setResult(`${process.env.NEXT_PUBLIC_BASE_URL}/l/${response.data.code}`)
                append({
                    originalUrl: url,
                    shortedUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/l/${response.data.code}`,
                    date: new Date()
                })
            })
            .catch(error => {
                console.error(error)
                setError(error?.response?.data?.msg ?? "Ошибка")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <Header/>
            <main className={s.main}>
                <ModalParams/>
                <form onSubmit={handleSubmit}>
                    <div className={s.inputs}>
                        <UrlInput placeholder={"Ваша ссылка"} value={url} type={"text"}
                                  onChange={(e) => setUrl(e.target.value)}
                                  hasError={!!error}
                                  onBlur={() => setError(null)}
                        />
                        <div className={s.options}>
                            <DropdownInput
                                id={"main-timeAlive"}
                                title={"Время жизни"}
                                placeholder={"Не ограничено"}
                                disabled
                                items={TIMES_ALIVE}
                                value={timeAlive}
                                setValue={setTimeAlive}
                            />
                            <DropdownInput
                                id={"main-clickCount"}
                                title={"Переходы"}
                                placeholder={"Сколько угодно"}
                                onlyNumbers
                                items={CLICKS_COUNT}
                                value={clickCount}
                                setValue={setClickCount}
                            />
                            <PasswordInput id={"main-Password"} title={"Ссылка с паролем"} value={password}
                                           onChange={e => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className={s.buttons}>
                        <Link
                            href={{
                                query: {"window": "params"}
                            }}
                            className={classNames(s.params, {
                                [s.fill]: timeAlive || clickCount || password
                            })} type={"button"}>
                            <ParamsIcon/>
                        </Link>
                        <SubmitButton/>
                    </div>
                </form>
                <ErrorMessage/>
                <Output/>
                {/*<div className={`flex flex-col items-center`}>
                    {history.slice(history.length - 3, history.length).reverse().map(i => (
                        <p key={i.date.toString()}>{i.originalUrl} {`->`} {i.shortedUrl} | {(new Date(i.date)).toLocaleString("ru-RU")}</p>))}
                </div>*/}
            </main>
            <Footer/>
        </>
    )
}
