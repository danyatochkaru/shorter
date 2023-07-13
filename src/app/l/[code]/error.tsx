'use client'

export default function ErrorPage({error, reset: _}: { error: Error, reset: () => void }) {
    console.error(error)
    return <main className={"flex flex-col gap-y-4 items-center pt-10"}>
        <h2 className={"font-medium text-lg"}>Произошла ошибка</h2>
        <p className={"px-1.5 py-0.5 rounded-md bg-zinc-800"}>{error.message}</p>
    </main>
}
