import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputProps,
  Select,
  SelectProps,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';

interface FormElementProps extends InputProps {
  element?: 'input' | 'select' | 'textarea';
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setValue(e.target.value);
  };

  const renderFormElement = () => {
    switch (element) {
      case 'input':
        return <Input onChange={onChange} {...restProps} />;
      case 'textarea':
        return (
          <Textarea onChange={onChange} {...(restProps as TextareaProps)} />
        );
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
