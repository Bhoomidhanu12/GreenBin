
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { User, Mail, Home, Phone, CalendarDays, Info, Pen, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  bio: z.string().optional(),
  birthdate: z.string().optional(),
  receiveNotifications: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const AddProfile = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const navigate = useNavigate();

  const defaultValues: Partial<FormValues> = {
    fullName: "",
    email: "",
    address: "",
    phone: "",
    bio: "",
    birthdate: "",
    receiveNotifications: true,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: FormValues) => {
    // This would connect to a backend service in a real application
    console.log("Profile data:", data);
    
    toast.success("Profile created successfully!", {
      description: "Your profile has been created and saved.",
    });
    
    // Redirect to profile page after submission
    setTimeout(() => {
      navigate("/profile");
    }, 1500);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to storage
      // For now, we'll just create a local URL
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <UserPlus className="mr-2 h-7 w-7 text-greenbin-primary" />
              Create Your Profile
            </h1>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="text-sm"
            >
              Cancel
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 mb-8">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 border-4 border-greenbin-light">
                <AvatarImage src={avatarUrl} alt="Profile" />
                <AvatarFallback className="bg-greenbin-primary text-white text-2xl">
                  {form.watch("fullName") 
                    ? form.watch("fullName").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
                    : "EN"}
                </AvatarFallback>
              </Avatar>
              
              <div className="relative">
                <Input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center"
                  onClick={() => document.getElementById("avatar")?.click()}
                >
                  <Pen className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="bg-greenbin-light dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                <h3 className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  <Info className="h-4 w-4 mr-1 text-greenbin-primary" />
                  Why create a profile?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Creating a profile helps us personalize your recycling experience,
                  track your environmental impact, and award you points for your
                  recycling efforts. Your information is kept secure and private.
                </p>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <User className="h-4 w-4 mr-1 text-greenbin-primary" />
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                      <FormLabel className="flex items-center">
                        <Mail className="h-4 w-4 mr-1 text-greenbin-primary" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Home className="h-4 w-4 mr-1 text-greenbin-primary" />
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="123 Green Street" {...field} />
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
                      <FormLabel className="flex items-center">
                        <Phone className="h-4 w-4 mr-1 text-greenbin-primary" />
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-1 text-greenbin-primary" />
                        Date of Birth
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        Optional: For demographic purposes only
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Info className="h-4 w-4 mr-1 text-greenbin-primary" />
                      Bio
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your recycling journey and environmental interests..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Share your experience and motivation for using Enhanced GreenBin
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="receiveNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Receive notifications and updates
                      </FormLabel>
                      <FormDescription>
                        Get notified about recycling tips, events, and your impact milestones
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <div className="pt-4 flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-greenbin-primary hover:bg-greenbin-primary/90 text-white"
                >
                  Create Profile
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AddProfile;
