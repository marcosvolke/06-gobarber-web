import React, { useCallback, useRef, ChangeEvent } from 'react';
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
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obrigatório').email('Digite um e-mail válido'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }).oneOf([Yup.ref('password')], 'Confirmação incorreta!'),
      });

      // Config abortEarly para não parar no primeiro erro de validação e retornar todos
      await schema.validate(data, {
        abortEarly: false,
      });

      // junto campos de password ao objeto enviado apenas se old_password preenchido
      const { name, email, old_password, password, password_confirmation} = data;
      const formData = Object.assign({
        name,
        email,
      }, old_password ? {
        old_password,
        password,
        password_confirmation,
      } : {} );


      const response = await api.put('/profile', formData);

      updateUser(response.data);

      history.push('/dashboard');

      addToast({
        type: 'success',
        title: 'Perfil atualizado!',
        description: 'Suas informações do perfil foram atualizadas com sucesso!',
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
        title: 'Erro na atualização',
        description: 'Ocorreu um erro ao atualizar perfil, tente novamente.',
      });
    }
  }, [addToast, history, updateUser]);

  const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = new FormData();

      data.append('avatar', e.target.files[0]);

      api.patch('/users/avatar', data).then((response) => {
        updateUser(response.data);

        addToast({
          type: "success",
          title: 'Avatar atualizado!',
        })
      });
    }
  }, [addToast, updateUser]);

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
                    <input type="file" id="avatar" onChange={handleAvatarChange} />
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
