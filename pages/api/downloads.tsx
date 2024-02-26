import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres'

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method == "POST"){
        let data = await sql`INSERT INTO downloads (DateTime) VALUES ('2024-02-02 10:05')`
    }
    else if (req.method == "GET") {
        var data = await sql`select * from downloads`
        res.status(200).json({ message: data.rows.length.toString() })
    }
}