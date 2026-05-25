"use client"

import AuthCard from "./auth-card"
import GitHubLoginButton from "./github-login-button"
import GoogleLoginButton from "./google-login-button"

export default function LoginForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <AuthCard>
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-white">
              Welcome to Portlix
            </h1>

            <p className="text-zinc-400">
              Build your developer identity
            </p>
          </div>

          <div className="space-y-4">
            <GitHubLoginButton />
            <GoogleLoginButton />
          </div>
        </div>
      </AuthCard>
    </div>
  )
}