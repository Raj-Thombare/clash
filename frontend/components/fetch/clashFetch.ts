import { CLASH_URL } from "@/lib/apiEndPoints"

export async function fetchClashes(token: string) {
    let data = await fetch(CLASH_URL, {
        headers: {
            Authorization: token
        },
        next: {
            revalidate: 60 * 60,
            tags: ["dashboard"]
        }
    })
    let posts = await data.json();

    if (!posts) return []

    return posts.data;
}  