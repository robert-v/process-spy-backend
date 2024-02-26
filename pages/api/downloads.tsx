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
    if (req.method == "POST"){
        let formatted = moment(new Date()).format('YYYY-MM-DD hh:mm')
        let data = await sql`INSERT INTO downloads (DateTime) VALUES (${formatted})`
        res.status(200).json({ message: data.rows.length.toString() })
    }
    else if (req.method == "GET") {
        var data = await sql`select * from downloads`
        res.status(200).json({ message: data.rows.length.toString() })
    }
}