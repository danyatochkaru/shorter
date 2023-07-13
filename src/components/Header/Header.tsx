import Image from "next/image";
import s from './Header.module.scss'

export function Header() {
    return <header className={s.header}>
        <Image src={'/logo.svg'} alt={"piybeep logo"} width={39} height={37} loading={"eager"}/>
        <h1>piybeep. Сокращение ссылок</h1>
    </header>

}
