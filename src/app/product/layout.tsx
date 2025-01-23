export default function ProductLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <p>ProductHeader</p>
      {children}
      <p>ProductFooter</p>
    </div>
  );
}
