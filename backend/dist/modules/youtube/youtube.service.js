export async function getVideoLength(id) {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${apiKey}&part=contentDetails`;
        const response = await fetch(url);
        if (response) {
            const data = await response.json();
            return (data);
        }
    }
    catch (error) {
        console.error(error);
    }
}
export async function getTitleAndLanguage(id) {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${apiKey}&part=snippet`;
        const response = await fetch(url);
        if (!response.ok)
            return '';
        const data = await response.json();
        const videoInfo = data.items[0].snippet;
        if (videoInfo) {
            console.log(videoInfo);
            const title = videoInfo.title;
            const language = videoInfo.defaultLanguage;
            return { title, language };
        }
    }
    catch (error) {
        console.error(error);
    }
}
