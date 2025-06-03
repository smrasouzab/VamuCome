import { useState } from "react";
import { Container } from "../styles";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import api from "../../../api";
import { Slide, toast } from "react-toastify";
import { useTheme } from "../../../context/ThemeProvidder";
import ThemeSelectorBasic from "../../../components/ThemeSelectorBasic";
import { useNavigate } from "react-router";

const CadastroProduto = () => {
  const { theme } = useTheme();

  const navigate = useNavigate();

  const [idFornecedor, setIdFornecedor] = useState(0)
  const [nmProduto, setNmProduto] = useState("");
  const [dsProduto, setDsProduto] = useState("");
  const [vlProduto, setVlProduto] = useState(0);
  const [urlFotoProduto, setUrlFotoProduto] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    api.post("/admin/cadastrar-produto", {
      idFornecedor,
      nmProduto,
      dsProduto,
      vlProduto,
      urlFotoProduto,
    }).then(() => {
      toast.success("Produto cadastrado!", {
        transition: Slide,
      });
    }).catch(() => {
      toast.error("Erro ao cadastrar produto!", {
        transition: Slide,
      });
    });
  }

  return (
    <Container data-bs-theme={theme}>
      <ThemeSelectorBasic />
      <Button variant="primary btnVoltar" onClick={() => navigate("/admin")}>
        Voltar
      </Button>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formIdFornecedor">
          <Form.Label>ID do Fornecedor</Form.Label>
          <Form.Control type="number" placeholder="ID do Fornecedor" value={idFornecedor} onChange={(e) => setIdFornecedor(Number(e.target.value))} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNomeProduto">
          <Form.Label>Nome do Prouduto</Form.Label>
          <Form.Control type="text" placeholder="Nome do Produto" value={nmProduto} onChange={(e) => setNmProduto(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescricaoProduto">
          <Form.Label>Descrição do Produto</Form.Label>
          <Form.Control type="text" placeholder="Descricao do Produto" value={dsProduto} onChange={(e) => setDsProduto(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formValorProduto">
          <Form.Label>Valor do Produto</Form.Label>
          <Form.Control type="number" placeholder="Valor do Produto" value={vlProduto} onChange={(e) => setVlProduto(Number(e.target.value))} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formUrlFotoProduto">
          <Form.Label>URL da Foto do Produto</Form.Label>
          <Form.Control type="text" placeholder="URL da Foto do Produto" value={urlFotoProduto} onChange={(e) => setUrlFotoProduto(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Cadastrar Produto
        </Button>
      </Form>
    </Container>
  )
};

export default CadastroProduto;