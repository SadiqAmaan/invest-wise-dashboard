import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Checkbox } from "../../../components/ui/Checkbox";
import Icon from "../../../components/AppIcon";
import loginCredentials from "./loginCredentials.json";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const credentials = loginCredentials[formData.email.toLowerCase()];

      if (!credentials || credentials.password !== formData.password) {
        setErrors({
          general: `Invalid credentials. Try: admin@investWise.com / Admin@123`,
        });
        setIsLoading(false);
        return;
      }

      // Check if MFA is required
      if (credentials.requiresMFA && !showMFA) {
        setShowMFA(true);
        setIsLoading(false);
        return;
      }

      // Validate MFA if required
      if (showMFA && mfaCode !== "123456") {
        setErrors({
          mfa: "Invalid verification code. Use: 123456",
        });
        setIsLoading(false);
        return;
      }

      // Store user session
      localStorage.setItem(
        "userSession",
        JSON.stringify({
          email: formData.email,
          role: credentials.role,
          loginTime: new Date().toISOString(),
          rememberMe: formData.rememberMe,
        })
      );

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      setErrors({
        general: "An error occurred during login. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMFASubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const handleForgotPassword = () => {
    alert("Password reset functionality would redirect to password reset flow");
  };

  if (showMFA) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card border border-border rounded-lg shadow-elevated p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Two-Factor Authentication
            </h2>
            <p className="text-muted-foreground">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          <form onSubmit={handleMFASubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-error" />
                  <span className="text-sm text-error">{errors.general}</span>
                </div>
              </div>
            )}

            <Input
              label="Verification Code"
              type="text"
              name="mfaCode"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
              placeholder="Enter 6-digit code"
              error={errors.mfa}
              maxLength={6}
              className="text-center text-lg tracking-widest"
              required
            />

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Demo code: <span className="font-mono font-medium">123456</span>
              </p>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={!mfaCode || mfaCode.length !== 6}
            >
              Verify & Sign In
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowMFA(false)}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                ← Back to login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-elevated p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Invest Wise
              </h1>
            </div>
          </div>
          <h2 className="text-xl font-medium text-foreground mb-2">
            Welcome Back
          </h2>
          <p className="text-muted-foreground">
            Sign in to your institutional portfolio dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <span className="text-sm text-error">{errors.general}</span>
              </div>
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            error={errors.email}
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              error={errors.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              name="rememberMe"
            />

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={!formData.email || !formData.password}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Demo Credentials:
            </p>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div>Admin: admin@investWise.com / Admin@123</div>
              <div>Manager: manager@investWise.com / Manager@123</div>
              <div>Analyst: analyst@investWise.com / Analyst@123</div>
              <div>Client: client@investWise.com / Client@123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
