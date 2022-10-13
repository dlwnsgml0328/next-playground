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
    margin-top: 5px;
    display: flex;
    margin-right: 10px;
    width: 250px;
    height: 200px;
  }

  .image-wrap {
    position: relative;
    color: white;
    width: 100%;
    height: 100%;

    img {
      object-fit: cover;
    }

    span {
      position: absolute;
      top: 5;
      right: 5;
      text-shadow: #000 1px 0 10px;
    }
  }
`;
