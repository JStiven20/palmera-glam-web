
import React from 'react';
import { useLanguage, LanguageProvider } from '../contexts/LanguageContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const CookiePolicyContent: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-playfair mb-6 text-center">
            {language === 'es' ? 'Política de Cookies' : 'Cookie Policy'}
          </h1>
          
          <div className="prose max-w-none">
            {language === 'es' ? (
              <>
                <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
                
                <h2>1. ¿Qué son las cookies?</h2>
                <p>Las cookies son pequeños archivos de texto que los sitios web colocan en su dispositivo para almacenar información o para ayudar a rastrear su actividad en el sitio. Las cookies son ampliamente utilizadas para hacer que los sitios web funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.</p>
                
                <h2>2. Cómo utilizamos las cookies</h2>
                <p>Palmera Estudio utiliza cookies para:</p>
                <ul>
                  <li>Cookies esenciales: necesarias para el funcionamiento básico del sitio</li>
                  <li>Cookies de preferencias: permiten recordar la información que cambia el comportamiento o aspecto del sitio</li>
                  <li>Cookies estadísticas: nos ayudan a entender cómo los visitantes interactúan con el sitio</li>
                  <li>Cookies de marketing: utilizadas para rastrear a los visitantes en los sitios web para mostrar anuncios relevantes</li>
                </ul>
                
                <h2>3. Meta Pixel</h2>
                <p>Nuestro sitio utiliza Meta Pixel para medir la eficacia de la publicidad y comprender las acciones que realizan las personas en nuestro sitio. Esto nos permite:</p>
                <ul>
                  <li>Medir el rendimiento de nuestros anuncios</li>
                  <li>Crear audiencias para anuncios futuros</li>
                  <li>Mejorar la experiencia del usuario en nuestro sitio</li>
                </ul>
                
                <h2>4. Cookies de terceros</h2>
                <p>Algunos de nuestros socios de confianza pueden configurar cookies en su dispositivo cuando visita nuestro sitio. Estos incluyen:</p>
                <ul>
                  <li>Google Analytics: para analizar el uso del sitio</li>
                  <li>Meta (Facebook): para publicidad y análisis</li>
                  <li>Booksy: para el sistema de reservas</li>
                </ul>
                
                <h2>5. Control de cookies</h2>
                <p>Puede configurar su navegador para rechazar todas o algunas cookies, o para alertarle cuando los sitios web establezcan o accedan a las cookies. Si deshabilita o rechaza las cookies, tenga en cuenta que algunas partes de este sitio pueden volverse inaccesibles o no funcionar correctamente.</p>
                
                <h2>6. Más información</h2>
                <p>Para obtener más información sobre cómo utilizamos las cookies, contáctenos en info@palmeraestudio.com.</p>
              </>
            ) : (
              <>
                <p>Last updated: {new Date().toLocaleDateString('en-US')}</p>
                
                <h2>1. What Are Cookies</h2>
                <p>Cookies are small text files that websites place on your device to store information or to help track your activity on the site. Cookies are widely used to make websites work more efficiently, as well as to provide information to the site owners.</p>
                
                <h2>2. How We Use Cookies</h2>
                <p>Palmera Estudio uses cookies for:</p>
                <ul>
                  <li>Essential cookies: needed for the basic functionality of the site</li>
                  <li>Preference cookies: allow the site to remember information that changes how the site behaves or looks</li>
                  <li>Statistics cookies: help us understand how visitors interact with the site</li>
                  <li>Marketing cookies: used to track visitors across websites to display relevant advertisements</li>
                </ul>
                
                <h2>3. Meta Pixel</h2>
                <p>Our site uses Meta Pixel to measure the effectiveness of advertising and understand the actions people take on our site. This allows us to:</p>
                <ul>
                  <li>Measure the performance of our ads</li>
                  <li>Build audiences for future ads</li>
                  <li>Improve the user experience on our site</li>
                </ul>
                
                <h2>4. Third-Party Cookies</h2>
                <p>Some of our trusted partners may set cookies on your device when you visit our site. These include:</p>
                <ul>
                  <li>Google Analytics: to analyze site usage</li>
                  <li>Meta (Facebook): for advertising and analytics</li>
                  <li>Booksy: for the booking system</li>
                </ul>
                
                <h2>5. Managing Cookies</h2>
                <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this site may become inaccessible or not function properly.</p>
                
                <h2>6. More Information</h2>
                <p>For more information about how we use cookies, please contact us at info@palmeraestudio.com.</p>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const CookiePolicy: React.FC = () => {
  return (
    <LanguageProvider>
      <CookiePolicyContent />
    </LanguageProvider>
  );
};

export default CookiePolicy;
