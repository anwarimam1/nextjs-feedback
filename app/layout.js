export const metadata = {
  title: "Feedback App",
  description: "Simple feedback app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}