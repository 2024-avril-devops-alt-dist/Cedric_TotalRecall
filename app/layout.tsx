export const metadata = {
  title: 'Total Recall',
  description: 'Voyages interspacial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}