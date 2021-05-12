const Table = ({ data }) => (
  <div className='flex flex-col mt-6'>
    <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
      <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
        <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                >
                  Key
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                >
                  Description
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                >
                  Mandatory
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((info, keyidx) => (
                <tr
                  key={info.key}
                  className={keyidx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
                    {info.key}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                    {info.description}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                    {info.mandatory.toString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
)

export default Table
