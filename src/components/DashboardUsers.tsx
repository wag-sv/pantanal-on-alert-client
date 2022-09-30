import React from 'react';
import Tippy from '@tippyjs/react';
import { MdArticle } from 'react-icons/md';
import { api } from '../Services/api';
import { Loading } from './Loading';
import { Box } from './Box';
import { WhiteH2 } from './H2';
import { Form } from './Form';
import { Input } from './Input';
import { FlexRow } from './FlexRow';
import { YellowParagraph } from './Paragraph';
import { ClickArea } from './ClickArea';
import { ExpandableItem } from './ExpandableItem';
import { colors } from '../resources/theme';
import { UsersReport } from '../reports/UsersReport';

export function DashboardUsers() {
  const initialValueOfUsers = {
    _id: '', name: '', cpf: '', email: '', cellPhone: '', isAdmin: false,
  };
  const [users, setUsers] = React.useState([initialValueOfUsers]);
  const [error, setError] = React.useState('');
  const [negotiating, setNegotiating] = React.useState(false);
  const [show, setShow] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const getSummary = async () => {
      try {
        setNegotiating(true);
        const response = await api.get('/dashboard_users');
        setUsers([...response.data.users]);
        setNegotiating(false);
      } catch (catched: any) {
        setNegotiating(false);
        setError('Erro inesperado. Tente novamente em alguns instantes.');
      }
    };
    getSummary();
  }, []);

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value.toUpperCase());
  };

  const result = !searchTerm
    ? users
    : users.filter(
      (user) => user.name.toUpperCase().includes(searchTerm.toUpperCase())
        || user.cpf.toUpperCase().includes(searchTerm.toUpperCase())
        || user.email.toUpperCase().includes(searchTerm.toUpperCase())
        || user.cellPhone?.toUpperCase().includes(searchTerm.toUpperCase())
        || (user.isAdmin && 'administrador'.includes(searchTerm.toUpperCase())),
    );

  return (
    <Box backgroundColor={colors.red} width="700px">
      {negotiating && <Loading />}
      <WhiteH2>USUÁRIOS</WhiteH2>
      {error && <YellowParagraph>{error}</YellowParagraph>}
      {!error && (
      <Form onSubmit={() => {}}>
        <Input
          label="CPF, NOME, E-MAIL OU CELULAR"
          id="searchTerm"
          name="searchTerm"
          maxLength={20}
          autoComplete="off"
          type="text"
          placeholder="Digite aqui para pesquisar"
          value={searchTerm}
          onChange={handleChange}
        />
        <FlexRow>
          <YellowParagraph>{`Mostrando ${result.length} ${result.length === 1 ? 'usuário' : 'usuários'}.`}</YellowParagraph>
          <Tippy content="GERAR RELATÓRIO"><ClickArea onClick={() => UsersReport(result)}><MdArticle size="25px" color={colors.yellow} /></ClickArea></Tippy>
        </FlexRow>
      </Form>
      )}
      {!error && result.map((user: any) => {
        const { _id: id } = user;
        const title = user.name;
        const content = {
          CPF: user.cpf,
          'E-mail': user.email,
          Celular: user.cellPhone || 'Não cadastrado',
          'Tipo de usuário': user.isAdmin ? 'Administrador' : 'Padrão',
          'Cadastrado em': new Date(user.createdAt).toLocaleString(),
        };

        return (
          <ExpandableItem key={id} id={id} title={title} content={content} show={show} setShow={setShow} />
        );
      })}
    </Box>
  );
}
