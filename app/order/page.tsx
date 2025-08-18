"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch" // Import Switch component
import { Suspense, useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

function OrderComponent() {
  const [serviceType, setServiceType] = useState("")
  const [projectName, setProjectName] = useState("")
  const [artistName, setArtistName] = useState("")
  const [email, setEmail] = useState("")
  const [notes, setNotes] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [fastDelivery, setFastDelivery] = useState(false)
  const [acapellaExport, setAcapellaExport] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'canceled' | 'error'>('idle')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const success = searchParams.get('success')
    const canceled = searchParams.get('canceled')
    const sessionId = searchParams.get('session_id')

    if (success) {
      setPaymentStatus('success')
      // In a real application, you would now process the file upload
      // and potentially fetch session details from your backend using sessionId
      console.log("Payment successful! Session ID:", sessionId)
    } else if (canceled) {
      setPaymentStatus('canceled')
      console.log("Payment canceled.")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setPaymentStatus('idle')

    if (!serviceType || !projectName || !artistName || !email) {
      alert("Please fill in all required fields.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serviceType, projectName, artistName, email, fastDelivery, acapellaExport }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create checkout session.')
      }

      const { url } = await response.json()
      window.location.href = url // Redirect to Stripe Checkout
    } catch (error: any) {
      console.error('Error during checkout:', error)
      setPaymentStatus('error')
      alert(`Payment initiation failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      alert("Please select a file to upload.")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('audioFile', file)
      formData.append('serviceType', serviceType)
      formData.append('projectName', projectName)
      formData.append('artistName', artistName)
      formData.append('email', email)
      formData.append('notes', notes)

      // In a real application, you would send this to your backend
      // e.g., fetch('/api/upload-audio', { method: 'POST', body: formData })
      console.log("Simulating file upload:", formData)
      alert("File uploaded successfully! (This is a demo. Actual file upload to cloud storage is not yet implemented.)")
    } catch (error) {
      console.error("Error uploading file:", error)
      alert("File upload failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background relative min-h-screen flex flex-col">
      <header className="sticky-header bg-background/95 backdrop-blur-md border-b border-border">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" /> Back to Home
            </Link>
            <div className="text-xl font-heading font-bold text-foreground">MixedByKeo</div>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <Card className="max-w-2xl w-full bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-heading font-bold mb-2">Order Your Service</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Fill out the form below to get started with your order.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {paymentStatus === 'success' && (
              <div className="text-center text-green-500 mb-6">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Payment Successful!</h3>
                <p className="text-muted-foreground">Thank you for your purchase. Please upload your files below.</p>
              </div>
            )}
            {paymentStatus === 'canceled' && (
              <div className="text-center text-red-500 mb-6">
                <XCircle className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Payment Canceled</h3>
                <p className="text-muted-foreground">Your payment was canceled. You can try again or contact support.</p>
              </div>
            )}
            {paymentStatus === 'error' && (
              <div className="text-center text-red-500 mb-6">
                <XCircle className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Payment Error</h3>
                <p className="text-muted-foreground">There was an error processing your payment. Please try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" style={{ display: paymentStatus === 'success' ? 'none' : 'block' }}>
              <div className="grid gap-2">
                <Label htmlFor="serviceType">Service Type</Label>
                <Select onValueChange={setServiceType} value={serviceType}>
                  <SelectTrigger id="serviceType">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mixing">Mixing (£80)</SelectItem>
                    <SelectItem value="mastering">Mastering (£30)</SelectItem>
                    <SelectItem value="mix-master">Mix & Master (£100)</SelectItem>
                    <SelectItem value="test">Test Service (£1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  placeholder="e.g., My New Single"
                  value={projectName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="artistName">Artist Name(s)</Label>
                <Input
                  id="artistName"
                  placeholder="e.g., John Doe, Jane Smith"
                  value={artistName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArtistName(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Additional Notes / Instructions</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific instructions for mixing/mastering, references, etc."
                  value={notes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                  rows={5}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="fastDelivery">Fast Delivery (+£20)</Label>
                  <Switch
                    id="fastDelivery"
                    checked={fastDelivery}
                    onCheckedChange={setFastDelivery}
                  />
                </div>

                {(serviceType === "mixing" || serviceType === "mix-master") && (
                  <div className="flex items-center justify-between">
                    <Label htmlFor="acapellaExport">Acapella Export (+£10)</Label>
                    <Switch
                      id="acapellaExport"
                      checked={acapellaExport}
                      onCheckedChange={setAcapellaExport}
                    />
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Processing..." : "Proceed to Payment"}
              </Button>
            </form>

            {paymentStatus === 'success' && (
              <form onSubmit={handleFileUpload} className="space-y-6 mt-8">
                <div className="grid gap-2">
                  <Label htmlFor="fileUpload">Upload Your Audio Files</Label>
                  <Input
                    id="fileUpload"
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files ? e.target.files[0] : null)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    For Mixing: Please upload a ZIP file containing all individual stems (vocals, drums, instruments) clearly labeled.
                    <br />
                    For Mastering: Please upload the final WAV or MP3 export of your song/beat.
                  </p>
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Uploading..." : "Upload Files"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="py-4 px-6 bg-background/95 backdrop-blur-md border-t border-border z-40">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 MixedByKeo. Professional Audio Engineering Services.</p>
        </div>
      </footer>
    </div>
  )
}

export default function OrderServicePage() {
  return (
    <Suspense fallback={<div className="relative min-h-screen flex items-center justify-center">Loading...</div>}>
      <OrderComponent />
    </Suspense>
  )
}
