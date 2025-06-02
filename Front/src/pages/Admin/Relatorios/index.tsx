import FormSelect from 'react-bootstrap/esm/FormSelect';
import { useTheme } from '../../../context/ThemeProvidder';
import { Container } from '../styles';
import Form from 'react-bootstrap/esm/Form';
import api from '../../../api';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import ThemeSelectorBasic from '../../../components/ThemeSelectorBasic';
import { Slide, toast } from 'react-toastify';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router';

export interface RelatorioFaturamentoMensal {
  ano: number;
  mes: number;
  totalMensalidades: number;
  faturamentoBrutoMensal: number;
  lucroMensal: number;
}

export interface RelatorioFaturamentoAnual {
  ano: number;
  totalMensalidades: number;
  faturamentoBrutoAnual: number;
  lucroAnual: number;
}

export interface RelatorioFeedBack {
  idAvaliacao: number;
  dsComentario: string;
  nmUsuarioCliente: string;
  nuTelCliente: string;
  idPedido: number;
  nmUsuarioFornecedor: string;
}

export interface RelatorioHistoricoAcesso {
  id: number;
  idUsuario: number;
  nmUsuario: string;
  role: string;
  dtHoraAcesso: string;
}

const Relatorios = () => {
  const { theme } = useTheme();

  const navigate = useNavigate();

  const [value, setValue] = useState("");

  const [relatorioMensal, setRelatorioMensal] = useState<RelatorioFaturamentoMensal[]>([]);
  const [relatorioAnual, setRelatorioAnual] = useState<RelatorioFaturamentoAnual[]>([]);
  const [relatorioFeedBack, setRelatorioFeedBack] = useState<RelatorioFeedBack[]>([]);
  const [relatorioAcesso, setRelatorioAcesso] = useState<RelatorioHistoricoAcesso[]>([]);

  const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue === "mensal") {
      try {
        const response = await api.get<RelatorioFaturamentoMensal[]>(`/admin/relatorios/${selectedValue}`);
        if (response.data.length === 0) {
          toast.error("Nenhum dado encontrado!", {
            transition: Slide,
          });
          return;
        }
        setRelatorioMensal(response.data);
        setValue("mensal");
      } catch {
        toast.error("Nenhum dado encontrado!", {
          transition: Slide,
        })
      }
    } else if (selectedValue === "anual") {
      try {
        const response = await api.get<RelatorioFaturamentoAnual[]>(`/admin/relatorios/${selectedValue}`);
        if (response.data.length === 0) {
          toast.error("Nenhum dado encontrado!", {
            transition: Slide,
          });
          return;
        }
        setRelatorioAnual(response.data);
        setValue("anual");
      } catch {
        toast.error("Nenhum dado encontrado!", {
          transition: Slide,
        })
      }
    } else if (selectedValue === "avaliacoes") {
      try {
        const response = await api.get<RelatorioFeedBack[]>(`/admin/relatorios/${selectedValue}`);
        if (response.data.length === 0) {
          toast.error("Nenhum dado encontrado!", {
            transition: Slide,
          });
          return;
        }
        setRelatorioFeedBack(response.data);
        setValue("avaliacoes");
      } catch {
        toast.error("Nenhum dado encontrado!", {
          transition: Slide,
        })
      }
    } else if (selectedValue === "acesso-usuarios") {
      try {
        const response = await api.get<RelatorioHistoricoAcesso[]>(`/admin/relatorios/${selectedValue}`);
        if (response.data.length === 0) {
          toast.error("Nenhum dado encontrado!", {
            transition: Slide,
          });
          return;
        }
        setRelatorioAcesso(response.data);
        setValue("acesso-usuarios");
      } catch {
        toast.error("Nenhum dado encontrado!", {
          transition: Slide,
        })
      }
    } else {
      setValue("");
      setRelatorioAcesso([]);
    }
  }

  return (
    <Container data-bs-theme={theme}>
      <ThemeSelectorBasic />
      <Button variant="primary btnVoltar" onClick={() => navigate("/admin")}>
        Voltar
      </Button>
      <Form style={{ display: 'flex', flexDirection: 'column', gap: "10px" }}>
        <FormSelect onChange={handleSelectChange}>
          <option value="">Selecione um relatório</option>
          <option value="mensal">Mensal</option>
          <option value="anual">Anual</option>
          <option value="avaliacoes">FeedBack</option>
          <option value="acesso-usuarios">Histórico de Acesso</option>
        </FormSelect>
        {value === "mensal" && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Ano</th>
                <th>Mês</th>
                <th>Total de Mensalidades</th>
                <th>Faturamento Bruto Mensal</th>
                <th>Lucro Mensal</th>
              </tr>
            </thead>
            <tbody>
              {relatorioMensal.map((item) => (
                <tr key={`${item.ano}-${item.mes}`}>
                  <td>{item.ano}</td>
                  <td>{item.mes}</td>
                  <td>{item.totalMensalidades}</td>
                  <td>{item.faturamentoBrutoMensal.toFixed(2)}</td>
                  <td>{item.lucroMensal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {value === "anual" && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Ano</th>
                <th>Total de Mensalidades</th>
                <th>Faturamento Bruto Anual</th>
                <th>Lucro Anual</th>
              </tr>
            </thead>
            <tbody>
              {relatorioAnual.map((item) => (
                <tr key={item.ano}>
                  <td>{item.ano}</td>
                  <td>{item.totalMensalidades}</td>
                  <td>{item.faturamentoBrutoAnual.toFixed(2)}</td>
                  <td>{item.lucroAnual.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {value === "avaliacoes" && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id Avaliação</th>
                <th>Comentário</th>
                <th>Nome Cliente</th>
                <th>Telefone Cliente</th>
                <th>Id Pedido</th>
                <th>Nome Fornecedor</th>
              </tr>
            </thead>
            <tbody>
              {relatorioFeedBack.map((item) => (
                <tr key={item.idAvaliacao}>
                  <td>{item.idAvaliacao}</td>
                  <td>{item.dsComentario}</td>
                  <td>{item.nmUsuarioCliente}</td>
                  <td>{item.nuTelCliente}</td>
                  <td>{item.idPedido}</td>
                  <td>{item.nmUsuarioFornecedor}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {value === "acesso-usuarios" && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>idUsuario</th>
                <th>nmUsuario</th>
                <th>role</th>
                <th>dtHoraAcesso</th>
              </tr>
            </thead>
            <tbody>
              {relatorioAcesso.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.idUsuario}</td>
                  <td>{item.nmUsuario}</td>
                  <td>{item.role}</td>
                  <td>{new Date(item.dtHoraAcesso).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Form>
    </Container>
  )
};

export default Relatorios;