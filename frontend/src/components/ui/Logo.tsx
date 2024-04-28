import * as AccessibleIcon from '@radix-ui/react-accessible-icon'

type LogoProps = {
  label?: string
} & React.ComponentPropsWithoutRef<'svg'>

export const Logo = (props: LogoProps) => {
  const {
    label = 'Academic Diary',
    width = 161,
    height = 76,
    className = 'h-10 w-auto',
    ...logoProps
  } = props

  return (
    <AccessibleIcon.Root label={label}>
      <svg
        width={width}
        height={height}
        viewBox={'0 0 161 76'}
        fill={'none'}
        xmlns={'http://www.w3.org/2000/svg'}
        className={className}
        {...logoProps}
      >
        <path
          d="M7.77273 35.3707C6.51989 35.3707 5.40341 35.1534 4.4233 34.7188C3.44318 34.2756 2.66761 33.6236 2.09659 32.7628C1.53409 31.8935 1.25284 30.8111 1.25284 29.5156C1.25284 28.4247 1.45313 27.5085 1.85369 26.767C2.25426 26.0256 2.79972 25.429 3.49006 24.9773C4.1804 24.5256 4.96449 24.1847 5.84233 23.9545C6.72869 23.7244 7.65767 23.5625 8.62926 23.4688C9.77131 23.3494 10.6918 23.2386 11.3906 23.1364C12.0895 23.0256 12.5966 22.8636 12.9119 22.6506C13.2273 22.4375 13.3849 22.1222 13.3849 21.7045V21.6278C13.3849 20.8182 13.1293 20.1918 12.6179 19.7486C12.1151 19.3054 11.3991 19.0838 10.4702 19.0838C9.49006 19.0838 8.71023 19.3011 8.13068 19.7358C7.55114 20.1619 7.16761 20.6989 6.98011 21.3466L1.94318 20.9375C2.19886 19.7443 2.7017 18.7131 3.4517 17.8438C4.2017 16.9659 5.16903 16.2926 6.35369 15.8239C7.54688 15.3466 8.92756 15.108 10.4957 15.108C11.5866 15.108 12.6307 15.2358 13.6278 15.4915C14.6335 15.7472 15.5241 16.1435 16.2997 16.6804C17.0838 17.2173 17.7017 17.9077 18.1534 18.7514C18.6051 19.5866 18.831 20.5881 18.831 21.7557V35H13.6662V32.277H13.5128C13.1974 32.8906 12.7756 33.4318 12.2472 33.9006C11.7188 34.3608 11.0838 34.723 10.3423 34.9872C9.60085 35.2429 8.74432 35.3707 7.77273 35.3707ZM9.33239 31.6122C10.1335 31.6122 10.8409 31.4545 11.4545 31.1392C12.0682 30.8153 12.5497 30.3807 12.8991 29.8352C13.2486 29.2898 13.4233 28.6719 13.4233 27.9815V25.8977C13.2528 26.0085 13.0185 26.1108 12.7202 26.2045C12.4304 26.2898 12.1023 26.3707 11.7358 26.4474C11.3693 26.5156 11.0028 26.5795 10.6364 26.6392C10.2699 26.6903 9.9375 26.7372 9.6392 26.7798C9 26.8736 8.44176 27.0227 7.96449 27.2273C7.48722 27.4318 7.11648 27.7088 6.85227 28.0582C6.58807 28.3991 6.45597 28.8253 6.45597 29.3366C6.45597 30.0781 6.72443 30.6449 7.26136 31.0369C7.80682 31.4205 8.49716 31.6122 9.33239 31.6122ZM30.4283 35.3835C28.4169 35.3835 26.6868 34.9574 25.2379 34.1051C23.7976 33.2443 22.6896 32.0511 21.9141 30.5256C21.147 29 20.7635 27.2443 20.7635 25.2585C20.7635 23.2472 21.1513 21.483 21.9268 19.9659C22.7109 18.4403 23.8232 17.2514 25.2635 16.3991C26.7038 15.5384 28.4169 15.108 30.4027 15.108C32.1158 15.108 33.6158 15.419 34.9027 16.0412C36.1896 16.6634 37.2081 17.5369 37.9581 18.6619C38.7081 19.7869 39.1214 21.108 39.1982 22.625H34.0589C33.9141 21.6449 33.5305 20.8565 32.9084 20.2599C32.2947 19.6548 31.4893 19.3523 30.4922 19.3523C29.6484 19.3523 28.9112 19.5824 28.2805 20.0426C27.6584 20.4943 27.1726 21.1548 26.8232 22.0241C26.4737 22.8935 26.299 23.946 26.299 25.1818C26.299 26.4347 26.4695 27.5 26.8104 28.3778C27.1598 29.2557 27.6499 29.9247 28.2805 30.3849C28.9112 30.8452 29.6484 31.0753 30.4922 31.0753C31.1143 31.0753 31.6726 30.9474 32.1669 30.6918C32.6697 30.4361 33.0831 30.0653 33.407 29.5795C33.7393 29.0852 33.9567 28.4929 34.0589 27.8026H39.1982C39.1129 29.3026 38.7038 30.6236 37.9709 31.7656C37.2464 32.8991 36.245 33.7855 34.9666 34.4247C33.6882 35.0639 32.1754 35.3835 30.4283 35.3835ZM46.7844 35.3707C45.5316 35.3707 44.4151 35.1534 43.435 34.7188C42.4549 34.2756 41.6793 33.6236 41.1083 32.7628C40.5458 31.8935 40.2646 30.8111 40.2646 29.5156C40.2646 28.4247 40.4648 27.5085 40.8654 26.767C41.266 26.0256 41.8114 25.429 42.5018 24.9773C43.1921 24.5256 43.9762 24.1847 44.854 23.9545C45.7404 23.7244 46.6694 23.5625 47.641 23.4688C48.783 23.3494 49.7035 23.2386 50.4023 23.1364C51.1012 23.0256 51.6083 22.8636 51.9237 22.6506C52.239 22.4375 52.3967 22.1222 52.3967 21.7045V21.6278C52.3967 20.8182 52.141 20.1918 51.6296 19.7486C51.1268 19.3054 50.4109 19.0838 49.4819 19.0838C48.5018 19.0838 47.7219 19.3011 47.1424 19.7358C46.5629 20.1619 46.1793 20.6989 45.9918 21.3466L40.9549 20.9375C41.2106 19.7443 41.7134 18.7131 42.4634 17.8438C43.2134 16.9659 44.1808 16.2926 45.3654 15.8239C46.5586 15.3466 47.9393 15.108 49.5075 15.108C50.5984 15.108 51.6424 15.2358 52.6396 15.4915C53.6452 15.7472 54.5359 16.1435 55.3114 16.6804C56.0955 17.2173 56.7134 17.9077 57.1651 18.7514C57.6168 19.5866 57.8427 20.5881 57.8427 21.7557V35H52.6779V32.277H52.5245C52.2092 32.8906 51.7873 33.4318 51.2589 33.9006C50.7305 34.3608 50.0955 34.723 49.354 34.9872C48.6126 35.2429 47.756 35.3707 46.7844 35.3707ZM48.3441 31.6122C49.1452 31.6122 49.8526 31.4545 50.4663 31.1392C51.0799 30.8153 51.5614 30.3807 51.9109 29.8352C52.2603 29.2898 52.435 28.6719 52.435 27.9815V25.8977C52.2646 26.0085 52.0302 26.1108 51.7319 26.2045C51.4421 26.2898 51.114 26.3707 50.7475 26.4474C50.381 26.5156 50.0146 26.5795 49.6481 26.6392C49.2816 26.6903 48.9492 26.7372 48.6509 26.7798C48.0117 26.8736 47.4535 27.0227 46.9762 27.2273C46.4989 27.4318 46.1282 27.7088 45.864 28.0582C45.5998 28.3991 45.4677 28.8253 45.4677 29.3366C45.4677 30.0781 45.7362 30.6449 46.2731 31.0369C46.8185 31.4205 47.5089 31.6122 48.3441 31.6122ZM67.8036 35.3196C66.3121 35.3196 64.9613 34.9361 63.7511 34.169C62.5494 33.3935 61.5948 32.2557 60.8874 30.7557C60.1886 29.2472 59.8391 27.3977 59.8391 25.2074C59.8391 22.9574 60.2013 21.0866 60.9258 19.5952C61.6502 18.0952 62.6133 16.9744 63.815 16.233C65.0252 15.483 66.3505 15.108 67.7908 15.108C68.8903 15.108 69.8065 15.2955 70.5394 15.6705C71.2809 16.0369 71.8775 16.4972 72.3292 17.0511C72.7894 17.5966 73.1388 18.1335 73.3775 18.6619H73.5437V8.81818H78.9769V35H73.6076V31.8551H73.3775C73.1218 32.4006 72.7596 32.9418 72.2908 33.4787C71.8306 34.0071 71.2298 34.446 70.4883 34.7955C69.7553 35.1449 68.8604 35.3196 67.8036 35.3196ZM69.5295 30.9858C70.4073 30.9858 71.1488 30.7472 71.7539 30.2699C72.3675 29.7841 72.8363 29.1065 73.1602 28.2372C73.4925 27.3679 73.6587 26.3494 73.6587 25.1818C73.6587 24.0142 73.4968 23 73.1729 22.1392C72.8491 21.2784 72.3803 20.6136 71.7667 20.1449C71.1531 19.6761 70.4073 19.4418 69.5295 19.4418C68.6346 19.4418 67.8803 19.6847 67.2667 20.1705C66.6531 20.6562 66.1886 21.3295 65.8732 22.1903C65.5579 23.0511 65.4002 24.0483 65.4002 25.1818C65.4002 26.3239 65.5579 27.3338 65.8732 28.2116C66.1971 29.081 66.6616 29.7628 67.2667 30.2571C67.8803 30.7429 68.6346 30.9858 69.5295 30.9858ZM90.9034 35.3835C88.8835 35.3835 87.1449 34.9744 85.6875 34.1562C84.2386 33.3295 83.1222 32.1619 82.3381 30.6534C81.554 29.1364 81.1619 27.3423 81.1619 25.2713C81.1619 23.2514 81.554 21.4787 82.3381 19.9531C83.1222 18.4276 84.2259 17.2386 85.6491 16.3864C87.081 15.5341 88.7599 15.108 90.6861 15.108C91.9815 15.108 93.1875 15.3168 94.304 15.7344C95.429 16.1435 96.4091 16.7614 97.2443 17.5881C98.0881 18.4148 98.7443 19.4545 99.2131 20.7074C99.6818 21.9517 99.9162 23.4091 99.9162 25.0795V26.5753H83.3352V23.2003H94.7898C94.7898 22.4162 94.6193 21.7216 94.2784 21.1165C93.9375 20.5114 93.4645 20.0384 92.8594 19.6974C92.2628 19.348 91.5682 19.1733 90.7756 19.1733C89.9489 19.1733 89.2159 19.3651 88.5767 19.7486C87.946 20.1236 87.4517 20.6307 87.0938 21.2699C86.7358 21.9006 86.5526 22.6037 86.544 23.3793V26.5881C86.544 27.5597 86.723 28.3991 87.081 29.1065C87.4474 29.8139 87.9631 30.3594 88.6278 30.7429C89.2926 31.1264 90.081 31.3182 90.9929 31.3182C91.598 31.3182 92.152 31.233 92.6548 31.0625C93.1577 30.892 93.5881 30.6364 93.946 30.2955C94.304 29.9545 94.5767 29.5369 94.7642 29.0426L99.8011 29.375C99.5455 30.5852 99.0213 31.642 98.2287 32.5455C97.4446 33.4403 96.4304 34.1392 95.1861 34.642C93.9503 35.1364 92.5227 35.3835 90.9034 35.3835ZM101.97 35V15.3636H107.161V18.8281H107.391C107.8 17.6776 108.482 16.7699 109.436 16.1051C110.391 15.4403 111.533 15.108 112.862 15.108C114.209 15.108 115.355 15.4446 116.301 16.1179C117.247 16.7827 117.878 17.6861 118.193 18.8281H118.398C118.798 17.7031 119.523 16.804 120.571 16.1307C121.628 15.4489 122.876 15.108 124.317 15.108C126.149 15.108 127.636 15.6918 128.778 16.8594C129.929 18.0185 130.504 19.6634 130.504 21.794V35H125.071V22.8679C125.071 21.777 124.781 20.9588 124.202 20.4134C123.622 19.8679 122.898 19.5952 122.028 19.5952C121.04 19.5952 120.268 19.9105 119.714 20.5412C119.161 21.1634 118.884 21.9858 118.884 23.0085V35H113.604V22.7528C113.604 21.7898 113.327 21.0227 112.773 20.4517C112.227 19.8807 111.507 19.5952 110.612 19.5952C110.007 19.5952 109.462 19.7486 108.976 20.0554C108.499 20.3537 108.119 20.7756 107.838 21.321C107.557 21.858 107.416 22.4886 107.416 23.2131V35H101.97ZM133.306 35V15.3636H138.752V35H133.306ZM136.042 12.8324C135.232 12.8324 134.538 12.5639 133.958 12.027C133.387 11.4815 133.102 10.8295 133.102 10.071C133.102 9.32102 133.387 8.67756 133.958 8.14062C134.538 7.59517 135.232 7.32244 136.042 7.32244C136.852 7.32244 137.542 7.59517 138.113 8.14062C138.692 8.67756 138.982 9.32102 138.982 10.071C138.982 10.8295 138.692 11.4815 138.113 12.027C137.542 12.5639 136.852 12.8324 136.042 12.8324ZM150.487 35.3835C148.475 35.3835 146.745 34.9574 145.297 34.1051C143.856 33.2443 142.748 32.0511 141.973 30.5256C141.206 29 140.822 27.2443 140.822 25.2585C140.822 23.2472 141.21 21.483 141.985 19.9659C142.77 18.4403 143.882 17.2514 145.322 16.3991C146.762 15.5384 148.475 15.108 150.461 15.108C152.174 15.108 153.674 15.419 154.961 16.0412C156.248 16.6634 157.267 17.5369 158.017 18.6619C158.767 19.7869 159.18 21.108 159.257 22.625H154.118C153.973 21.6449 153.589 20.8565 152.967 20.2599C152.353 19.6548 151.548 19.3523 150.551 19.3523C149.707 19.3523 148.97 19.5824 148.339 20.0426C147.717 20.4943 147.231 21.1548 146.882 22.0241C146.532 22.8935 146.358 23.946 146.358 25.1818C146.358 26.4347 146.528 27.5 146.869 28.3778C147.218 29.2557 147.708 29.9247 148.339 30.3849C148.97 30.8452 149.707 31.0753 150.551 31.0753C151.173 31.0753 151.731 30.9474 152.225 30.6918C152.728 30.4361 153.142 30.0653 153.466 29.5795C153.798 29.0852 154.015 28.4929 154.118 27.8026H159.257C159.172 29.3026 158.762 30.6236 158.029 31.7656C157.305 32.8991 156.304 33.7855 155.025 34.4247C153.747 35.0639 152.234 35.3835 150.487 35.3835Z"
          fill="#0F172A"
        />
        <path
          d="M86.4091 67.3196C84.9176 67.3196 83.5668 66.9361 82.3565 66.169C81.1548 65.3935 80.2003 64.2557 79.4929 62.7557C78.794 61.2472 78.4446 59.3977 78.4446 57.2074C78.4446 54.9574 78.8068 53.0866 79.5312 51.5952C80.2557 50.0952 81.2188 48.9744 82.4205 48.233C83.6307 47.483 84.956 47.108 86.3963 47.108C87.4957 47.108 88.4119 47.2955 89.1449 47.6705C89.8864 48.0369 90.483 48.4972 90.9347 49.0511C91.3949 49.5966 91.7443 50.1335 91.983 50.6619H92.1491V40.8182H97.5824V67H92.2131V63.8551H91.983C91.7273 64.4006 91.3651 64.9418 90.8963 65.4787C90.4361 66.0071 89.8352 66.446 89.0938 66.7955C88.3608 67.1449 87.4659 67.3196 86.4091 67.3196ZM88.1349 62.9858C89.0128 62.9858 89.7543 62.7472 90.3594 62.2699C90.973 61.7841 91.4418 61.1065 91.7656 60.2372C92.098 59.3679 92.2642 58.3494 92.2642 57.1818C92.2642 56.0142 92.1023 55 91.7784 54.1392C91.4545 53.2784 90.9858 52.6136 90.3722 52.1449C89.7585 51.6761 89.0128 51.4418 88.1349 51.4418C87.2401 51.4418 86.4858 51.6847 85.8722 52.1705C85.2585 52.6562 84.794 53.3295 84.4787 54.1903C84.1634 55.0511 84.0057 56.0483 84.0057 57.1818C84.0057 58.3239 84.1634 59.3338 84.4787 60.2116C84.8026 61.081 85.267 61.7628 85.8722 62.2571C86.4858 62.7429 87.2401 62.9858 88.1349 62.9858ZM100.56 67V47.3636H106.006V67H100.56ZM103.296 44.8324C102.486 44.8324 101.792 44.5639 101.212 44.027C100.641 43.4815 100.355 42.8295 100.355 42.071C100.355 41.321 100.641 40.6776 101.212 40.1406C101.792 39.5952 102.486 39.3224 103.296 39.3224C104.105 39.3224 104.796 39.5952 105.367 40.1406C105.946 40.6776 106.236 41.321 106.236 42.071C106.236 42.8295 105.946 43.4815 105.367 44.027C104.796 44.5639 104.105 44.8324 103.296 44.8324ZM114.468 67.3707C113.215 67.3707 112.099 67.1534 111.119 66.7188C110.138 66.2756 109.363 65.6236 108.792 64.7628C108.229 63.8935 107.948 62.8111 107.948 61.5156C107.948 60.4247 108.148 59.5085 108.549 58.767C108.95 58.0256 109.495 57.429 110.185 56.9773C110.876 56.5256 111.66 56.1847 112.538 55.9545C113.424 55.7244 114.353 55.5625 115.325 55.4688C116.467 55.3494 117.387 55.2386 118.086 55.1364C118.785 55.0256 119.292 54.8636 119.607 54.6506C119.923 54.4375 120.08 54.1222 120.08 53.7045V53.6278C120.08 52.8182 119.825 52.1918 119.313 51.7486C118.81 51.3054 118.094 51.0838 117.165 51.0838C116.185 51.0838 115.406 51.3011 114.826 51.7358C114.246 52.1619 113.863 52.6989 113.675 53.3466L108.638 52.9375C108.894 51.7443 109.397 50.7131 110.147 49.8438C110.897 48.9659 111.864 48.2926 113.049 47.8239C114.242 47.3466 115.623 47.108 117.191 47.108C118.282 47.108 119.326 47.2358 120.323 47.4915C121.329 47.7472 122.219 48.1435 122.995 48.6804C123.779 49.2173 124.397 49.9077 124.849 50.7514C125.3 51.5866 125.526 52.5881 125.526 53.7557V67H120.362V64.277H120.208C119.893 64.8906 119.471 65.4318 118.942 65.9006C118.414 66.3608 117.779 66.723 117.038 66.9872C116.296 67.2429 115.44 67.3707 114.468 67.3707ZM116.028 63.6122C116.829 63.6122 117.536 63.4545 118.15 63.1392C118.763 62.8153 119.245 62.3807 119.594 61.8352C119.944 61.2898 120.119 60.6719 120.119 59.9815V57.8977C119.948 58.0085 119.714 58.1108 119.415 58.2045C119.126 58.2898 118.798 58.3707 118.431 58.4474C118.065 58.5156 117.698 58.5795 117.332 58.6392C116.965 58.6903 116.633 58.7372 116.335 58.7798C115.695 58.8736 115.137 59.0227 114.66 59.2273C114.183 59.4318 113.812 59.7088 113.548 60.0582C113.283 60.3991 113.151 60.8253 113.151 61.3366C113.151 62.0781 113.42 62.6449 113.957 63.0369C114.502 63.4205 115.192 63.6122 116.028 63.6122ZM128.251 67V47.3636H133.531V50.7898H133.736C134.094 49.571 134.695 48.6506 135.538 48.0284C136.382 47.3977 137.354 47.0824 138.453 47.0824C138.726 47.0824 139.02 47.0994 139.335 47.1335C139.651 47.1676 139.928 47.2145 140.166 47.2741V52.1065C139.911 52.0298 139.557 51.9616 139.105 51.902C138.653 51.8423 138.24 51.8125 137.865 51.8125C137.064 51.8125 136.348 51.9872 135.717 52.3366C135.095 52.6776 134.601 53.1548 134.234 53.7685C133.876 54.3821 133.697 55.0895 133.697 55.8906V67H128.251ZM145.442 74.3636C144.751 74.3636 144.104 74.3082 143.499 74.1974C142.902 74.0952 142.408 73.9631 142.016 73.8011L143.243 69.7358C143.882 69.9318 144.457 70.0384 144.969 70.0554C145.489 70.0724 145.936 69.9531 146.311 69.6974C146.695 69.4418 147.006 69.0071 147.244 68.3935L147.564 67.5625L140.52 47.3636H146.247L150.312 61.7841H150.517L154.621 47.3636H160.386L152.754 69.1222C152.388 70.179 151.889 71.0994 151.259 71.8835C150.636 72.6761 149.848 73.2855 148.893 73.7116C147.939 74.1463 146.788 74.3636 145.442 74.3636Z"
          fill="#0F172A"
        />
      </svg>
    </AccessibleIcon.Root>
  )
}