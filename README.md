Program creates an API that allows requests for a Random Movie Recommendation with a simple GUI to interact with it.

Requirements:
PostgreSQL 14 or later
Java JDK 21+
Gradle (included via the gradlew wrapper, so no separate installation is required)


Before running the program start PostgreSQL.

After cloning repo:
Open 2 Terminal (or Windows Command Line) windows and navigate to the project folder.

In the first window run:
./gradlew cleanbuild
./gradlew bootRun

After the server is running, in the second window run:
./gradlew runGUI

A GUI should appear where you can get your movie recommendation.

Program should automatically create and fill the database, but if for some reason it doesn't, manually create a table called "movies" in PostgreSQL using this as a 
template and then try to run the program again.
                     
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    year INT NOT NULL

If you dont want to fool around with the GUI you can paste this into your web browser after the server is running and it will show you the raw data for the movie recommendation:
http://localhost:8080/movies/random
















