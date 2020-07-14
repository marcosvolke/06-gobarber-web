import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErros';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
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


    } catch (err) {
      // console.log(err);
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
        <Background />

        <Content>
            <img src={logoImg} alt="GoBarber"/>

            {/* Propriedade do Form do Unform para inicializar campos: initialData={{ name: 'Marcos' }} */}
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu Cadastro</h1>

                <Input name="name" type="text" placeholder="Nome" icon={FiUser} />
                <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
                <Input name="password" type="password" placeholder="Senha" icon={FiLock} />

                <Button type="submit">Cadastrar</Button>
            </Form>

            {/* teste */}
            <Link to="/">
                <FiArrowLeft />
                Voltar para logon
            </Link>
        </Content>
    </Container>
  );
};

export default SignUp;
