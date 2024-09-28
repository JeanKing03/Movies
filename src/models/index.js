const Movie = require("./Movie");
const Actor = require("./Actor");
const Genre = require("./Genre");
const Director = require("./Director");

//* Movie <-> Actor
Movie.belongsToMany(Actor, { through: "movieActors" });
Actor.belongsToMany(Movie, { through: "movieActors" });

//* Movie <-> Director
Movie.belongsToMany(Director, { through: "movieDirectors" });
Director.belongsToMany(Movie, { through: "movieDirectors" });

//* Movie <-> Genre
Movie.belongsToMany(Genre, { through: "movieGenres" });
Genre.belongsToMany(Movie, { through: "movieGenres" });
