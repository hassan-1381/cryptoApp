
const BASE_URL = "https://api.coingecko.com/api/v3"
const API_KEY = "CG-SPN7AwQa8EXWqDydCy8j6UdE"



function getCoinList(pageapi, currency) {


    return `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${10}&page=${pageapi}&x_cg_demo_api_key=${API_KEY}`
}

function serchapi(value) {
    return `${BASE_URL}/search?query=${value}&x_cg_demo_api_key=${API_KEY}`
}


function marketChart(id) {
    return `${BASE_URL}/coins/bitcoin/market_chart?vs_currency=usd&days=7&x_cg_demo_api_key=${API_KEY}`
}
export { getCoinList, serchapi,marketChart  }


