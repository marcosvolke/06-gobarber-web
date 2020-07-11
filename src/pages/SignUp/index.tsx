import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Container>
        <Background />

        <Content>
            <img src={logoImg} alt="GoBarber"/>

            {/* Propriedade do Form do Unform para inicializar campos: initialData={{ name: 'Marcos' }} */}
            <Form onSubmit={handleSubmit}>
                <h1>Faça seu Cadastro</h1>

                <Input name="name" type="text" placeholder="Nome" icon={FiUser} />
                <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
                <Input name="password" type="password" placeholder="Senha" icon={FiLock} />

                <Button type="submit">Cadastrar</Button>
            </Form>

            <a href="forgot">
                <FiArrowLeft />
                Voltar para logon
            </a>
        </Content>
    </Container>
  );
};

export default SignUp;
