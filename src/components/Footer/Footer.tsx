import Link from "next/link";

export function Footer() {
    return <footer className={"flex justify-center py-4"}>
        <p className={"font-light text-sm"}>&copy; <Link href={"https://piybeep.com"}
                                                         className={"hover:text-main transition-colors"}>piybeep.</Link> 2023
        </p>
    </footer>
}
