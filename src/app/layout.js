import "./globals.css";

export const metadata = {
  title: "Happy birthday Asanwa, you are special",
  description:
    "I hope you life brings you all the happiness you deserve, have a great day and a great year ahead. I love you",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
