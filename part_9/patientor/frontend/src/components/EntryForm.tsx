import { useState } from 'react';
import { useParams } from 'react-router-dom';
import diagnoseServices from '../services/diagnoses';
import { EntryFormData } from '../types';

const EntryForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<EntryFormData>({
    type: 'HealthCheck',
    description: '',
    date: '',
    specialist: '',
  });

  const handleChange = (field: string, value: string | number | object) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await diagnoseServices.create(id, formData);
    } catch (error) {
      console.error(error);
    }
  };

  const renderAdditionalFields = () => {
    switch (formData.type) {
      case 'Hospital':
        return (
          <>
            <h3>Discharge Details</h3>
            <InputField
              label='Discharge Date'
              type='date'
              value={formData.discharge?.date || ''}
              onChange={(value) =>
                handleChange('discharge', {
                  ...formData.discharge,
                  date: value,
                })
              }
            />
            <InputField
              label='Criteria'
              type='text'
              value={formData.discharge?.criteria || ''}
              onChange={(value) =>
                handleChange('discharge', {
                  ...formData.discharge,
                  criteria: value,
                })
              }
            />
          </>
        );
      case 'OccupationalHealthcare':
        return (
          <>
            <h3>Sick Leave</h3>
            <InputField
              label='Start Date'
              type='date'
              value={formData.sickLeave?.startDate || ''}
              onChange={(value) =>
                handleChange('sickLeave', {
                  ...formData.sickLeave,
                  startDate: value,
                })
              }
            />
            <InputField
              label='End Date'
              type='date'
              value={formData.sickLeave?.endDate || ''}
              onChange={(value) =>
                handleChange('sickLeave', {
                  ...formData.sickLeave,
                  endDate: value,
                })
              }
            />
            <InputField
              label='Employer Name'
              type='text'
              value={formData.employerName || ''}
              onChange={(value) => handleChange('employerName', value)}
            />
          </>
        );
      default: // HealthCheck
        return (
          <InputField
            label='Health Rating'
            type='number'
            min={0}
            max={3}
            value={formData.healthCheckRating || 0}
            onChange={(value) =>
              handleChange('healthCheckRating', parseInt(value as string))
            }
          />
        );
    }
  };

  return (
    <div>
      <h3>Add Entry</h3>
      <div>
        <label>Type: </label>
        <select
          value={formData.type}
          onChange={(e) => handleChange('type', e.target.value)}
        >
          <option value='HealthCheck'>Health Check</option>
          <option value='OccupationalHealthcare'>
            Occupational Healthcare
          </option>
          <option value='Hospital'>Hospital</option>
        </select>
      </div>

      <form onSubmit={submitForm}>
        <InputField
          label='Description'
          type='text'
          value={formData.description}
          onChange={(value) => handleChange('description', value)}
          required
        />
        <InputField
          label='Date'
          type='date'
          value={formData.date}
          onChange={(value) => handleChange('date', value)}
          required
        />
        <InputField
          label='Specialist'
          type='text'
          value={formData.specialist}
          onChange={(value) => handleChange('specialist', value)}
          required
        />
        <InputField
          label='Diagnosis Code'
          type='text'
          value={formData.diagnosisCode || ''}
          onChange={(value) => handleChange('diagnosisCode', value)}
        />

        {renderAdditionalFields()}

        <button type='submit'>Add Entry</button>
      </form>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (value: string | number) => void;
  required?: boolean;
  min?: number;
  max?: number;
}

const InputField = ({
  label,
  type,
  value,
  onChange,
  required,
  min,
  max,
}: InputFieldProps) => (
  <div>
    <label>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      min={min}
      max={max}
    />
  </div>
);

export default EntryForm;
