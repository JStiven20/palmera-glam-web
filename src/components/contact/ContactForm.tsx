
import React from 'react';
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
import { toast } from '@/hooks/use-toast';
import { verifyRecaptcha } from '@/utils/recaptcha';

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
    // Verify reCAPTCHA
    try {
      const isVerified = await verifyRecaptcha();
      
      if (!isVerified) {
        toast({
          title: language === 'es' ? 'Error de verificación' : 'Verification Error',
          description: language === 'es' 
            ? 'Por favor, verifica que eres humano.' 
            : 'Please verify that you are a human.',
          variant: 'destructive',
        });
        return;
      }

      // Form submission logic
      console.log('Form data:', data);
      
      // In a real application, you would send the data to your backend here
      // await submitContactForm(data);
      
      // Show success message
      toast({
        title: language === 'es' ? '¡Mensaje enviado!' : 'Message Sent!',
        description: language === 'es' 
          ? 'Gracias por contactarnos. Te responderemos pronto.' 
          : 'Thank you for contacting us. We will respond shortly.',
        duration: 5000,
      });
      
      // Reset form
      form.reset();
      
      // Track lead event (uncomment when Meta Pixel is set up)
      // import { trackLead } from '../utils/metaEvents';
      // trackLead('contact', 'form');
      
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: language === 'es' ? 'Error' : 'Error',
        description: language === 'es' 
          ? 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.' 
          : 'There was an error sending your message. Please try again.',
        variant: 'destructive',
      });
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
          
          <div id="recaptcha" className="g-recaptcha mb-4"></div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-palmera-olive text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
          >
            {t('contact.send')}
          </button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
