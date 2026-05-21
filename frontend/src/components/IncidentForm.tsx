import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { incidentTypeOptions, priorityOptions } from '../types/options';
import { IncidentFormData, incidentFormSchema } from '../validations/incidentSchema';

interface IncidentFormProps {
  initialValues?: Partial<IncidentFormData>;
  isSubmitting?: boolean;
  submitLabel: string;
  onSubmit: (data: IncidentFormData) => Promise<void> | void;
}

const defaultValues: IncidentFormData = {
  title: '',
  description: '',
  clientName: '',
  unitCode: '',
  type: 'INVERTER_OFFLINE',
  priority: 'MEDIUM'
};

export function IncidentForm({
  initialValues,
  isSubmitting = false,
  submitLabel,
  onSubmit
}: IncidentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IncidentFormData>({
    resolver: zodResolver(incidentFormSchema),
    defaultValues: { ...defaultValues, ...initialValues }
  });

  return (
    <form className="incident-form" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titulo
        <input {...register('title')} placeholder="Inversor offline" />
        {errors.title && <span className="field-error">{errors.title.message}</span>}
      </label>

      <label>
        Cliente
        <input {...register('clientName')} placeholder="Joao da Silva" />
        {errors.clientName && <span className="field-error">{errors.clientName.message}</span>}
      </label>

      <label>
        Unidade consumidora
        <input {...register('unitCode')} placeholder="3020547862" />
      </label>

      <div className="form-grid">
        <label>
          Tipo
          <select {...register('type')}>
            {incidentTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.type && <span className="field-error">{errors.type.message}</span>}
        </label>

        <label>
          Prioridade
          <select {...register('priority')}>
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.priority && <span className="field-error">{errors.priority.message}</span>}
        </label>
      </div>

      <label>
        Descricao
        <textarea
          {...register('description')}
          placeholder="Descreva o problema observado e as evidencias iniciais."
          rows={5}
        />
        {errors.description && <span className="field-error">{errors.description.message}</span>}
      </label>

      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
