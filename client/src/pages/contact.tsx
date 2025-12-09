import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { SectionHeader } from "@/components/section-header";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

const contactInfo = [
  {
    icon: MapPin,
    title: "Office Address",
    details: ["123 Main Street, Suite 100", "Metropolitan City, ST 12345"],
  },
  {
    icon: Phone,
    title: "Phone Number",
    details: ["(555) 123-4567", "(555) 987-6543 (Cell)"],
  },
  {
    icon: Mail,
    title: "Email Address",
    details: ["sarah@mitchellrealty.com", "info@mitchellrealty.com"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
  },
];

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <section className="bg-primary py-12 md:py-16" data-testid="section-contact-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4" data-testid="text-contact-title">
            Get in Touch
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Ready to start your real estate journey? I'm here to help you every step of the way.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background" data-testid="section-contact-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Send Me a Message
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mb-6" />
              <p className="text-muted-foreground mb-8">
                Whether you're looking to buy, sell, or just have questions about the market, 
                I'd love to hear from you. Fill out the form below and I'll get back to you 
                within 24 hours.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Smith"
                            className="h-12"
                            data-testid="input-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              className="h-12"
                              data-testid="input-email"
                              {...field}
                            />
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
                          <FormLabel className="font-semibold">Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="(555) 123-4567"
                              className="h-12"
                              data-testid="input-phone"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your real estate needs..."
                            className="min-h-[150px] resize-none"
                            data-testid="input-message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent text-accent-foreground h-14 text-lg font-semibold"
                    disabled={mutation.isPending}
                    data-testid="button-submit"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Contact Information
                </h2>
                <div className="w-16 h-1 bg-accent rounded-full mb-6" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card key={index} data-testid={`card-contact-info-${index}`}>
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                            {info.details.map((detail, i) => (
                              <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card className="overflow-hidden" data-testid="card-map">
                <CardHeader className="pb-0">
                  <CardTitle className="text-lg">Office Location</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                    <div className="text-center z-10">
                      <MapPin className="h-12 w-12 text-accent mx-auto mb-3" />
                      <p className="font-medium text-foreground">123 Main Street</p>
                      <p className="text-sm text-muted-foreground">Metropolitan City, ST 12345</p>
                      <Button variant="outline" size="sm" className="mt-4" data-testid="button-get-directions">
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
