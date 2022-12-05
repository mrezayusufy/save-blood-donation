import axios from 'axios';
export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:3333"
  }${path}`;
}


const http = axios.create({
  baseURL: getStrapiURL()+"/api",
  headers: {
    "Content-Type": "application/json"
  }
})
export default http;
