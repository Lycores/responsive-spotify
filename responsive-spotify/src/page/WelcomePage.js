import styled from "styled-components";

const BackgroundStyle = styled.div`
  background-color: var(--global-background-color);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WelcomeContainer = styled.div`
  background-color: var(--global-spotify-color);
  height: 50px;
  width: clamp(200px, 40vw, 400px);
  border-radius: var(--global-border-radius);
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
`;

const TextStyle = styled.a`
  color: var(--global-background-color);
  text-decoration: none;
`;

const Author = styled.div`
  position: absolute;
  bottom: 10px;
  font-size: 20px;
  width: 300px;
  left: calc(calc(100% - 300px) / 2);
  text-align: center;
`;

function WelcomePage() {
  return (
    <>
      <BackgroundStyle>
        <WelcomeContainer
          onClick={() => {
            window.location.href = "/auth/login";
          }}
        >
          <TextStyle>Grant Access</TextStyle>
        </WelcomeContainer>
      </BackgroundStyle>
      <Author>finished by Runchao Mao</Author>
    </>
  );
}

export default WelcomePage;
