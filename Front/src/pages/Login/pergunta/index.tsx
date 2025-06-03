import { useSearchParams } from 'react-router-dom';
import { Card, Container } from "./styles";
import { FaBuildingUser } from "react-icons/fa6";
import { MdPerson } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { useRef } from 'react';

interface PerguntaProps {
  setDisplayPergunta: (value: boolean) => void;
}

const Pergunta = ({ setDisplayPergunta }: PerguntaProps) => {
  const [, setSearchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  const tipoLogin = async (tipo: string) => {
    if (tipo === 'cliente') {
      setSearchParams({ t: 'cliente' });
    } else if (tipo === 'fornecedor') {
      setSearchParams({ t: 'fornecedor' });
    }
    containerRef.current?.classList.add('close');
    setTimeout(() => {
      setDisplayPergunta(false);
    }, 600);
  }

  return (
    <Container ref={containerRef}>
      <h1>Para a onde deseja entrar?</h1>
      <Card 
        onClick={() => tipoLogin('cliente')}
      >
        <div className="icon">
          <MdPerson size={60} />
        </div>
        <div className="content">
          <h1>Sou Cliente</h1>
        </div>
        <div className="arrow">
          <IoIosArrowForward size={30} />
        </div>
      </Card>
      <Card
        onClick={() => tipoLogin('fornecedor')}
      >
        <div className="icon">
          <FaBuildingUser size={60} />
        </div>
        <div className="content">
          <h1>Sou Fornecedor</h1>
        </div>
        <div className="arrow">
          <IoIosArrowForward size={30} />
        </div>
      </Card>
    </Container>
  )
}

export default Pergunta;