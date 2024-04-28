import { LandingLayout } from '@/components/LandingLayout'

export default function RootPage() {
  return (
    <LandingLayout>
      <div className={'mx-auto w-3/4 max-w-screen-xl px-5 py-4'}>
        <div className={'mx-auto text-center'}>
          <h1 className={'text-4xl font-bold'}>Welcome to Academic diary</h1>
          <p className={' py-1 text-lg'}>
            Academic diary is a platform that allows you to create and manage events. Those events
            are creating your own user story. You can visualize the story in timeline of events or
            by causality of events.
          </p>
          <p className={' py-1 text-lg'}>
            Application store data about events happened during your doctoral study. Each event has
            several required properties such as event type, date, description and label.
            Additionally you can create causality between events or save your feeling of the event.
            Application is capable of creating new event types which can be used by whole community
            of users.
          </p>
          <p className={'text-lg'}>
            This application was developed to help research about doctoral studies.
          </p>
        </div>
      </div>
    </LandingLayout>
  )
}
