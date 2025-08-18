"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { XCircle } from "lucide-react"

export default function OrderCancelPage() {
  return (
    <div className="bg-background relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <Card className="max-w-md w-full bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border text-center">
        <CardHeader>
          <XCircle className="h-20 w-20 text-red-500 mx-auto mb-4" />
          <CardTitle className="text-4xl font-heading font-bold mb-2">Order Canceled</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Your payment was canceled. No charges were made.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            If you encountered an issue, please try again or contact support for assistance.
          </p>
          <Link href="/order">
            <Button className="w-full" size="lg">
              Try Again
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full" size="lg">
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
