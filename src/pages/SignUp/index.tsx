import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => (
    <Container>
        <Background />

        <Content>
            <img src={logoImg} alt="GoBarber"/>

            <form>
                <h1>Faça seu Cadastro</h1>

                <Input name="nome" type="text" placeholder="Nome" icon={FiUser} />
                <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
                <Input name="password" type="password" placeholder="Senha" icon={FiLock} />

                <Button type="submit">Cadastrar</Button>
            </form>

            <a href="forgot">
                <FiArrowLeft />
                Voltar para logon
            </a>
        </Content>
    </Container>
);

export default SignUp;
