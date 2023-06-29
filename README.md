This is a [Connect IPS](https://www.connectips.com/) Core Module integration in [Next.js](https://nextjs.org/).

## Getting Started

First, clone the repository

```bash
# SSH
git clone git@github.com:greyhere/next-connectips.git

# HTTPS
git clone https://github.com/greyhere/next-connectips.git
```

Install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Generate a `.env.local` file resembling `.env.example` and fill it with the provided Connect IPS details, as instructed in `.env.example`.

```bash
cp .env.example .env.local
```

Add your `CREDITOR.pfx` private key file provided by Connect IPS to the `signatures` directory.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Deploy on Vercel

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
