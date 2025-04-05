import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import confetti from "canvas-confetti";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { Link } from "react-router-dom";

// API
const API_URL = "http://localhost:8080/movies/random";

// Animation
const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(135deg, #1a1a1a, #121212);
    color: white;
    min-height: 100vh;
    font-family: "Poppins", sans-serif;
`;

const Header = styled.h1`
    font-family: 'Cinzel Decorative', cursive;
    font-size: 2.8rem;
    color: #ffcc00;
    margin: 20px 0 10px;
    text-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
`;

const Button = styled.button`
    background: #ffcc00;
    color: #000;
    font-size: 1.2rem;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
    transition: all 0.3s ease;
    &:hover {
        background: #ffdd44;
        transform: scale(1.1);
    }
`;

const StyledLabel = styled.p`
    font-size: 1.1rem;
    color: #ffcc00;
    font-family: 'Cinzel', serif;
    margin-top: 25px;
    margin-bottom: 8px;
    text-shadow: 0 0 4px rgba(255, 204, 0, 0.3);
`;

const InputRow = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
`;

const Select = styled.select`
    padding: 8px;
    font-size: 1rem;
    border-radius: 4px;
    border: none;
`;

const Input = styled.input`
    padding: 8px;
    font-size: 1rem;
    border-radius: 4px;
    border: none;
`;

const TicketWrapper = styled.div`
    margin-top: 30px;
    background: #b30000;
    color: white;
    padding: 30px 40px;
    width: 400px;
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    position: relative;
    animation: ${fadeIn} 0.5s ease-in-out;
    border: 10px double #b30000;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    border-radius: 10px;

    /* Ripped edges - Left */
    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 0;
        width: 10px;
        height: 100%;
        background-color: #b30000;
        background-image: radial-gradient(circle, #121212 1.5px, transparent 1.5px);
        background-size: 10px 10px;
        background-repeat: repeat-y;
        z-index: 1;
    }

    &::before {
        left: -10px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    &::after {
        right: -10px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`;

const TicketText = styled.p`
    font-size: 1.1rem;
    margin: 6px 0;
`;

const MovieTitle = styled.h2`
    font-size: 2rem;
    margin: 10px 0;
    color: #ffe066;
`;

const DownloadButton = styled(Button)`
    margin-top: 10px;
`;


const MovieRecommendation = () => {
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState("");
    const today = new Date().toISOString().split("T")[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedTime, setSelectedTime] = useState("6:30");
    const [selectedMeridiem, setSelectedMeridiem] = useState("PM");
    const ticketRef = useRef();

    const fetchMovie = async () => {
        try {
            setError("");
            const response = await axios.get(API_URL);
            setMovie(response.data);
            confetti();
        } catch (err) {
            console.error("Error fetching movie:", err);
            setError("Couldn't fetch a movie. Try again!");
        }
    };

    const downloadTicket = () => {
        if (!ticketRef.current) return;
        htmlToImage.toPng(ticketRef.current).then((dataUrl) => {
            download(dataUrl, "movie-ticket.png");
        });
    };

    return (
        <PageWrapper>
            <Header>🎬 Movie Recommendation App 🎬</Header>
            <Button onClick={fetchMovie}>Get a Movie Recommendation</Button>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {movie && (
                <>
                    <StyledLabel>Select a Date & Time for Your Movie Date</StyledLabel>
                    <InputRow>
                        <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                        <Select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                            {["6:00", "6:30", "7:00", "7:30", "8:00", "8:30", "9:00", "9:30"].map((time) => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </Select>
                        <Select value={selectedMeridiem} onChange={(e) => setSelectedMeridiem(e.target.value)}>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </Select>
                    </InputRow>

                    <TicketWrapper ref={ticketRef}>
                        <TicketText>🎟️ ADMIT ONE 🎟️</TicketText>
                        <MovieTitle>{movie.title}</MovieTitle>
                        <TicketText>{movie.genre} | {movie.year}</TicketText>
                        <TicketText>Date: {selectedDate}</TicketText>
                        <TicketText>Time: {selectedTime} {selectedMeridiem}</TicketText>
                        <TicketText>Enjoy the show!</TicketText>
                    </TicketWrapper>

                    <DownloadButton onClick={downloadTicket}>Download Ticket</DownloadButton>
                    <Link to="/prize" style={{ color: "#ffcc00", marginTop: "20px" }}>
                        Want a prize? Click here!
                    </Link>
                </>
            )}
        </PageWrapper>
    );
};

export default MovieRecommendation;