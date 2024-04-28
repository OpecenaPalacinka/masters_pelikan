import { BaseLayout } from '@/components/BaseLayout'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BaseLayout>
      <Header />
      <main>{children}</main>
      <Footer />
    </BaseLayout>
  )
}
