export const metadata = {
  title: 'Inclusive Data Platform',
  description: 'Research made accessible for everyone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="mr">
      <body>{children}</body>
    </html>
  )
}
