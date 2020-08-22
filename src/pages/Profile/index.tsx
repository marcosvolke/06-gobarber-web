import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErros';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

import Input from '../../components/input';
import Button from '../../components/button';

import {
  Container,
  Content,
  AnimationContainer,
  AvatarInput,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user } = useAuth();

  const handleSubmit = useCallback(async (data: ProfileFormData) => {
    // console.log(data);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      // Config abortEarly para não parar no primeiro erro de validação e retornar todos
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você já pode fazer seu logon no GoBarber!',
      });
    } catch (err) {
      // console.log(err);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
      });
    }
  }, [addToast, history]);

  return (
    <Container>
        <header>
          <div>
            <Link to="/dashboard">
              <FiArrowLeft />
            </Link>
          </div>
        </header>

        <Content>
          <AnimationContainer>

            {/* Propriedade do Form do Unform para inicializar campos: initialData={{ name: 'Marcos' }} */}
            <Form ref={formRef} initialData={{
              name: user.name,
              email: user.email,
            }} onSubmit={handleSubmit}>
                <AvatarInput>
                  <img src={user.avatar_url} alt={user.name} />
                  <label htmlFor="avatar">
                    <FiCamera />
                    <input type="file" id="avatar"/>
                  </label>

                </AvatarInput>

                <h1>Meu perfil</h1>

                <Input name="name" type="text" placeholder="Nome" icon={FiUser} />
                <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
                <Input name="old_password" type="password" placeholder="Senha Atual" icon={FiLock} containerStyle={{ marginTop: 24 }} />
                <Input name="password" type="password" placeholder="Nova Senha" icon={FiLock} />
                <Input name="password_confirmation" type="password" placeholder="Confirmar Senha" icon={FiLock} />

                <Button type="submit">Confirmar Mudanças</Button>
            </Form>
          </AnimationContainer>
        </Content>
    </Container>
  );
};

export default Profile;
