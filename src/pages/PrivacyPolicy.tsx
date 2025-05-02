
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const PrivacyPolicy: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-playfair mb-6 text-center">
            {language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
          </h1>
          
          <div className="prose max-w-none">
            {language === 'es' ? (
              <>
                <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
                
                <h2>1. Información que recopilamos</h2>
                <p>En Palmera Estudio, recopilamos información personal que usted nos proporciona directamente, como:</p>
                <ul>
                  <li>Información de contacto (nombre, dirección de correo electrónico, número de teléfono)</li>
                  <li>Información de perfil (historial de citas, servicios utilizados)</li>
                  <li>Información de pago (para procesar reservas y compras)</li>
                </ul>
                
                <h2>2. Cómo utilizamos su información</h2>
                <p>Utilizamos su información personal para:</p>
                <ul>
                  <li>Proporcionar, mantener y mejorar nuestros servicios</li>
                  <li>Procesar reservas y transacciones</li>
                  <li>Enviar confirmaciones, actualizaciones y recordatorios de citas</li>
                  <li>Responder a sus comentarios y preguntas</li>
                  <li>Enviar información sobre ofertas especiales y promociones (con su consentimiento)</li>
                  <li>Cumplir con nuestras obligaciones legales</li>
                </ul>
                
                <h2>3. Compartición de información</h2>
                <p>No vendemos ni alquilamos su información personal a terceros. Podemos compartir su información con:</p>
                <ul>
                  <li>Proveedores de servicios que nos ayudan a operar nuestro negocio</li>
                  <li>Autoridades legales cuando sea requerido por ley</li>
                </ul>
                
                <h2>4. Sus derechos</h2>
                <p>Según el RGPD, usted tiene derecho a:</p>
                <ul>
                  <li>Acceder a su información personal</li>
                  <li>Rectificar información inexacta</li>
                  <li>Solicitar la eliminación de sus datos</li>
                  <li>Oponerse al procesamiento de sus datos</li>
                  <li>Solicitar la portabilidad de sus datos</li>
                  <li>Retirar su consentimiento en cualquier momento</li>
                </ul>
                
                <h2>5. Seguridad de datos</h2>
                <p>Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, pérdida o alteración.</p>
                
                <h2>6. Cambios a esta política</h2>
                <p>Podemos actualizar esta Política de Privacidad ocasionalmente. La versión actualizada se indicará con una fecha de "Última actualización" revisada.</p>
                
                <h2>7. Contacto</h2>
                <p>Si tiene preguntas sobre esta Política de Privacidad o nuestras prácticas de datos, contáctenos en:</p>
                <p>Email: info@palmeraestudio.com<br />Teléfono: +34 123 456 789</p>
              </>
            ) : (
              <>
                <p>Last updated: {new Date().toLocaleDateString('en-US')}</p>
                
                <h2>1. Information We Collect</h2>
                <p>At Palmera Estudio, we collect personal information that you provide to us directly, such as:</p>
                <ul>
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Profile information (appointment history, services used)</li>
                  <li>Payment information (to process bookings and purchases)</li>
                </ul>
                
                <h2>2. How We Use Your Information</h2>
                <p>We use your personal information to:</p>
                <ul>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process bookings and transactions</li>
                  <li>Send appointment confirmations, updates, and reminders</li>
                  <li>Respond to your comments and questions</li>
                  <li>Send information about special offers and promotions (with your consent)</li>
                  <li>Comply with our legal obligations</li>
                </ul>
                
                <h2>3. Information Sharing</h2>
                <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
                <ul>
                  <li>Service providers who help us operate our business</li>
                  <li>Legal authorities when required by law</li>
                </ul>
                
                <h2>4. Your Rights</h2>
                <p>Under GDPR, you have the right to:</p>
                <ul>
                  <li>Access your personal information</li>
                  <li>Rectify inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Request portability of your data</li>
                  <li>Withdraw your consent at any time</li>
                </ul>
                
                <h2>5. Data Security</h2>
                <p>We implement technical and organizational security measures to protect your personal information against unauthorized access, loss, or alteration.</p>
                
                <h2>6. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last updated" date.</p>
                
                <h2>7. Contact Us</h2>
                <p>If you have questions about this Privacy Policy or our data practices, please contact us at:</p>
                <p>Email: info@palmeraestudio.com<br />Phone: +34 123 456 789</p>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
