import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`http://localhost:8000/api/v1/user/register`, formData, {
                headers: {
                    "Content-type": "application/json"
                }
            })
            if (res.data.success) {
                
                localStorage.setItem("verifyEmail", formData.email)  
                navigate('/verify')
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <Card className="w-full max-w-md shadow-xl border border-slate-200 rounded-2xl">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-bold text-slate-800">
                        Create Account
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                        Enter your details below to create your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="John"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pr-10 focus:ring-2 focus:ring-blue-500"
                                />
                                {
                                    showPassword ?
                                        <EyeOff
                                            onClick={() => setShowPassword(false)}
                                            className="w-5 h-5 text-slate-500 absolute right-3 top-3 cursor-pointer"
                                        />
                                        :
                                        <Eye
                                            onClick={() => setShowPassword(true)}
                                            className="w-5 h-5 text-slate-500 absolute right-3 top-3 cursor-pointer"
                                        />
                                }
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200"
                        >
                            {
                                loading ?
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        Please wait...
                                    </>
                                    :
                                    "Sign Up"
                            }
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-center text-sm text-slate-600">
                    Already have an account?
                    <Link
                        to={'/login'}
                        className="ml-1 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Signup
