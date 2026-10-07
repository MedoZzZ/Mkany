"use client";

import { AuthFormSplitScreen } from "@/components/ui/login";
import { PackageOpen } from "lucide-react";
import { useRouter } from "next/navigation";

// A simple utility to simulate an API call
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function AuthFormSplitScreenDemo() {
  const router = useRouter();

  // Define the submission handler
  const handleLogin = async (data: any) => {
    console.log("Form submitted with:", data);
    // Simulate network request
    await sleep(1000); // Shorter sleep for better UX
    // Redirect to dashboard (Module Center)
    router.push("/dashboard");
  };

  return (
    <AuthFormSplitScreen
      logo={
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg text-primary-foreground">
            <PackageOpen className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-wider">MKANY ERP</span>
        </div>
      }
      title="مرحباً بعودتك"
      description="سجل الدخول إلى حسابك للمتابعة"
      imageSrc="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      imageAlt="A modern office space with clean architectural lines."
      onSubmit={handleLogin}
      forgotPasswordHref="#"
      createAccountHref="#"
    />
  );
}
