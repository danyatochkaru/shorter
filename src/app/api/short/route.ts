import {NextResponse} from "next/server";
import {customAlphabet} from "nanoid/async";
import prisma from "@/utils/prisma";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    if (!searchParams.has('code')) {
        return NextResponse.json({msg: "Не указан код"}, {status: 400})
    }

    try {
        const existingLink = await prisma.links.findUnique({
            where: {code: searchParams.get('code') as string}
        })

        if (!existingLink) {
            return NextResponse.json({msg: "Ссылка не найдена"}, {status: 404})
        }

        if (existingLink.password) {
            if (!searchParams.has('password')) {
                return NextResponse.json({msg: "Необходимо ввести пароль"}, {status: 401})
            }

            const password = searchParams.get('password')!

            if (password !== existingLink.password) {
                return NextResponse.json({msg: "Неверный пароль"}, {status: 403})
            }
        }

        if (existingLink.clickCount !== null && !existingLink.clickCount || existingLink.timeAlive && new Date(existingLink.timeAlive) < new Date()) {
            return NextResponse.json({msg: "Ссылка больше недоступна"}, {status: 410})
        }

        return NextResponse.json(existingLink)
    } catch (error) {
        console.error(error)
        return NextResponse.json({msg: "Произошла ошибка"}, {status: 500})
    }
}

export async function POST(request: Request) {
    const body = await request.json()
    if (!body.originalUrl) {
        return NextResponse.json({msg: "Отсутствует ссылка"}, {status: 400})
    }

    if (!(body.clickCount || body.timeAlive || body.password)) {
        const existingLinks = await prisma.links.findMany({
            where: {originalUrl: body.originalUrl.replace('https://', '').replace('http://', '')}
        })

        if (existingLinks.length > 0) {
            const link = existingLinks.find((l: any) =>
                (!l.password && !l.clickCount && !l.timeAlive)
            )
            if (link) {
                return NextResponse.json(link)
            }
        }
    }

    const code = await customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6)()

    const new_link = await prisma.links.create({
        data: {
            code,
            originalUrl: body.originalUrl.replace('https://', '').replace('http://', ''),
            password: body?.password || null,
            timeAlive: body?.timeAlive || null,
            clickCount: body?.clickCount || null,
        },
        select: {
            code: true
        }
    })

    return NextResponse.json(new_link)
}
