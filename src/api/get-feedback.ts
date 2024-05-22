import type { NextApiRequest, NextApiResponse } from "next"
import supabase from "@/utils/supabaseClient"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, error } = await supabase
    .from("feedback")
    .select()
    .order("created_at", { ascending: false })

  if (data) {
    res.status(200).json(data)
  }

  if (error) {
    console.log(error)
    res.status(500).end()
  }
}
