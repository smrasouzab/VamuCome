// import { useState } from 'react'
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import { ContainerModal } from './styles';
import TextArea from '../TextArea';
import { FaStar } from "react-icons/fa";
import { useTheme } from '../../context/ThemeProvidder';
import api from '../../api';
import { useState } from 'react';
import { Slide, toast } from 'react-toastify';

export interface AvaliacaoProps {
  showAvaliacao: boolean;
  handleClose: () => void;
}

const Avaliacao = ({showAvaliacao, handleClose}: AvaliacaoProps) => {
  const { theme } = useTheme();

  const [stars, setStars] = useState(0);

  const [comentario, setComentario] = useState('');

  // const previewStars = (stars: number) => {
  //   const starElements = document.querySelectorAll('.linha > svg');
  //   starElements.forEach((star, index) => {
  //     if (index < stars) {
  //       star.classList.add('activePreview');
  //     } else {
  //       star.classList.remove('activePreview');
  //     }
  //   });
  // }

  const handleStarClick = (stars: number) => {
    const starElements = document.querySelectorAll('.linha > svg');
    setStars(stars);
    starElements.forEach((star, index) => {
      if (index < stars) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  const handleSubmit = () => {
    api.post('/cliente/avaliacao/avaliar', {
      idPedido: Number(localStorage.getItem('id-pedido')),
      qtNota: stars,
      dsComentario: comentario,
    });
    handleClose();
    toast.success('Avaliação enviada com sucesso!', {
      transition: Slide,
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
              {/* <FaStar onClick={() => handleStarClick(1)} onMouseEnter={() => previewStars(1)} onMouseLeave={() => previewStars(0)} size={30} />
              <FaStar onClick={() => handleStarClick(2)} onMouseEnter={() => previewStars(2)} onMouseLeave={() => previewStars(0)} size={30} />
              <FaStar onClick={() => handleStarClick(3)} onMouseEnter={() => previewStars(3)} onMouseLeave={() => previewStars(0)} size={30} />
              <FaStar onClick={() => handleStarClick(4)} onMouseEnter={() => previewStars(4)} onMouseLeave={() => previewStars(0)} size={30} />
              <FaStar onClick={() => handleStarClick(5)} onMouseEnter={() => previewStars(5)} onMouseLeave={() => previewStars(0)} size={30} /> */}
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => handleStarClick(star)}
                  size={30}
                  className={stars >= star ? 'active' : ''}
                />
              ))}
            </div>
            <TextArea
              rows={4}
              label="Comentário"
              value={comentario}
              onChange={(e) => setComentario(e.currentTarget.value)}
              placeholder="Deixe seu comentário sobre o pedido"
              style={{
                width: "100%",
              }}
            />
          </div>
        </ContainerModal>
      </Modal.Body>
      <Modal.Footer style={{ border: "none" }}>
        <Button variant="warning" onClick={handleSubmit}>
          Enviar Avaliação
        </Button>
      </Modal.Footer>
    </Modal>
  )
};

export default Avaliacao;