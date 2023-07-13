import axios from "axios";
import Link from "next/link";
import {redirect} from "next/navigation";

export default async function RedirectPage({params}: {
    params: Record<string, string>
}) {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/short?code=${params?.code}`, {
        validateStatus: (status) => status < 500
    })

    if (response.status === 200) {
        redirect((response?.data?.originalUrl as string).startsWith("http") ? response?.data?.originalUrl : `http://${response?.data?.originalUrl}`)
    }

    return <main className={"flex flex-col gap-y-4 items-center pt-10"}>
        {
            response.status >= 400 && <>
                <h2 className={"font-medium text-lg"}>Произошла ошибка</h2>
                <p className={"px-1.5 py-0.5 rounded-md bg-zinc-800"}>{response.data?.msg || "Неизвестная ошибка"}</p>
            </>
        }
        {
            response.status === 200 && <>
                <h2 className={"font-medium text-lg"}>Перенаправление...</h2>
                <p className={"px-1.5 py-0.5 rounded-md bg-zinc-800"}>Если ничего не происходит, <Link
                    className={"underline hover:text-main transition-colors"}
                    href={(response?.data?.originalUrl as string).startsWith("http") ? response?.data?.originalUrl : `http://${response?.data?.originalUrl}`}>нажмите
                    сюда</Link></p>
            </>
        }
    </main>
}
