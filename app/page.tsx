"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Faq } from "@/components/faq"
import { Play, Music, Headphones, Award, Star, ExternalLink, Music2 } from "lucide-react"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Testimonials } from "@/components/testimonials"
import Link from "next/link"
import Image from "next/image"

export default function AudioEngineerPortfolio() {
const [trackData, setTrackData] = useState<Record<string, any>>({})

useEffect(() => {
  const fetchTrackData = async () => {
    const ids = [
      "7uOvwU95YKQDAV0RRs8zNI",
      "7gNe6oDUAg71cbr8tgMal4",
      "6cz5NtopQ6oINsWtxdoG4m",
      "4m2K2HS1An5FlEYJpjbUXM",
      "3XsbDOJF8hupTSWhOIBAEu",
      "7mziE9MIlQIPlaGC2L9O6s",
      "2Y5ACS66ApTxGpZtBwBUXo",
      "4mqupYBe0z4OFN9eTVrQ85",
      "0BYSCQkcZaqH0j1HfbvU09",
      "6pCeojhDOv4z656ECgWqjG",
      "0v2LKcBmshYQHig27G5D1Z",
      "2FjeKxQ8G0efdPrzNgqeiS",
      "3XFcRTOh8kWCiBdpgCJUlF",
      "1vyR5DDSltWhF8t0iJZHa5",
      "0rX89PN5cg16G29y9oRUxL",
      "5OHu2WDuo7HXxe5x1Hjdkf",
      "6JHkRbYgWxoSKjPJM4PSPl",
      "6Ha4jja77kRJmlAUaDxK1j",
      "2WnSUVZ9TAx6D7z80emSsJ",
      "5GMCPhyi3ajOhqtlOhr32k",
      "2tQYc4lx8rDHtultzafmOR",
      "2LaD0OJj6amXeH7NYImMxR",
      "3gmE7Joedf9gfxqtyyL0AO",
      "647daOIyJuyGXDH3tnpkQo",
      "6jTt8UkNEHwHyjRsUGuVIs"
    ]
    
    try {
      const promises = ids.map(id =>
        fetch(`/api/spotify/track/${id}`).then(res => res.json())
      )
      
      const results = await Promise.all(promises)
      const data = results.reduce((acc, result, index) => {
        acc[ids[index]] = result
        return acc
      }, {})
      
      setTrackData(data)
    } catch (error) {
      console.error('Failed to fetch Spotify data:', error)
    }
  }
  
  fetchTrackData()
}, [])

  return (
    <div className="bg-background relative">
      <header className="sticky-header bg-background/95 backdrop-blur-md border-b border-border">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Image src="/logo.png" alt="Mixed By Keo Logo" width={150} height={32} className="h-8 w-auto" />
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#hero" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
              <a href="#discography" className="text-muted-foreground hover:text-foreground transition-colors">Portfolio</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
              <a href="https://www.youtube.com/channel/UC80lAJ1TKWyzvI0dxUShQmA" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">YouTube</a>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl text-center">
            <div className="mb-8">
              <Image
                src="/logo.png"
                alt="Mixed By Keo Logo"
                width={192}
                height={192}
                className="w-48 h-48 rounded-full mx-auto mb-6 object-cover border-4 border-primary/20 shadow-2xl"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-foreground">
              Mixed By Keo
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Elevate your sound with professional <span className="text-foreground font-semibold">mixing and mastering services</span>. I bring clarity, depth, and industry-standard quality to <span className="text-foreground font-semibold">hip-hop, R&B, and pop tracks</span>, helping artists and producers achieve their full musical potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#services">
                <Button size="lg" className="shadow-lg">
                  <Music className="mr-2 h-5 w-5" />
                  View Services
                </Button>
              </a>
              <a href="#discography">
                <Button size="lg" variant="outline" className="shadow-lg bg-transparent">
                  <Play className="mr-2 h-5 w-5" />
                  Listen to Portfolio
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
            <h2 className="text-4xl font-heading font-bold mb-8 text-center">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  With over 8+ years of experience as an <span className="text-foreground font-semibold">audio engineer</span>, and 10M+ Streams across all credits, I specialize in professional <span className="text-foreground font-semibold">mixing and mastering</span>. My goal is to bring artists' ideas to reality, crafting the perfect sound with industry-leading quality.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I've provided <span className="text-foreground font-semibold">online mixing and mastering services</span> for artists across all genres, including names such as Loski, Odeal, 678Nath & more. I always focus on preserving the artist's vision while enhancing the technical quality of their <span className="text-foreground font-semibold">music production</span>.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Logic Pro & FL Studio Certified</Badge>
                  <Badge variant="secondary">8+ Years Experience</Badge>
                  <Badge variant="secondary">Industry Standard Quality</Badge>
                  <Badge variant="secondary">Fast Turnaround</Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Award className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Industry Recognition</h3>
                    <p className="text-muted-foreground">10M+ streams across all platforms</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Headphones className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">State-of-the-Art Studio</h3>
                    <p className="text-muted-foreground">Professional monitoring & acoustics</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Star className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Client Satisfaction</h3>
                    <p className="text-muted-foreground">Over hundreds of satisfied artists</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl">
            <h2 className="text-4xl font-heading font-bold mb-12 text-center">Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all hover:shadow-2xl hover:scale-105">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Music className="h-6 w-6 text-primary" />
                    Mixing
                  </CardTitle>
                  <CardDescription>Professional multi-track mixing</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground mb-6">
                    <li>• Full mix of vocals & beat</li>
                    <li>• Included is a WAV, MP3 Bounce</li>
                    <li>• Optional ad ons such as: Acapella Export, Fast Delivery</li>
                    <li>• Requires: Individual stems of vocal and/or beat tracks labelled correctly </li>
                    <li>• Up to 1 free revision</li>
                  </ul>
                  <div className="text-2xl font-bold mb-4">
                    £80<span className="text-sm font-normal text-muted-foreground">/song</span>
                  </div>
                  <Link href="/order">
                    <Button className="w-full">Order Mixing</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all hover:shadow-2xl hover:scale-105">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Headphones className="h-6 w-6 text-primary" />
                    Mastering
                  </CardTitle>
                  <CardDescription>Industry-standard mastering</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground mb-6">
                    <li>• Full mastering of song or beat</li>
                    <li>• Included is a WAV, MP3 Bounce</li>
                    <li>• Optional ad ons such as: Fast Delivery</li>
                    <li>• Requires: WAV or MP3 Export of song/beat for mastering</li>
                    <li>• Up to 1 free revision</li>
                  </ul>
                  <div className="text-2xl font-bold mb-4">
                    £30<span className="text-sm font-normal text-muted-foreground">/song</span>
                  </div>
                  <Link href="/order">
                    <Button className="w-full">Order Mastering</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all hover:shadow-2xl hover:scale-105 border-primary/30">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-accent">Most Popular</Badge>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    Mix & Master
                  </CardTitle>
                  <CardDescription>Complete production package</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground mb-6">
                    <li>• Full mix & master of vocals & beat</li>
                    <li>• Included is a WAV, MP3 Bounce</li>
                    <li>• Optional ad ons such as: Acapella Export, Fast Delivery</li>
                    <li>• Requires: Individual stems of vocal and/or beat tracks labelled correctly</li>
                    <li>• Up to 1 free revision</li>
                  </ul>
                  <div className="text-2xl font-bold mb-4">
                    £100<span className="text-sm font-normal text-muted-foreground">/song</span>
                  </div>
                  <Link href="/order">
                    <Button className="w-full bg-accent hover:bg-accent/90">Order Package</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>


        {/* Portfolio Section */}
        <section id="discography" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl w-full">
            <h2 className="text-4xl font-heading font-bold mb-4 text-center">Discography</h2>
            <div className="text-center mb-12">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="shadow-lg">
                    <Music2 className="mr-2 h-5 w-5" />
                    View Full Discography Playlist
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl h-auto bg-card/95 backdrop-blur-sm">
                  <DialogHeader>
                    <DialogTitle>Full Discography</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <iframe
                      data-testid="embed-iframe"
                      style={{ borderRadius: "12px" }}
                      src="https://open.spotify.com/embed/playlist/7wj5UYwxZHTQgAX1NZOeIF?utm_source=generator"
                      width="100%"
                      height="352"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* Left Column: Album Covers Grid */}
              <div className="flex flex-col items-center">
                <h3 className="text-3xl font-heading font-bold mb-8 text-center">Album Covers</h3>
                <div className="grid grid-cols-5 gap-2 w-full max-w-lg">
                  {[
                    "7uOvwU95YKQDAV0RRs8zNI", "7gNe6oDUAg71cbr8tgMal4", "6cz5NtopQ6oINsWtxdoG4m", "4m2K2HS1An5FlEYJpjbUXM", "3XsbDOJF8hupTSWhOIBAEu",
                    "7mziE9MIlQIPlaGC2L9O6s", "2Y5ACS66ApTxGpZtBwBUXo", "4mqupYBe0z4OFN9eTVrQ85", "0BYSCQkcZaqH0j1HfbvU09", "6pCeojhDOv4z656ECgWqjG",
                    "0v2LKcBmshYQHig27G5D1Z", "2FjeKxQ8G0efdPrzNgqeiS", "3XFcRTOh8kWCiBdpgCJUlF", "1vyR5DDSltWhF8t0iJZHa5", "0rX89PN5cg16G29y9oRUxL",
                    "5OHu2WDuo7HXxe5x1Hjdkf", "6JHkRbYgWxoSKjPJM4PSPl", "6Ha4jja77kRJmlAUaDxK1j", "2WnSUVZ9TAx6D7z80emSsJ", "5GMCPhyi3ajOhqtlOhr32k",
                    "2tQYc4lx8rDHtultzafmOR", "2LaD0OJj6amXeH7NYImMxR", "3gmE7Joedf9gfxqtyyL0AO", "647daOIyJuyGXDH3tnpkQo", "6jTt8UkNEHwHyjRsUGuVIs"
                  ].map((spotifyId, index) => (
                    <div key={index} className="relative group cursor-pointer aspect-square" onClick={() => window.open(`https://open.spotify.com/track/${spotifyId}`, '_blank')}>
                      {trackData[spotifyId]?.album?.images?.[0]?.url && (
                        <img
                          src={trackData[spotifyId].album.images[0].url}
                          alt={trackData[spotifyId]?.name ? `Album cover for ${trackData[spotifyId].name} by ${trackData[spotifyId].artists?.join(', ')}` : `Album Cover ${index + 1}`}
                          className="w-full h-full object-cover rounded-sm shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Full Discography List */}
              <div className="flex flex-col items-center">
                <h3 className="text-3xl font-heading font-bold mb-8 text-center">Full Discography List</h3>
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border w-full max-h-[400px] overflow-y-auto">
                  <ul className="space-y-4">
                    {[
                      {
                        spotifyId: "7uOvwU95YKQDAV0RRs8zNI",
                        credit: "Production Credits"
                      },
                      {
                        spotifyId: "7gNe6oDUAg71cbr8tgMal4",
                        credit: "Mixing & Mastering Credits"
                      },
                      {
                        spotifyId: "6cz5NtopQ6oINsWtxdoG4m",
                        credit: "Production Credits"
                      },
                      {
                        spotifyId: "4m2K2HS1An5FlEYJpjbUXM",
                        credit: "Production Credits"
                      },
                      {
                        spotifyId: "3XsbDOJF8hupTSWhOIBAEu",
                        credit: "Mastering Credits"
                      },
                      {
                        spotifyId: "7mziE9MIlQIPlaGC2L9O6s",
                        credit: "Production Credits"
                      },
                      {
                        spotifyId: "2Y5ACS66ApTxGpZtBwBUXo",
                        credit: "Production Credits"
                      },
                      {
                        spotifyId: "4mqupYBe0z4OFN9eTVrQ85",
                        credit: "Production Credits"
                      },
                      {
                        spotifyId: "0BYSCQkcZaqH0j1HfbvU09",
                        credit: "Mastering Credits"
                      },
                      {
                        spotifyId: "6pCeojhDOv4z656ECgWqjG",
                        credit: "Recording, Mixing & Mastering"
                      },
                      {
                        spotifyId: "0v2LKcBmshYQHig27G5D1Z",
                        credit: "Mixing & Mastering Credits"
                      },
                      {
                        spotifyId: "2FjeKxQ8G0efdPrzNgqeiS",
                        credit: "Production Credits"
                      },
                      {
                        spotifyId: "3XFcRTOh8kWCiBdpgCJUlF",
                        credit: "Production Credits"
                      },
                      {
                        spotifyId: "1vyR5DDSltWhF8t0iJZHa5",
                        credit: "Recording, Mixing & Mastering Credits"
                      },
                      {
                        spotifyId: "0rX89PN5cg16G29y9oRUxL",
                        credit: "Recording, Mixing & Mastering Credits"
                      },
                      {
                        spotifyId: "5OHu2WDuo7HXxe5x1Hjdkf",
                        credit: "Production Credits"
                      },
                      {
                        spotifyId: "6JHkRbYgWxoSKjPJM4PSPl",
                        credit: "Production Credits"
                      },
                      {
                        spotifyId: "6Ha4jja77kRJmlAUaDxK1j",
                        credit: "Production Credits"
                      },
                      {
                        spotifyId: "2WnSUVZ9TAx6D7z80emSsJ",
                        credit: "Production Credits"
                      },
                      {
                        spotifyId: "5GMCPhyi3ajOhqtlOhr32k",
                        credit: "Production Credits"
                      },
                      {
                        spotifyId: "2tQYc4lx8rDHtultzafmOR",
                        credit: "Recording, Mixing & Mastering Credits"
                      },
                      {
                        spotifyId: "2LaD0OJj6amXeH7NYImMxR",
                        credit: "Recording, Mixing & Mastering Credits"
                      },
                      {
                        spotifyId: "3gmE7Joedf9gfxqtyyL0AO",
                        credit: "Recording, Mixing & Mastering Credits"
                      },
                      {
                        spotifyId: "647daOIyJuyGXDH3tnpkQo",
                        credit: "Recording, Mixing & Mastering Credits"
                      },
                      {
                        spotifyId: "6jTt8UkNEHwHyjRsUGuVIs",
                        credit: "Production Credits"
                      },
                    ].map((track, index) => (
                      <li key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                        <div className="flex items-center gap-4">
                          {trackData[track.spotifyId]?.album?.images?.[2]?.url && (
                            <img
                              src={trackData[track.spotifyId].album.images[2].url}
                              alt={trackData[track.spotifyId]?.name || "Track"}
                              className="w-12 h-12 rounded-md object-cover"
                            />
                          )}
                          <div>
                            <p className="font-semibold text-lg">{trackData[track.spotifyId]?.name || "Loading..."}</p>
                            <p className="text-muted-foreground text-sm">
                              {trackData[track.spotifyId]?.artists?.join(', ') || "Loading..."}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">{track.credit}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
        <section id="faq" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl w-full">
            <h2 className="text-4xl font-heading font-bold mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <Faq />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl text-center bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
            <h2 className="text-4xl font-heading font-bold mb-8">Contact Me</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Feel free to reach out through my social media or email!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.instagram.com/mixedbykeo" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="shadow-lg">
                  Instagram
                </Button>
              </a>
              <a href="https://www.tiktok.com/@mixed.by.keo" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="shadow-lg bg-transparent">
                  TikTok
                </Button>
              </a>
              <a href="mailto:mixedbykeo@gmail.com">
                <Button size="lg" className="shadow-lg">
                  Gmail
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-4 px-6 bg-background/95 backdrop-blur-md border-t border-border z-40">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 MixedByKeo. Professional Audio Engineering Services.</p>
        </div>
      </footer>
    </div>
  )
}
