import React, { useRef, useCallback, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup'; //teste

import AuthContext from '../../context/AuthContext';

import getValidationErrors from '../../utils/getValidationErros';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const auth = useContext(AuthContext);
  console.log(auth);

  const handleSubmit = useCallback(async (data: object) => {
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


    } catch (err) {
      // console.log(err);
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

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
