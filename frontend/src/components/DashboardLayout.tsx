import { BaseLayout } from '@/components/BaseLayout'
import { Sidebar } from '@/components/Sidebar'
import React from 'react'

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BaseLayout>
      <div className={'flex h-[100dvh]'}>
        <Sidebar />
        <main className={'relative flex h-full flex-1 flex-col overflow-y-auto bg-gray-50'}>
          <div className={'h-full overflow-auto px-10 pb-10 pt-5'}>{children}</div>
        </main>
      </div>
    </BaseLayout>
  )
}
