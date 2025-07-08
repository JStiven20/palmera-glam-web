import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";

const ContactInfo = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-3">{t("contact.address")}</h3>
          <p className="text-gray-600">Carrer de Napols 237</p>
          <p className="text-gray-600">08013 Barcelona, Spain</p>
          <p className="text-gray-600 mt-4">
            <span className="font-medium">Email:</span> info@palmeraestudio.es
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Tel:</span> +34 631 39 45 72
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-3">{t("contact.hours")}</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{t("contact.monday")}:</span>
              <span>10:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span>{t("contact.tuesday")}:</span>
              <span>10:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span>{t("contact.wednesday")}:</span>
              <span>10:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span>{t("contact.thursday")}:</span>
              <span>10:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span>{t("contact.friday")}:</span>
              <span>10:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span>{t("contact.saturday")}:</span>
              <span>9:00 - 15:00</span>
            </div>
            <div className="flex justify-between">
              <span>{t("contact.sunday")}:</span>
              <span>{t("contact.closed")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.7855446003305!2d2.169601776784979!3d41.40046347129825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2e9d2c75b91%3A0x88167145905e7c65!2sCarrer%20de%20N%C3%A0pols%2C%20237%2C%20L&#39;Eixample%2C%2008013%20Barcelona!5e0!3m2!1ses!2ses!4v1752010335914!5m2!1ses!2ses"
          width="100%"
          height="250"
          style={{ border: 0, borderRadius: "0.5rem" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={
            language === "es"
              ? "Mapa de ubicación de Palmera Estudio"
              : "Map location of Palmera Estudio"
          }
        ></iframe>
      </div>
    </div>
  );
};

export default ContactInfo;
