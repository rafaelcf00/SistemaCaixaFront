import { InputHTMLAttributes } from "react";
import { formatReal } from "../../../../app/util/money/index";
import { FormatUtils } from "@4us-dev/utils";
import { maskUpperCase } from "../../../../app/util/maskUpperCase";

const formatUtils = new FormatUtils();

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  formatter?: (value: string) => string;
  customClass?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  error,
  formatter,
  onChange,
  customClass,
  ...InputProps
}: InputProps) => {
  const onInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const formattedValue = (formatter && formatter(value as string)) || value;

    if (onChange !== undefined) {
      onChange({
        ...e,
        target: {
          name,
          value: formattedValue,
        },
      });
    }
  };

  return (
    <>
      <div className="flex flex-col mb-4">
        <label htmlFor={id} className="font-bold">
          {label}
        </label>
        <input
          className={`bg-white border-2 border-solid border-gray-200 mt-2 p-3 ${customClass}`}
          onChange={onInputChange}
          {...InputProps}
          id={id}
        />
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </>
  );
};

export default Input;

export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={formatReal} />;
};

export const InputUpperCase: React.FC<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={maskUpperCase} />;
};

export const InputCPF: React.FC<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={formatUtils.formatCPF} />;
};

export const InputTelefone: React.FC<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={formatUtils.formatPhone} />;
};

export const InputDate: React.FC<InputProps> = (props: InputProps) => {
  const formatData = (value: string) => {
    if (!value) {
      return "";
    }
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1");
  };

  return <Input {...props} maxLength={10} formatter={formatData} />;
};
