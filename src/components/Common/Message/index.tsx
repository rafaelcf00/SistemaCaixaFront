interface MessageProps {
  tipo: string;
  field?: string;
  texto: string;
}

export interface Alert {
  tipo: string;
  field?: string;
  texto: string;
}

export const Message: React.FC<MessageProps> = ({ texto, field, tipo }) => {
  return (
    <article className={`bg-${tipo} text-white p-2 shadow-xl`}>
      <div>
        {field && `${field} : `}
        {texto}
      </div>
    </article>
  );
};
