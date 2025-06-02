import Select from '../../components/Select';
import { Button, Pedidos, Container, Header } from './styles'

const PedidoFornecedor = () => {
  return (
    <Container>
      <Header>
        <span className="title">Pedidos</span>
      </Header>
      <Pedidos>
        <div className="item">
          <div className="fotoNome">
            <div className="nomeValor">
              <span className='nome'>Pedido #123</span>
              <span className='campo'>Cliente: <span className="bold">Teste</span></span>
              <span className='campo'>Endereço: <span className="bold">Rua Teste, 123</span></span>
            </div>
          </div>
          <div className="botoes">
            <Select
              labels={['Aguardando Pagamento', 'Em Preparação', 'Enviado', 'Entregue', 'Cancelado']}
              values={['AGUARDANDO_PAGAMENTO', 'EM_PREPARO', 'ENVIADO', 'ENTREGUE', 'CANCELADO']}
            />
            <Button>
              Visualizar Pedido
            </Button>
          </div>
        </div>
        <div className="item">
          <div className="fotoNome">
            <div className="nomeValor">
              <span className='nome'>Pedido #123</span>
              <span className='campo'>Cliente: <span className="bold">Teste</span></span>
              <span className='campo'>Endereço: <span className="bold">Rua Teste, 123</span></span>
            </div>
          </div>
          <div className="botoes">
            <Select
              labels={['Aguardando Pagamento', 'Em Preparação', 'Enviado', 'Entregue', 'Cancelado']}
              values={['AGUARDANDO_PAGAMENTO', 'EM_PREPARO', 'ENVIADO', 'ENTREGUE', 'CANCELADO']}
            />
            <Button>
              Visualizar Pedido
            </Button>
          </div>
        </div>
        <div className="item">
          <div className="fotoNome">
            <div className="nomeValor">
              <span className='nome'>Pedido #123</span>
              <span className='campo'>Cliente: <span className="bold">Teste</span></span>
              <span className='campo'>Endereço: <span className="bold">Rua Teste, 123</span></span>
            </div>
          </div>
          <div className="botoes">
            <Select
              labels={['Aguardando Pagamento', 'Em Preparação', 'Enviado', 'Entregue', 'Cancelado']}
              values={['AGUARDANDO_PAGAMENTO', 'EM_PREPARO', 'ENVIADO', 'ENTREGUE', 'CANCELADO']}
            />
            <Button>
              Visualizar Pedido
            </Button>
          </div>
        </div>
      </Pedidos>
    </Container>
  )
};

export default PedidoFornecedor;