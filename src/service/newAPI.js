

const options = {
  method: 'GET',
  headers: {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'b7824db12emsh14e94be5ae17991p1f10dajsn744d68878526',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }
};

const baseUrl = `https://bing-news-search1.p.rapidapi.com/news/`

export const fetchNewApi = async (location) => {
  const res = await fetch(`${baseUrl}search?q=${location}%Weather&freshness=Day&textFormat=Raw&safeSearch=Off`, options)
  const data = await res.json()
  return data
}
