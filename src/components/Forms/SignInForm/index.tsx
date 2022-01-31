import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import { FooterButton } from '@components/Controllers/FooterButton';
import { Button } from '@components/Controllers/Button';
import { Input } from '@components/Controllers/Input';
import { Form, Title, Footer } from './styles';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  function handleSignIn() {
    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Logado com sucesso!'))
      .catch((error) => {
        console.error(error.message);
        Alert.alert('Oops!', 'Ocorreu um erro ao fazer o login. Tente novamente.');
      })
      .finally(() => setIsLoading(false));
  }

  function handleForgotPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Recuperação de senha', 'Enviamos um email para você com instruções para recuperar sua senha.'))
      .catch((error) => {
        console.error(error.message);
        Alert.alert('Oops!', 'Ocorreu um erro ao tentar recuperar sua senha. Tente novamente.');
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Form>
      <Title>Entrar</Title>
      <Input placeholder="E-mail" onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry onChangeText={setPassword} />
      <Button title="Entrar" onPress={handleSignIn} isLoading={isLoading} />

      <Footer>
        <FooterButton title="Criar conta" icon="person-add" onPress={() => navigation.navigate('register')} />
        <FooterButton title="Esqueci senha" icon="email" onPress={handleForgotPassword} />
      </Footer>
    </Form>
  );
}