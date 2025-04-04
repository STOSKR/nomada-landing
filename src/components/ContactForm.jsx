import { useState } from 'react';
import styled from 'styled-components';
import { sendContactEmail } from '../services/emailjs';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
    success: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null, success: false });

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setStatus({
          submitting: false,
          submitted: true,
          error: null,
          success: true
        });
        // Limpiar el formulario
        setFormData({
          from_name: '',
          from_email: '',
          message: ''
        });
      } else {
        throw new Error(result.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      setStatus({
        submitting: false,
        submitted: true,
        error: error.message,
        success: false
      });
    }
  };

  return (
    <FormContainer>
      <FormTitle>Envíanos un mensaje</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="from_name">Nombre</Label>
          <Input
            type="text"
            id="from_name"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
            required
            disabled={status.submitting}
            placeholder="Tu nombre"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="from_email">Email</Label>
          <Input
            type="email"
            id="from_email"
            name="from_email"
            value={formData.from_email}
            onChange={handleChange}
            required
            disabled={status.submitting}
            placeholder="tu@email.com"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">Mensaje</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={status.submitting}
            placeholder="¿En qué podemos ayudarte?"
            rows="4"
          />
        </FormGroup>

        <SubmitButton
          type="submit"
          disabled={status.submitting}
          as={motion.button}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {status.submitting ? (
            <>
              <LoadingSpinner />
              Enviando...
            </>
          ) : 'Enviar mensaje'}
        </SubmitButton>

        {status.submitted && (
          <StatusMessage
            success={status.success}
            as={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {status.success
              ? '¡Mensaje enviado! Te responderemos pronto.'
              : `Error: ${status.error}`}
          </StatusMessage>
        )}
      </Form>
    </FormContainer>
  );
};

// Estilos
const FormContainer = styled.div`
  width: 100%;
`;

const FormTitle = styled.h3`
  font-size: 1.6rem;
  color: #444;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #555;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  font-size: 16px;
  color: #333;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: #888;
  }
  
  &:focus {
    outline: none;
    border-color: var(--gradient-start);
    box-shadow: 0 0 0 2px rgba(123, 179, 213, 0.3);
    color: #333;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    color: #333;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  font-size: 16px;
  color: #333;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: #888;
  }
  
  &:focus {
    outline: none;
    border-color: var(--gradient-start);
    box-shadow: 0 0 0 2px rgba(123, 179, 213, 0.3);
    color: #333;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    color: #333;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background: transparent ;
  color: var(--text);
  border: 2px solid var(--primary);
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgb(229, 230, 230);
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    box-shadow: 0 6px 20px rgb(229, 230, 230);
    border: 2px solid var(--primary);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const StatusMessage = styled.div`
  padding: 1rem 1.5rem;
  margin-top: 1.5rem;
  border-radius: 10px;
  text-align: center;
  background-color: ${props => props.success ? 'rgba(46, 213, 115, 0.1)' : 'rgba(255, 82, 82, 0.1)'};
  color: ${props => props.success ? '#2ecc71' : '#ff5252'};
  border-left: 4px solid ${props => props.success ? '#2ecc71' : '#ff5252'};
  font-weight: 500;
`;

export default ContactForm; 