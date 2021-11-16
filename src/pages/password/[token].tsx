import {
  Flex,
  Stack,
  Heading,
  Image,
  Button,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiLock } from 'react-icons/fi';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { GetServerSidePropsContext } from "next";

import { Input } from "../../components/Form/Input";
import { api } from "../../services/api";

type ResetPasswordFormData = {
  password: string;
  password_confirmation: string;
}

type ResetPasswordProps = {
  token: string;
}

const signInFormSchema = yup.object().shape({
  password: yup.string()
    .required('Senha obrigatória')
    .min(6, 'Senha precisa ter no mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf(
    [yup.ref('password'), undefined],
    'Confirmação incorreta',
  ),
});

export default function ResetPassword({ token }: ResetPasswordProps) {
  /**
   * resolver throwing type error with yupResolver
   * after react-hook-form updated to version 7.15.x,
   * reason why I put 'any' in yupResolver generic parameter!
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver<yup.AnyObjectSchema>(signInFormSchema),
  });

  const toast = useToast();
  const isWideScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const handleResetPassword: SubmitHandler<ResetPasswordFormData> = async data => {
    const sendData = {
      password: data.password,
    }

    try {
      await api.post('/password/reset', sendData, {
        params: {
          token,
        }
      });

      reset();

      toast({
        title: 'Senha alterada com sucesso.',
        status: 'success',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: 'error',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      });
    }
    console.log(sendData);
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        as="form"
        flexDir="column"
        maxWidth={440}
        w="100%"
        p="8"
        borderRadius="lg"
        bgColor="gray.900"
        onSubmit={handleSubmit(handleResetPassword)}
      >
        <Stack spacing="4">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            mx="auto"
            mb="6"
          />

          <Heading
            textAlign="center"
            size="lg"
            color="purple.500"
          >
            Alterar Senha
          </Heading>

          <Input
            name="password"
            label="Nova senha"
            icon={FiLock}
            type="password"
            error={errors.password}
            {...register('password')}
            size="lg"
          />

          <Input
            name="password_confirmation"
            label="Confirme a nova senha"
            icon={FiLock}
            type="password"
            error={errors.password_confirmation}
            {...register('password_confirmation')}
            size="lg"
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          size="lg"
          colorScheme="purple"
          isLoading={isSubmitting}
        >
          Salvar
        </Button>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      token: ctx.query.token,
    }
  }
};
