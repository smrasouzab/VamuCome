import Modal from 'react-bootstrap/esm/Modal';
import ButtonBs from 'react-bootstrap/esm/Button';
import { Button, Container, ContainerModal, Header, Produtos } from './styles'
import Input from '../../components/Input';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeProvidder';

const ProdFornecedor = () => {
  const { theme } = useTheme();

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Container>
      <Header>
        <span className="title">Produtos</span>
        <Button
          type='button'
          onClick={handleShow}
        >
          Adicionar Produto
        </Button>
      </Header>
      <Produtos>
        <div className="item">
          <div className="fotoNome">
            <img src="listagem/image.png" alt="Produto" />
            <div className="nomeValor">
              <span className='nome'>Nome</span>
              <span className='preco'>R$ 99,90</span>
              <span className='descricao'>Descrição</span>
            </div>
          </div>
          <Button>
            Editar Produto
          </Button>
        </div>
        <div className="item">
          <div className="fotoNome">
            <img src="listagem/image.png" alt="Produto" />
            <div className="nomeValor">
              <span className='nome'>Nome</span>
              <span className='preco'>R$ 99,90</span>
              <span className='descricao'>Descrição</span>
            </div>
          </div>
          <Button>
            Editar Produto
          </Button>
        </div>
        <div className="item">
          <div className="fotoNome">
            <img src="listagem/image.png" alt="Produto" />
            <div className="nomeValor">
              <span className='nome'>Nome</span>
              <span className='preco'>R$ 99,90</span>
              <span className='descricao'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, recusandae?</span>
            </div>
          </div>
          <Button>
            Editar Produto
          </Button>
        </div>
      </Produtos>
      <Modal show={showModal} onHide={handleClose} data-bs-theme={theme} centered>
        <Modal.Header style={{ border: "none" }}>
          <Modal.Title>Novo Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContainerModal>
            <div className="linha">
              <Input
                type="text"
                label="Nome do Produto"
                placeholder="Nome do Produto"
                style={{
                  width: "200px",
                }}
              />
              <Input
                type="number"
                label="Valor do Produto"
                placeholder="Valor do Produto"
                style={{
                  width: "200px",
                }}
              />
            </div>
            <div className="linha">
              <Input
                type="text"
                label="Descrição do Produto"
                placeholder="Descrição do Produto"
                style={{
                  width: "200px",
                }}
              />
              <Input
                type="text"
                label="Foto do Produto"
                placeholder="URL da Foto do Produto"
                style={{
                  width: "200px",
                }}
              />
            </div>
          </ContainerModal>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <ButtonBs variant={theme === 'light' ? 'dark' : 'light'} onClick={handleClose}>
            Cancelar
          </ButtonBs>
          <ButtonBs variant="warning" onClick={handleClose}>
            Cadastrar Produto
          </ButtonBs>
        </Modal.Footer>
      </Modal>
    </Container>
  )
};

export default ProdFornecedor;