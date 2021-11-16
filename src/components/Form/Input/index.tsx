import {
  ForwardRefRenderFunction,
  forwardRef,
  ElementType,
  useState,
  KeyboardEvent,
} from 'react';
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  IconButton,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { cpf } from './masks';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  icon?: ElementType,
  type?: string;
  mask?: 'cpf';
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  name,
  label = undefined,
  icon = undefined,
  type = 'text',
  mask = undefined,
  error = undefined,
  ...rest
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    switch (mask) {
      case 'cpf':
        cpf(e);
        break;
      default:
        break;
    }
  }

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel
          id={`form-label-for-${name}`}
          htmlFor={name}
        >
            {label}
          </FormLabel>
      )}

      <InputGroup>
        {!!Icon && (
          <InputLeftElement
            h="100%"
            pointerEvents="none"
            children={<Icon as={icon} color="purple.500" fontSize="24" />}
          />
        )}

        <ChakraInput
          id={name}
          name={name}
          type={type === 'password' ? showPassword ? 'text' : type : type}
          borderColor="gray.500"
          focusBorderColor="purple.500"
          variant="outline"
          size="lg"
          bgColor="gray.500"
          _hover={{
            bgColor: 'gray.500',
          }}
          onKeyUp={handleKeyUp}
          ref={ref}
          {...rest}
        />

        {type === 'password' && (
          <InputRightElement h="100%">
            <IconButton
              aria-label="show/hide password"
              variant="solid"
              fontSize={24}
              color="purple.500"
              bgColor="transparent"
              _hover={{
                bgColor: 'transparent',
              }}
              icon={showPassword ? <FiEye /> : <FiEyeOff />}
              onClick={toggleShowPassword}
            />
          </InputRightElement>
        )}
      </InputGroup>

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

export const Input = forwardRef(InputBase);
