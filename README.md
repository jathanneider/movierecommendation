# PROJECT UPDATE: Movie Recommendation App v2

Program will now generate a webpage that will recommend a random movie, upon finding a movie that sounds interesting to you the website allows users
to generate and download a movie ticket .png file to send to a date, group of friends, family, etf. to invite them to a movie night.

# RUN INSTRUCTIONS FOR Movie Recommendation App v2:

## Requirements:
- PostgreSQL 14 or later
- Java JDK 21+
- Gradle (included via the gradlew wrapper, so no separate installation is required)

# Before running the program start PostgreSQL.

After cloning repo Open Terminal (or Windows Command Line) and navigate to the project folder.

## Run:
./gradlew cleanbuild

./gradlew bootRun

Program should automatically open a web browser window (not sure if this works on Windows or Linux), but if for some reason it doesn't do that you can manually visit http://localhost:8080/index.html to view the webpage.

## See Database Note Below if you have issues with PostgreSQL

# RUN INSTRUCTIONS FOR Movie Recommendation App v1:

Program creates an API that allows requests for a Random Movie Recommendation with a simple GUI to interact with it.

## Requirements:
- PostgreSQL 14 or later
- Java JDK 21+
- Gradle (included via the gradlew wrapper, so no separate installation is required)


# Before running the program start PostgreSQL.

After cloning repo Open 2 Terminal (or Windows Command Line) windows and navigate to the project folder.

## In the first window run:
./gradlew cleanbuild

./gradlew bootRun

## After the server is running, in the second window run:
./gradlew runGUI

-- A GUI should appear where you can get your movie recommendation.

# Database Note

## If you set up custom login information outside of PostgreSQL's default:

Go to DatabaseInitializer.java and update these values to your username and password:

`  

    @Value("${spring.datasource.username}")
    private String databaseUsername;

    @Value("${spring.datasource.password}")
    private String databasePassword;



## Program should automatically create and fill the database, but if for some reason it doesn't, manually create a table called "movies" in PostgreSQL using this as a template and then try to run the program again.
`                     

    CREATE TABLE movies (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    year INT NOT NULL 
    )

# NO GUI
If you dont want to fool around with the GUI you can paste this into your web browser after the server is running and it will show you the raw data for the movie recommendation:

http://localhost:8080/movies/random
















