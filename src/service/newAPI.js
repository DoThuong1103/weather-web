import axios from "axios";


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
  const options = {
    method: 'POST',
    url: 'https://google-api31.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '483b61715cmsh6c26c02b8800bc3p1a694ajsnd78f4fd3695a',
      'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
    },
    data: {
      text: location,
      region: 'wt-wt',
      max_results: 25
    }
  };

  try {
    const response = await axios.request(options);
    return response.data
  } catch (error) {
    console.error(error);
  }
}
