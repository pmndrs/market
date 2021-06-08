import { useRouter } from 'next/router'

const useNav = () => {
  const { pathname } = useRouter()

  const dropDownMenus = {
    Models: [
      { name: 'All Models', href: '/' },
      {
        name: 'Categories',
        href: '/models/categories',
      },
    ],

    Materials: [
      { name: 'All Materials', href: '/materials' },
      {
        name: 'Categories',
        href: '/materials/categories',
      },
    ],

    HDRIS: [
      { name: 'All HDRIs', href: '/hdris' },
      {
        name: 'Categories',
        href: '/hdris/categories',
      },
    ],
  }

  const navigation = [
    {
      name: 'Request an Asset',
      href: '/request',
      current: pathname === '/request',
    },
  ]

  const mobileNav = [
    {
      name: 'Models',
      href: '/',
      current: pathname === '/',
    },
    {
      name: 'Materials',
      href: '/materials',
      current: pathname === '/materials',
    },
    {
      name: 'HDRIS',
      href: '/hdris',
      current: pathname === '/hdris',
    },
    {
      name: 'Request an Asset',
      href: '/request',
      current: pathname === '/request',
    },
  ]

  return [dropDownMenus, navigation, mobileNav]
}

export default useNav
