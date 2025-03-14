INSERT INTO movies (title, genre, year) VALUES
                                            ('Inception', 'Sci-Fi', 2010),
                                            ('Interstellar', 'Sci-Fi', 2014),
                                            ('The Dark Knight', 'Action', 2008),
                                            ('Pulp Fiction', 'Crime', 1994),
                                            ('Forrest Gump', 'Drama', 1994),
                                            ('The Matrix', 'Sci-Fi', 1999),
                                            ('The Godfather', 'Crime', 1972),
                                            ('Shawshank Redemption', 'Drama', 1994)
    ON CONFLICT DO NOTHING;