CREATE TABLE IF NOT EXISTS movies (
                                      id SERIAL PRIMARY KEY,
                                      title VARCHAR(255) NOT NULL,
                                      genre VARCHAR(100) NOT NULL,
                                      year INT NOT NULL
);