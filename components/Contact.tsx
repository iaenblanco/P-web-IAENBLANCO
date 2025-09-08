'use client';

import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Mensaje enviado correctamente. Nos pondremos en contacto pronto.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Error al enviar el mensaje. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20" aria-labelledby="contact-heading">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-2">¿Listo para Empezar?</h2>
          <p className="text-gray-400">Danos algunos detalles sobre tu proyecto y nos pondremos en contacto a la brevedad.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
            aria-label="Formulario de contacto"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Nombre <span className="text-red-400" aria-label="obligatorio">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full bg-white/10 border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 transition-colors ${
                  errors.name
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-white/20 focus:ring-cyan-400'
                }`}
                aria-required="true"
                aria-describedby={errors.name ? "name-error" : undefined}
                aria-invalid={!!errors.name}
                placeholder="Tu nombre completo"
              />
              {errors.name && (
                <p id="name-error" className="text-red-400 text-sm mt-1" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email <span className="text-red-400" aria-label="obligatorio">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full bg-white/10 border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 transition-colors ${
                  errors.email
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-white/20 focus:ring-cyan-400'
                }`}
                aria-required="true"
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={!!errors.email}
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p id="email-error" className="text-red-400 text-sm mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Mensaje <span className="text-red-400" aria-label="obligatorio">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full bg-white/10 border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 transition-colors ${
                  errors.message
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-white/20 focus:ring-cyan-400'
                }`}
                aria-required="true"
                aria-describedby={errors.message ? "message-error" : undefined}
                aria-invalid={!!errors.message}
                placeholder="Cuéntanos sobre tu idea o desafío..."
              />
              {errors.message && (
                <p id="message-error" className="text-red-400 text-sm mt-1" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105 text-lg shadow-[0_0_20px_rgba(0,255,255,0.6)] focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
              aria-describedby="submit-button-description"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
            <p id="submit-button-description" className="sr-only">
              Al enviar este formulario, aceptas que nos pongamos en contacto contigo para discutir tu proyecto
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
