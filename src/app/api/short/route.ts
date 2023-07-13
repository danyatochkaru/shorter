import {NextResponse} from "next/server";
import {customAlphabet} from "nanoid/async";

const DB = [
    {id: "1", code: "test", originalUrl: "piybeep.com", password: null, timeAlive: null, clickCount: null}
]

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    if (!searchParams.has('code')) {
        return NextResponse.json({msg: "Не указан код"}, {status: 400})
    }

    const entity = DB.find(i => i.code == searchParams.get('code'))

    if (!entity) {
        return NextResponse.json({msg: "Ссылка не найдена"}, {status: 404})
    }

    if (entity.password) {
        if (!searchParams.has('password')) {
            return NextResponse.json({msg: "Необходимо ввести пароль"}, {status: 401})
        }

        const password = searchParams.get('password')!

        if (password !== entity.password) {
            return NextResponse.json({msg: "Неверный пароль"}, {status: 403})
        }
    }

    if (entity.clickCount !== null && !entity.clickCount || entity.timeAlive && new Date(entity.timeAlive) < new Date()) {
        return NextResponse.json({msg: "Ссылка больше недоступна"}, {status: 410})
    }

    return NextResponse.json(entity)

}

export async function POST(request: Request) {
    const body = await request.json()
    if (!body.originalUrl) {
        return NextResponse.json({msg: "Отсутствует ссылка"}, {status: 400})
    }

    if (!(body.clickCount || body.timeAlive || body.password)) {
        const attempt = DB.find(i => i.originalUrl == body.originalUrl)

        if (attempt) {
            if (!attempt.password && !attempt.clickCount && !attempt.timeAlive) {
                return NextResponse.json(attempt)
            }
        }
    }

    const code = await customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6)()

    const new_entity = {
        id: String(DB.length + 1),
        code, originalUrl: body.originalUrl,
        password: body?.password || null,
        timeAlive: body?.timeAlive || null,
        clickCount: body?.clickCount || null,
    };

    DB.push(new_entity)

    return NextResponse.json(new_entity)
}
