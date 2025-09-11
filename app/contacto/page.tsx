'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, CheckCircleIcon } from '@/components/icons';

export default function ContactoPage() {
  const [currentBgClass, setCurrentBgClass] = useState('from-[#000428] to-[#004e92]');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBackgroundChange = (bgClass: string) => {
    setCurrentBgClass(bgClass);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      alert('Mensaje enviado correctamente. Nos pondremos en contacto en las próximas 24 horas.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        message: ''
      });
    } catch (error) {
      alert('Error al enviar el mensaje. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MailIcon,
      title: 'Email',
      content: 'nicolas@iaenblanco.com',
      description: 'Respuesta en 24 horas',
      href: 'mailto:nicolas@iaenblanco.com'
    },
    {
      icon: PhoneIcon,
      title: 'WhatsApp',
      content: '+56(9) 7768 4800',
      description: 'Disponible Lun-Vie: 9:00-18:00',
      href: 'https://wa.me/56977684800'
    },
    {
      icon: MapPinIcon,
      title: 'Reuniones',
      content: 'Reuniones Virtuales',
      description: 'Videoconferencias y llamadas online',
      href: '#'
    },
    {
      icon: ClockIcon,
      title: 'Horario',
      content: 'Lun-Vie: 9:00-18:00',
      description: 'Soporte técnico extendido',
      href: '#'
    }
  ];

  const projectTypes = [
    'Desarrollo Web con IA',
    'Consultoría IA',
    'Automatización de Procesos',
    'Chatbots y Asistentes Virtuales',
    'Análisis de Datos',
    'Soluciones Personalizadas',
    'Educación y Formación',
    'Otro'
  ];


  const faq = [
    {
      question: '¿Cuánto tiempo toma responder a una consulta?',
      answer: 'Nos comprometemos a responder todas las consultas en un máximo de 24 horas laborables.'
    },
    {
      question: '¿Ofrecen reuniones presenciales?',
      answer: 'Solo en procesos avanzados en Santiago de Chile. La mayoría de nuestras reuniones son virtuales para mayor comodidad.'
    },
    {
      question: '¿Trabajan con empresas internacionales?',
      answer: 'Sí, hemos trabajado con clientes de diferentes países de Europa y Latinoamérica.'
    },
    {
      question: '¿Cuál es el proceso para empezar un proyecto?',
      answer: '1) Consulta inicial, 2) Análisis de requisitos, 3) Propuesta detallada, 4) Inicio del desarrollo.'
    }
  ];

  return (
    <div className={`min-h-screen w-full text-white font-sans transition-all duration-500 bg-gradient-to-br ${currentBgClass}`}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 isolate">
        <Header onBackgroundChange={handleBackgroundChange} />

        {/* Hero Section */}
        <section className="pt-24 pb-12" aria-labelledby="contacto-hero-heading">
          <div className="container mx-auto px-6 text-center">
          <div className="mb-6" aria-hidden="true">
            <PhoneIcon className="h-20 w-20 mx-auto text-cyan-400" />
          </div>
            <h1 id="contacto-hero-heading" className="text-4xl md:text-6xl font-bold mb-6">
              Hablemos de tu <span className="text-cyan-400">Proyecto</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              ¿Tienes una idea innovadora? ¿Necesitas ayuda con la implementación de IA?
              Estamos aquí para ayudarte a transformar tu visión en realidad.
            </p>
            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 max-w-2xl mx-auto">
              <p className="text-lg text-cyan-400 font-semibold mb-2">¿Prefieres una llamada rápida?</p>
              <p className="text-gray-300 mb-4">Agenda una consulta de 15 minutos sin compromiso.</p>
              <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-6 rounded-lg transition-transform duration-300 hover:scale-105">
                Agendar Llamada
              </button>
            </div>
          </div>
        </section>

        {/* Información de Contacto */}
        <section className="py-20 bg-black/20" aria-labelledby="contacto-info-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 id="contacto-info-heading" className="text-3xl md:text-4xl font-bold mb-12 text-center">Formas de Contactarnos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 text-center hover:border-cyan-400 transition-colors">
                      <IconComponent className="h-12 w-12 mx-auto text-cyan-400 mb-4" />
                      <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                      {info.href !== '#' ? (
                        <a
                          href={info.href}
                          className="text-gray-300 hover:text-cyan-400 transition-colors block mb-1"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <div className="text-gray-300 mb-1">{info.content}</div>
                      )}
                      <div className="text-sm text-gray-400">{info.description}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Formulario de Contacto */}
        <section className="py-20" aria-labelledby="contacto-form-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 id="contacto-form-heading" className="text-3xl md:text-4xl font-bold mb-8 text-center">Cuéntanos sobre tu Proyecto</h2>

              <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                  aria-label="Formulario de contacto detallado"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Nombre Completo <span className="text-red-400" aria-label="obligatorio">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full bg-white/10 border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 transition-colors ${errors.name ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-cyan-400'}`}
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
                        className={`w-full bg-white/10 border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 transition-colors ${errors.email ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-cyan-400'}`}
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
                        placeholder="+56 9 1234 5678"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Empresa/Organización
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Tipo de Proyecto
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors text-white"
                      >
                        <option value="" className="text-gray-400">Selecciona el tipo de proyecto</option>
                        {projectTypes.map(type => (
                          <option key={type} value={type} className="text-white bg-gray-800">{type}</option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Detalles del Proyecto <span className="text-red-400" aria-label="obligatorio">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full bg-white/10 border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 transition-colors ${errors.message ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-cyan-400'}`}
                      aria-required="true"
                      aria-describedby={errors.message ? "message-error" : undefined}
                      aria-invalid={!!errors.message}
                      placeholder="Cuéntanos sobre tu proyecto, desafíos actuales, objetivos que quieres lograr, y cualquier detalle específico que debamos conocer..."
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
                    className={`w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white font-bold py-4 px-8 rounded-lg transition-transform duration-300 hover:scale-105 text-lg shadow-[0_0_20px_rgba(0,255,255,0.6)] focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                    aria-describedby="submit-button-description"
                  >
                    {isSubmitting ? 'Enviando Mensaje...' : 'Enviar Consulta Detallada'}
                  </button>
                  <p id="submit-button-description" className="sr-only">
                    Al enviar este formulario, aceptas que nos pongamos en contacto contigo para discutir tu proyecto en detalle
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-black/20" aria-labelledby="contacto-faq-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 id="contacto-faq-heading" className="text-3xl md:text-4xl font-bold mb-12 text-center">Preguntas Frecuentes</h2>
              <div className="space-y-6">
                {faq.map((item, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-bold mb-3 text-cyan-400">{item.question}</h3>
                    <p className="text-gray-300">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        <Footer />
      </div>
    </div>
  );
}
