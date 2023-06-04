import styled from 'styled-components';

interface CardProductProps {
  link: string;
  name: string;
}

export default function CardProduct({ link, name }: CardProductProps) {
  return (
    <CardProductStyle>
      <div className="imageContainer">
        <img src={link} alt="" />
      </div>

      <div className="content">
        <h1>{name}</h1>
      </div>
    </CardProductStyle>
  );
}

const CardProductStyle = styled.div`
  height: 180px;
  width: 170px;
  background-color: white;
  border-radius: 10px;
  box-shadow: none;

  margin-left: 11px;
  margin-bottom: 10px;
  transition: all 0.5s ease-out;
  :hover {
    cursor: pointer;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .imageContainer {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: fit-content;
      height: 100%;
      border-radius: 5px;
    }
  }

  .content {
    box-shadow: none;
    height: 40%;
    border-radius: 0px 0px 5px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease-out;
    :hover {
      cursor: pointer;
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
    }

    h1 {
      color: #686868;
      font-size: 20px;
      font-weight: 600;
    }
  }
`;
