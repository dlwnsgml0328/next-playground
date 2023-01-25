import styled from 'styled-components';

export const MoviePosts = styled.div`
  h1 {
    color: #000;
  }

  .movie-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  .movie {
    background: rgb(81, 81, 81);
    width: 250px;
    height: 200px;
    margin-top: 5px;
    margin-right: 10px;
    display: flex;
    position: relative;
  }

  .shimmer-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: loading 2s infinite;
  }

  @keyframes loading {
    0% {
      background-color: rgba(255, 255, 255, 0.1);
    }

    100% {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
`;
