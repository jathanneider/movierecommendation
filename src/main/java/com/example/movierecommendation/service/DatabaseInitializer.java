package com.example.movierecommendation.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

@Component
public class DatabaseInitializer {

    @Value("${spring.datasource.url}")
    private String databaseUrl;

    @Value("${spring.datasource.username}")
    private String databaseUsername;

    @Value("${spring.datasource.password}")
    private String databasePassword;

    public DatabaseInitializer() {}

    @PostConstruct
    public void initializeDatabase() {
        try {
            createDatabaseIfNotExists();
        } catch (Exception e) {
            System.err.println("Database Initialization Error: " + e.getMessage());
        }
    }

    private void createDatabaseIfNotExists() throws SQLException {
        String baseUrl = databaseUrl.substring(0, databaseUrl.lastIndexOf("/") + 1);
        String databaseName = "movies";

        try (Connection connection = DriverManager.getConnection(baseUrl + "postgres", databaseUsername, databasePassword);
             Statement statement = connection.createStatement()) {
            String checkDatabaseQuery = "SELECT 1 FROM pg_database WHERE datname = '" + databaseName + "'";
            boolean databaseExists = statement.executeQuery(checkDatabaseQuery).next();

            if (!databaseExists) {
                System.out.println("Creating database 'movies'...");
                statement.executeUpdate("CREATE DATABASE " + databaseName);
                System.out.println("Database 'movies' created successfully.");
            } else {
                System.out.println("Database 'movies' already exists.");
            }
        }
    }
}