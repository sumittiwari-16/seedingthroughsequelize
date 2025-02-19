let express = require('express');
let { track } = require('./models/track.model');
let { sequelize } = require('./lib/index');
const app = express();
let port = 3000;

let movies = [
  {
    title: 'Dangal',
    director: 'Nitesh Tiwari',
    genre: 'Biography',
    release_year: 2016,
    rating: 4.8,
    actor: 'Aamir Khan',
    box_office_collection: 220,
  },
  {
    title: 'Baahubali 2: The Conclusion',
    director: 'S.S. Rajamouli',
    genre: 'Action',
    release_year: 2017,
    rating: 4.7,
    actor: 'Prabhas',
    box_office_collection: 181,
  },
  {
    title: 'PK',
    director: 'Rajkumar Hirani',
    genre: 'Comedy',
    release_year: 2014,
    rating: 4.6,
    actor: 'Aamir Khan',
    box_office_collection: 140,
  },
  {
    title: 'Bajrangi Bhaijaan',
    director: 'Kabir Khan',
    genre: 'Drama',
    release_year: 2015,
    rating: 4.5,
    actor: 'Salman Khan',
    box_office_collection: 130,
  },
  {
    title: 'Sultan',
    director: 'Ali Abbas Zafar',
    genre: 'Drama',
    release_year: 2016,
    rating: 4.3,
    actor: 'Salman Khan',
    box_office_collection: 120,
  },
  {
    title: 'Sanju',
    director: 'Rajkumar Hirani',
    genre: 'Biography',
    release_year: 2018,
    rating: 4.4,
    actor: 'Ranbir Kapoor',
    box_office_collection: 120,
  },
  {
    title: 'Padmaavat',
    director: 'Sanjay Leela Bhansali',
    genre: 'Drama',
    release_year: 2018,
    rating: 4.2,
    actor: 'Ranveer Singh',
    box_office_collection: 112,
  },
  {
    title: '3 Idiots',
    director: 'Rajkumar Hirani',
    genre: 'Comedy',
    release_year: 2009,
    rating: 4.9,
    actor: 'Aamir Khan',
    box_office_collection: 202,
  },
  {
    title: 'Chennai Express',
    director: 'Rohit Shetty',
    genre: 'Comedy',
    release_year: 2013,
    rating: 4.0,
    actor: 'Shah Rukh Khan',
    box_office_collection: 100,
  },
  {
    title: 'War',
    director: 'Siddharth Anand',
    genre: 'Action',
    release_year: 2019,
    rating: 4.3,
    actor: 'Hrithik Roshan',
    box_office_collection: 100,
  },
  {
    title: 'Kabir Singh',
    director: 'Sandeep Reddy Vanga',
    genre: 'Romance',
    release_year: 2019,
    rating: 4.2,
    actor: 'Shahid Kapoor',
    box_office_collection: 80,
  },
  {
    title: 'Gully Boy',
    director: 'Zoya Akhtar',
    genre: 'Drama',
    release_year: 2019,
    rating: 4.4,
    actor: 'Ranveer Singh',
    box_office_collection: 75,
  },
  {
    title: 'Andhadhun',
    director: 'Sriram Raghavan',
    genre: 'Thriller',
    release_year: 2018,
    rating: 4.5,
    actor: 'Ayushmann Khurrana',
    box_office_collection: 60,
  },
  {
    title: 'Tumbbad',
    director: 'Rahi Anil Barve',
    genre: 'Horror',
    release_year: 2018,
    rating: 4.3,
    actor: 'Sohum Shah',
    box_office_collection: 50,
  },
  {
    title: 'Stree',
    director: 'Amar Kaushik',
    genre: 'Comedy',
    release_year: 2018,
    rating: 4.0,
    actor: 'Rajkummar Rao',
    box_office_collection: 60,
  },
  {
    title: 'Badhaai Ho',
    director: 'Amit Sharma',
    genre: 'Comedy',
    release_year: 2018,
    rating: 4.2,
    actor: 'Ayushmann Khurrana',
    box_office_collection: 45,
  },
  {
    title: 'Article 15',
    director: 'Anubhav Sinha',
    genre: 'Drama',
    release_year: 2019,
    rating: 4.6,
    actor: 'Ayushmann Khurrana',
    box_office_collection: 35,
  },
  {
    title: 'URI: The Surgical Strike',
    director: 'Aditya Dhar',
    genre: 'Action',
    release_year: 2019,
    rating: 4.7,
    actor: 'Vicky Kaushal',
    box_office_collection: 70,
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await track.bulkCreate(movies);
    res.status(200).json({ message: 'Database seeding successfull' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error sending data', error: error.message });
  }
});

async function fetchAllTracks(){
  let tracks = await track.findAll();
  return {tracks};
}

app.get('/tracks',async(req,res)=>{
  try{
    let response = await fetchAllTracks();
    if(response.tracks.length === 0){
      res.status(404).json("No track found");
    }
    res.status(200).json(response);

  }catch (error) {
    res
      .status(500)
      .json({ message: 'Error sending data', error: error.message });
  }
})

async function fetchMovieByRating(order){
  let result = await track.findAll({order: [["rating",order]]});
  return {tracks: result};
}

app.get('/sort/byrating', async (req, res) => {
  try {
    let order = req.query.order;
    let response = await fetchMovieByRating(order);
    if (response.tracks.length === 0) {
      res.status(200).json('No movie found for this rating');
    }
    res.status(200).json(response);
  }catch(error){
    res.status(500).json({ message: 'error occurred', error: error.message });
  }
})

async function addNewMovie(newMovie1) {
  let newMovie = await track.create(newMovie1);
  return newMovie;
}

app.post("/tracks/new", async (req, res) => {
  try {
    let newMovie = req.body.newMovie;
    let response = await addNewMovie(newMovie);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error occurred", error: error.message });
  }
});

async function updatedMovie(id, updateNewMovie) {
  let updateDetails = await track.findOne({ where: { id } });
  if (!updateDetails) {
    return {};
  }
  updateDetails.set(updateNewMovie);
  let newOne = await updateDetails.save();
  return { message: "Movie updated successfully", newOne };
}

app.post("/tracks/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let updateNewMovie = req.body;
    let response = await updatedMovie(id, updateNewMovie);
    if (!response.message) {
      res.status(404).json("No movie found");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error occurred", error: error.message });
  }
});

app.listen(3000,() => {
  console.log(`server is running on port ${port}`);
});