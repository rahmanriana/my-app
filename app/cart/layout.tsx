import { Providers } from "@/app/providers";

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
