import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import { useToast } from '../../context/ToastContext';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErros';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
    // console.log(data);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string().required('Senha obrigatória'),
        password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'Confirmação incorreta!')
      });

      // Config abortEarly para não parar no primeiro erro de validação e retornar todos
      await schema.validate(data, {
        abortEarly: false,
      });

      const {password, password_confirmation} = data;

      const token = location.search.replace('?token=', '');
      if (!token) {
        throw new Error();
      }

      await api.post('/password/reset', {
        password,
        password_confirmation,
        token,
      });

      history.push('/')
    } catch (err) {
      // console.log(err);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      addToast({
        type: 'error',
        title: 'Erro ao resetar senha',
        description: 'Ocorreu um erro ao tentar resetar sua senha, tente novamente.',
      });
    }
  }, [history, addToast, location.search]); //Toda variável externa usada no useCallback tem q entrar no arrau de dependências

  return (
      <Container>
          <Content>
            <AnimationContainer>
              <img src={logoImg} alt="GoBarber"/>

              <Form ref={formRef} onSubmit={handleSubmit}>
                  <h1>Resetar Senha</h1>

                  <Input name="password" type="password" placeholder="Nova senha" icon={FiLock} />
                  <Input name="password_confirmation" type="password" placeholder="Confirmação da senha" icon={FiLock} />

                  <Button type="submit">Alterar senha</Button>
              </Form>

            </AnimationContainer>
          </Content>

          <Background />
      </Container>
  )
};

export default ResetPassword;
