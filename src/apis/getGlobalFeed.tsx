import axios from "axios";
// function getGlobalFeed() {
//   let listGlobalArticles:any = [];

//   axios
//     .get("https://api.realworld.io/api/articles?limit=10&offset=0")
//     .then((response) => {
//       // handle success
//       listGlobalArticles = response.data.articles;
//     });

//   return listGlobalArticles;
// }

const getGlobalFeed = async () => {
  const response = await axios.get("https://api.realworld.io/api/articles?limit=10&offset=0");
  return response.data;
};

export default getGlobalFeed;
