import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  formatter?: (value: string) => string;
  customClass?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  error,
  formatter,
  onChange,
  customClass,
  ...TextAreaProps
}: TextAreaProps) => {
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
      <textarea
        className={`bg-gray-100 mt-2 p-3 ${customClass}`}
        onChange={onInputChange}
        {...TextAreaProps}
      ></textarea>
      {error && <p className="text-red-600">{error}</p>}
    </>
  );
};

export default TextArea;
