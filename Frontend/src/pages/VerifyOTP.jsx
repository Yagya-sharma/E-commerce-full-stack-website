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
import { Loader2 } from "lucide-react";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const handleVerify = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/user/verify-otp/${email}`,
        { otp }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/change-password");
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
          <CardTitle>Verify OTP</CardTitle>

          <CardDescription>
            Enter the OTP sent to your email
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-2">
            <Label>OTP</Label>

            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleVerify}
            className="w-full bg-pink-600 hover:bg-pink-500"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyOTP;