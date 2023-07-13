import s from './Output.module.scss'
import {CopyIcon} from "@/assets/Copy";
import {LoadingIcon} from "@/assets/LoadingIcon";
import {useStore} from "@/store/app";
import toast from "react-hot-toast";

export function Output() {
    const result = useStore(state => state.result)
    const isLoading = useStore(state => state.loading)

    return <div className={s.output}>
        {
            isLoading ? (
                <div className={s.loading}>
                    <LoadingIcon/>
                    <p>Сокращаем...</p>
                </div>
            ) : (result && <>
                <p className={s.link}
                   onClick={(e) => {
                       toast.success("Скопировано")
                       // navigator.clipboard?.writeText(result)
                       //     .then(() => toast.success("Скопировано"))
                       //     .catch((error) => {
                       //         console.error(error)
                       //         toast.error("Произошла ошибка")
                       //     })
                   }}>
                    <span>{result}</span> <CopyIcon/></p>
                <p className={"text-center"}>Ваша ссылка готова! Нажмите на неё, чтобы скопировать</p>
            </>)
        }
    </div>
}
