import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import prizeImage from "../components/sike.jpg"; // Add a funny image to src/assets/

const slideUp = keyframes`
  from { transform: translateY(100px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Wrapper = styled.div`
  padding: 40px;
  color: white;
  text-align: center;
  background: linear-gradient(135deg, #111, #333);
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
`;

const Question = styled.div`
  margin-bottom: 20px;
  animation: ${slideUp} 0.4s ease forwards;
`;

const Radio = styled.label`
  display: block;
  margin: 8px 0;
  font-weight: 300;
`;

const SubmitButton = styled.button`
  margin-top: 30px;
  background: #ffcc00;
  color: black;
  padding: 10px 20px;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const PrizeImage = styled.img`
  margin: 30px auto 0;
  max-width: 400px;
  display: ${props => props.show ? "block" : "none"};
  animation: ${slideUp} 0.6s ease forwards;
`;

const PrizePage = () => {
    const [showPrize, setShowPrize] = useState(false);

    const handleSubmit = () => {
        setTimeout(() => {
            setShowPrize(true);
        }, 1000);
    };

    return (
        <Wrapper>
            <h1>🎁 Your Prize Awaits 🎁</h1>

            <Question>
                <p>1. Are you ready for your prize?</p>
                <Radio><input type="radio" name="q1" /> Yes</Radio>
                <Radio><input type="radio" name="q1" /> No</Radio>
                <Radio><input type="radio" name="q1" /> Mentally? Not even close.</Radio>
            </Question>

            <Question>
                <p>2. What would you do if the prize was a million dollars?</p>
                <Radio><input type="radio" name="q2" /> Retire instantly</Radio>
                <Radio><input type="radio" name="q2" /> Buy a lifetime supply of popcorn</Radio>
                <Radio><input type="radio" name="q2" /> Ask for 2 million instead</Radio>
            </Question>

            <Question>
                <p>3. Pick A Number:</p>
                <Radio><input type="radio" name="q3" /> 24</Radio>
                <Radio><input type="radio" name="q3" /> 5</Radio>
                <Radio><input type="radio" name="q3" /> 100,432,111</Radio>
            </Question>

            <SubmitButton onClick={handleSubmit}>Submit Answers</SubmitButton>
            <PrizeImage
                src={prizeImage}
                alt="Your Funny Prize"
                show={showPrize}
            />
        </Wrapper>
    );
};

export default PrizePage;