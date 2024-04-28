import { LandingLayout } from '@/components/LandingLayout.tsx'

export default function PrivacyPolicy() {
  return (
    <LandingLayout>
      <div className={'relative flex min-h-[100dvh] items-center justify-center bg-gray-50'}>
        <div className={'mx-auto w-3/4 max-w-screen-xl px-5 py-4'}>
          <div className={'mx-auto text-center'}>
            <h1 className={'py-5 text-4xl font-bold'}>Privacy policy</h1>
            <p className={'py-5'}>
              Your privacy is important to us. It is our policy to respect your privacy regarding
              any information we may collect from you across our website. We only ask for personal
              information when we truly need it to provide a service to you. We collect it by fair
              and lawful means, with your knowledge and consent. We also let you know why we’re
              collecting it and how it will be used. We only retain collected information for as
              long as necessary to provide you with your requested service. What data we store,
              we’ll protect within commercially acceptable means to prevent loss and theft, as well
              as unauthorized access, disclosure, copying, use, or modification. We don’t share any
              personally identifying information publicly or with third-parties, except when
              required to by law. Our website may link to external sites that are not operated by
              us. Please be aware that we have no control over the content and practices of these
              sites, and cannot accept responsibility or liability for their respective privacy
              policies.
            </p>
            <p className={''}>
              You are free to refuse our request for your personal information, with the
              understanding that we may be unable to provide you with some of your desired services.
              Your continued use of our website will be regarded as acceptance of our practices
              around privacy and personal information. If you have any questions about how we handle
              user data and personal information, feel free to contact us. This policy is effective
              as of April 1, 2024.
            </p>
          </div>
        </div>
      </div>
    </LandingLayout>
  )
}
