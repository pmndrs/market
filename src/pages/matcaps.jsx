import useStore from '@/helpers/store'
import Layout from '@/components/layout/'
import { SearchIcon } from '@heroicons/react/solid'
import { useEffect } from 'react'
import getAllMatcaps from '@/helpers/getAllMatcaps'
import Link from 'next/link'
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Index = ({ title, models, colors, matcaps: serverMatcaps }) => {
  const [selected, setSelected] = useState(colors[0])
  const [matcaps, setMatcaps] = useState(serverMatcaps)
  useEffect(() => {
    useStore.setState({ title })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (selected === 'All') {
      setMatcaps(serverMatcaps)
    } else {
      setMatcaps(() =>
        serverMatcaps.filter((matcap) => {
          const colors = matcap.colors.map((a) => a.name)
          return colors.includes(selected)
        })
      )
    }
  }, [selected])

  return (
    <Layout title={'All Matcaps'}>
      <div>
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <div className='flex items-center justify-end'>
              <Listbox.Label className='block text-sm font-medium text-gray-700 mr-4'>
                Search by color
              </Listbox.Label>
              <div className='relative mt-1 min-w-[200px]'>
                <Listbox.Button className='relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 cursor-default rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                  <div className='flex items-center'>
                    <span className='block ml-3 truncate'>{selected}</span>
                  </div>
                  <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                    <SelectorIcon
                      className='w-5 h-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options
                    static
                    className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                  >
                    {colors.map((color, i) => (
                      <Listbox.Option
                        key={i}
                        className={({ active }) =>
                          classNames(
                            active
                              ? 'text-white bg-indigo-600'
                              : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                          )
                        }
                        value={color}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className='flex items-center'>
                              <span
                                className={classNames(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'ml-3 block truncate'
                                )}
                              >
                                {color}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                              >
                                <CheckIcon
                                  className='w-5 h-5'
                                  aria-hidden='true'
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </div>
          )}
        </Listbox>
      </div>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {matcaps.map((matcap, i) => (
          <li key={matcap.image} className='relative'>
            <Link
              className='absolute inset-0 focus:outline-none'
              href={`/matcap/${matcap.title}`}
            >
              <a>
                <div className='block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'>
                  {/* <img
                    src={matcap.preview}
                    alt={matcap.title}
                    className='object-cover pointer-events-none group-hover:opacity-75'
                  /> */}
                  <div className='grid'>
                    {matcap.colors.map((c, i) => (
                      <div key={i} style={{ background: '#' + c.color }}></div>
                    ))}
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
// <Model {...model} key={i} />
export default Index

export async function getStaticProps() {
  const matcaps = getAllMatcaps()
  const allColors = matcaps
    .map((m) => m.colors)
    .flat()
    .map((a) => a.name.trim())

  return {
    props: {
      colors: ['All', ...Array.from(new Set([...allColors])).sort()],
      matcaps,
      title: 'Matcaps',
    },
  }
}
