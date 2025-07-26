
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name is too short" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message is too short" }),
  consent: z.boolean().refine(val => val === true, {
    message: "You must accept the privacy policy",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      consent: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Save to Supabase
      const { error } = await supabase
        .from('contacts')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          message: data.message,
        });

      if (error) {
        console.error('Supabase error:', error);
        toast.error(language === 'es' 
          ? 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.' 
          : 'Error sending message. Please try again.');
        return;
      }

      // Show success message
      toast.success(language === 'es' 
        ? '¡Mensaje enviado! Gracias por contactarnos. Te responderemos pronto.' 
        : 'Message sent! Thank you for contacting us. We will respond shortly.');
      
      // Reset form
      form.reset();
      
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(language === 'es' 
        ? 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.' 
        : 'There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('contact.name')}</FormLabel>
                <FormControl>
                  <Input placeholder={language === 'es' ? 'Tu nombre' : 'Your name'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('contact.email')}</FormLabel>
                <FormControl>
                  <Input placeholder={language === 'es' ? 'Tu correo electrónico' : 'Your email'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('contact.phone')}</FormLabel>
                <FormControl>
                  <Input placeholder={language === 'es' ? 'Tu teléfono (opcional)' : 'Your phone (optional)'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('contact.message')}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={language === 'es' ? 'Tu mensaje' : 'Your message'} 
                    className="min-h-32" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    {language === 'es' 
                      ? 'Acepto la política de privacidad y el procesamiento de mis datos personales'
                      : 'I accept the privacy policy and the processing of my personal data'}
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3 bg-palmera-olive text-white font-medium rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (language === 'es' ? 'Enviando...' : 'Sending...') : t('contact.send')}
          </button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
