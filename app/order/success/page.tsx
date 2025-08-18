"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export default function OrderSuccessPage() {
  return (
    <div className="bg-background relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <Card className="max-w-md w-full bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border text-center">
        <CardHeader>
          <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-4xl font-heading font-bold mb-2">Order Confirmed!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Your payment was successful. Thank you for your purchase!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your order is confirmed! Please send your audio files (preferably in a .zip file with all stems) to <a href="mailto:mixedbykeo@gmail.com" className="text-primary hover:underline">mixedbykeo@gmail.com</a>.
            Ensure your files are clearly labeled and in a high-quality format (e.g., WAV, AIFF).
          </p>
          <Link href="/">
            <Button className="w-full" size="lg">
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
