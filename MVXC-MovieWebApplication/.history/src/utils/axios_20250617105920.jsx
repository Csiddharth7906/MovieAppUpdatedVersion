import axios from "axios";

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
     headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmFiZDQ4MGI0MjI1N2Y4ZWI4YjZmYjAyNmYyZGRlYSIsIm5iZiI6MTc1MDEzNzQ0OS44NDUsInN1YiI6IjY4NTBmYTY5OGUwMjhhNDFjYjA2NWMzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SGWaaRsbBLhCYn1WiiL70oCwKAwxRG52mWei7BZzsAk'
  }
})