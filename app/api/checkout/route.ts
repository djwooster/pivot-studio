import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_MAP: Record<string, string | undefined> = {
  notion_template: process.env.STRIPE_PRICE_NOTION_TEMPLATE,
  ui_kit: process.env.STRIPE_PRICE_UI_KIT,
  custom_site: process.env.STRIPE_PRICE_CUSTOM_SITE,
};

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();
    const priceId = PRICE_MAP[productId];

    if (!priceId) {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
