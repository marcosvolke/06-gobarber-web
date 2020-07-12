import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../context/AuthContext';

import getValidationErrors from '../../utils/getValidationErros';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Content, Background } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    // console.log(data);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('Email obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      // Config abortEarly para não parar no primeiro erro de validação e retornar todos
      await schema.validate(data, {
        abortEarly: false,
      });

      signIn({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      // console.log(err);
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, [signIn]); //Toda variável externa usada no useCallback tem q entrar no arrau de dependências

  return (
      <Container>
          <Content>
              <img src={logoImg} alt="GoBarber"/>

              <Form ref={formRef} onSubmit={handleSubmit}>
                  <h1>Faça seu logon</h1>

                  <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
                  <Input name="password" type="password" placeholder="Senha" icon={FiLock} />

                  <Button type="submit">Entrar</Button>

                  <a href="forgot">Esqueci minha senha</a>
              </Form>

              <a href="forgot">
                  <FiLogIn />
                  Criar conta
              </a>
          </Content>

          <Background />
      </Container>
  )
};

export default SignIn;
