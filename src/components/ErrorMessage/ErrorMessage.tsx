import classNames from "classnames";
import {useStore} from "@/store/app";

export function ErrorMessage() {
    const error = useStore(state => state.error)

    return <p className={classNames("mx-auto w-fit text-rose-400 transition-all", {
        "my-7": !!error
    })}>{error}</p>
}
