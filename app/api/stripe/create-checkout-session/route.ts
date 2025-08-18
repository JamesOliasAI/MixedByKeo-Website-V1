import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20' as any, // Use a valid API version, cast to any to bypass type error
})

export async function POST(req: Request) {
  try {
    const { serviceType, projectName, artistName, email, fastDelivery, acapellaExport } = await req.json()

    let serviceName: string
    let unitAmount: number
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    switch (serviceType) {
      case 'mixing':
        serviceName = 'Mixing Service'
        unitAmount = 8000 // £80.00 in pence
        break
      case 'mastering':
        serviceName = 'Mastering Service'
        unitAmount = 3000 // £30.00 in pence
        break
      case 'mix-master':
        serviceName = 'Mix & Master Package'
        unitAmount = 10000 // £100.00 in pence
        break
      case 'test':
        serviceName = 'Test Service'
        unitAmount = 100 // £1.00 in pence for testing
        break
      default:
        return new NextResponse('Invalid service type', { status: 400 })
    }

    lineItems.push({
      price_data: {
        currency: 'gbp', // Great British Pounds
        product_data: {
          name: serviceName,
          description: `Project: ${projectName}, Artist: ${artistName}`,
        },
        unit_amount: unitAmount,
      },
      quantity: 1,
    });

    if (fastDelivery) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Fast Delivery',
            description: 'Expedited delivery of your service.',
          },
          unit_amount: 2000, // £20.00 in pence
        },
        quantity: 1,
      });
    }

    if (acapellaExport && (serviceType === 'mixing' || serviceType === 'mix-master')) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Acapella Export',
            description: 'Separate export of lead vocals (acapella).',
          },
          unit_amount: 1000, // £10.00 in pence
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/order?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/order?canceled=true`,
      metadata: {
        serviceType,
        projectName,
        artistName,
        email,
        fastDelivery: fastDelivery ? 'true' : 'false',
        acapellaExport: acapellaExport ? 'true' : 'false',
      },
      customer_email: email, // Pre-fill customer email
    });

    // Send contract email after successful session creation
    await fetch(`${req.headers.get('origin')}/api/email/send-contract`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, serviceType, projectName, artistName }),
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return new NextResponse(`Error: ${error.message}`, { status: 500 })
  }
}
