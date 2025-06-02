// import { useState } from 'react'
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import { ContainerModal } from './styles';
import TextArea from '../TextArea';
import { FaStar } from "react-icons/fa";
import { useTheme } from '../../context/ThemeProvidder';

export interface AvaliacaoProps {
  showAvaliacao: boolean;
  handleClose: () => void;
}

const Avaliacao = ({showAvaliacao, handleClose}: AvaliacaoProps) => {
  const { theme } = useTheme();

  const previewStars = (stars: number) => {
    const starElements = document.querySelectorAll('.linha > svg');
    starElements.forEach((star, index) => {
      if (index < stars) {
        star.classList.add('activePreview');
      } else {
        star.classList.remove('activePreview');
      }
    });
  }

  const handleStarClick = (stars: number) => {
    const starElements = document.querySelectorAll('.linha > svg');
    starElements.forEach((star, index) => {
      if (index < stars) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  return (
    <Modal show={showAvaliacao} onHide={handleClose} keyboard={false} backdrop='static' data-bs-theme={theme} centered>
      <Modal.Header style={{ border: "none" }}>
        <Modal.Title>Faça sua Avaliação!</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{padding: "0px 16px"}}>
        <ContainerModal>
          <div className="coluna">
            <div className="linha">
              <FaStar onClick={() => handleStarClick(1)} onMouseEnter={() => previewStars(1)} onMouseLeave={() => previewStars(0)} size={30} />
              <FaStar onClick={() => handleStarClick(2)} onMouseEnter={() => previewStars(2)} onMouseLeave={() => previewStars(0)} size={30} />
              <FaStar onClick={() => handleStarClick(3)} onMouseEnter={() => previewStars(3)} onMouseLeave={() => previewStars(0)} size={30} />
              <FaStar onClick={() => handleStarClick(4)} onMouseEnter={() => previewStars(4)} onMouseLeave={() => previewStars(0)} size={30} />
              <FaStar onClick={() => handleStarClick(5)} onMouseEnter={() => previewStars(5)} onMouseLeave={() => previewStars(0)} size={30} />
            </div>
            <TextArea
              rows={4}
              label="Comentário"
              style={{
                width: "100%",
              }}
            />
          </div>
        </ContainerModal>
      </Modal.Body>
      <Modal.Footer style={{ border: "none" }}>
        <Button variant="warning" onClick={handleClose}>
          Enviar Avaliação
        </Button>
      </Modal.Footer>
    </Modal>
  )
};

export default Avaliacao;