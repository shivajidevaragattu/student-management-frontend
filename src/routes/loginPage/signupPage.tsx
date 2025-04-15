"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Link, Loader2 } from "lucide-react"
import axios from "axios"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { useNavigate } from 'react-router-dom'
import { Textarea } from "../../components/ui/textarea"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  address: z.string().min(1, { message: "Address is required" }),
})

type FormValues = z.infer<typeof formSchema>

const SignUp = () => {
    const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState("")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      role: "",
      address: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)

    try {
      //TODO: Add API endpoint here
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const response = await axios.post(`http://localhost:${process.env.PORT as string}/api/signup`, data)
      if (response.status === 201) {
        console.log("Account created successfully", response.data)
        setIsLoading(false)
        setServerError("")
        navigate('/login')
      } else if (response.status === 400) {
        setServerError("Invalid input. Please check your data and try again.")
      } else if (response.status === 409) {
        setServerError("Email already exists. Please use a different email.")
      } else {
        setServerError("An unexpected error occurred while creating your account")
      }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            setServerError(error.response?.data.message || "An error occurred")
          } else {
            setServerError("An unexpected error occurred")
          }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-screen flex items-center justify-center min-h-screen bg-slate-50 p-4n">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" {...form.register("firstName")} />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" {...form.register("lastName")} />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...form.register("password")} />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" placeholder="+1 (555) 123-4567" {...form.register("phoneNumber")} />
              {form.formState.errors.phoneNumber && (
                <p className="text-sm text-red-500">{form.formState.errors.phoneNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={(value) => form.setValue("role", value)}>
                <SelectTrigger>
                  <SelectValue className="text-white" placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.role && (
                <p className="text-sm text-red-500">{form.formState.errors.role.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="123 Main St, City, Country"
                className="min-h-[80px]"
                {...form.register("address")}
              />
              {form.formState.errors.address && (
                <p className="text-sm text-red-500">{form.formState.errors.address.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link to="/login" className="text-black-600 hover:underline ml-1">
            Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp
