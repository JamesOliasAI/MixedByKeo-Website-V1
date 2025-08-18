"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface Testimonial {
  quote: string
  author: string
  title: string
}

const testimonialsData: Testimonial[] = [
  {
    quote: "Keo's mixing is insane! The vocals for my song are literally exatly how I wanted them it's like night and day. Can't wait to get back in the studio with him again!",
    author: "William Woosh",
    title: "Independent Artist",
  },
  {
    quote: "Always a great expirience working with Keo. Never had any problems taking the sound of my music to the next level with him, can't recommend enough!",
    author: "Jevzy",
    title: "Independant Artist",
  },
  {
    quote: "Have worked with him since I started making music, Helped me get to where I am today and his knowledge on mixing is seriously under appreciated.",
    author: "Vice Monroe",
    title: "Professional Artist",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl font-heading font-bold mb-12 text-center">
          What Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm border-border p-6 flex flex-col items-center text-center">
              <CardContent className="p-0">
                <p className="text-lg text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <h3 className="font-semibold text-foreground">{testimonial.author}</h3>
                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
