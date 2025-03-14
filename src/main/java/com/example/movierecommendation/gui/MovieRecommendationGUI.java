package com.example.movierecommendation.gui;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.JSONObject;

public class MovieRecommendationGUI extends JFrame {

    private static final String API_URL = "http://localhost:8080/movies/random";

    private JLabel movieLabel;

    public MovieRecommendationGUI() {
        setTitle("Movie Recommendation");
        setSize(400, 200);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new FlowLayout());

        JButton recommendButton = new JButton("Random Movie Recommendation");
        movieLabel = new JLabel("Click the button to get a movie!");

        recommendButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                fetchRandomMovie();
            }
        });

        add(recommendButton);
        add(movieLabel);
    }

    private void fetchRandomMovie() {
        try {
            URL url = new URL(API_URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");

            if (conn.getResponseCode() != 200) {
                movieLabel.setText("Unable to fetch movie.");
                return;
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                response.append(line);
            }
            br.close();

            JSONObject json = new JSONObject(response.toString());
            String title = json.getString("title");
            String genre = json.getString("genre");
            int year = json.getInt("year");

            movieLabel.setText("<html>Recommended: <b>" + title + "</b><br>Genre: " + genre + "<br>Year: " + year + "</html>");

        } catch (Exception e) {
            movieLabel.setText("Error fetching movie.");
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        MovieRecommendationGUI gui = new MovieRecommendationGUI();
        gui.setVisible(true);
    }
}