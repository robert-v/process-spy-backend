import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres'
import moment from "moment";

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    if (req.method == "POST"){
        let formatted = moment(new Date()).format('YYYY-MM-DD HH:mm')
        let data = await sql`INSERT INTO downloads (DateTime) VALUES (${formatted})`
        res.status(200).json({ message: data.rows.length.toString() })
    }
    else if (req.method == "GET") {
        var data = await sql`select * from downloads`
        res.status(200).json({ message: data.rows.length.toString() })
    }
}