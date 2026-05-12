import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Eye, EyeOff, Loader2 } from "lucide-react";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/user/change-password/${email}`,
        formData
      );

      if (res.data.success) {
        toast.success(res.data.message);

        localStorage.removeItem("resetEmail");

        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Change Password</CardTitle>

          <CardDescription>
            Create your new password
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>New Password</Label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />

              {showPassword ? (
                <EyeOff
                  onClick={() => setShowPassword(false)}
                  className="absolute right-3 top-3 w-5 h-5 cursor-pointer"
                />
              ) : (
                <Eye
                  onClick={() => setShowPassword(true)}
                  className="absolute right-3 top-3 w-5 h-5 cursor-pointer"
                />
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Confirm Password</Label>

            <Input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleSubmit}
            className="w-full bg-pink-600 hover:bg-pink-500"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChangePassword;