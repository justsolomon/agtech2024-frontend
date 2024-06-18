import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputProps,
  Select,
  SelectProps,
} from '@chakra-ui/react';

interface FormElementProps extends InputProps {
  element?: 'input' | 'select';
  label: string;
  setValue: (value: string) => void;
  options?: string[];
}

const FormElement = ({
  element = 'input',
  label,
  setValue,
  options = [],
  ...restProps
}: FormElementProps) => {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setValue(e.target.value);
  };

  const renderFormElement = () => {
    switch (element) {
      case 'input':
        return <Input onChange={onChange} {...restProps} />;
      case 'select':
        return (
          <Select onChange={onChange} {...(restProps as SelectProps)}>
            {options.map((option) => (
              <Box as="option" key={option} value={option}>
                {option}
              </Box>
            ))}
          </Select>
        );
    }
  };

  return (
    <FormControl isRequired={restProps.isRequired}>
      <FormLabel>{label}</FormLabel>
      {renderFormElement()}
    </FormControl>
  );
};

export default FormElement;
